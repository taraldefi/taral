import {
  Configuration,
  SmartContractsApi,
} from "@stacks/blockchain-api-client";
import { StacksNetwork } from "@stacks/network";
import {
  AnchorMode,
  broadcastTransaction,
  ClarityAbiVariable,
  ClarityType,
  ClarityValue,
  deserializeCV,
  makeContractCall,
  noneCV,
  responseErrorCV,
  responseOkCV,
  serializeCV,
  SignedContractCallOptions,
  TxBroadcastResult,
} from "@stacks/transactions";
import BN from "bn.js";
import fetch from "cross-fetch";
import {
  BaseProvider,
  ClarityAbiMap,
  cvToValue,
  getContractIdentifier,
  INodeProviderRequest,
  NodeContractInstances,
  NodeContracts,
  parseToCV,
  SubmitOptions,
  Submitter,
  Transaction,
  TransactionResult,
  WebTransactionReceipt,
} from "lib-shared";
import { err, ok } from "neverthrow";
import { getTransactionById } from "../stacks/utils";

export interface NodeConfig {
  network: StacksNetwork;
  deployerAddress?: string;
}

export class NodeProvider implements BaseProvider {
  apiClient: SmartContractsApi;
  identifier: string;
  network: StacksNetwork;

  constructor({ network, identifier }: NodeConfig & { identifier: string }) {
    const apiConfig = new Configuration({
      fetchApi: fetch,
      basePath: network.coreApiUrl,
    });

    const apiClient = new SmartContractsApi(apiConfig);
    this.apiClient = apiClient;
    this.identifier = identifier;
    this.network = network;
  }

  static fromContracts<T extends NodeContracts<M>, M>(
    contracts: T,
    config: NodeConfig,
  ): NodeContractInstances<T, M> {
    const instances = {} as NodeContractInstances<T, M>;
    for (const k in contracts) {
      const contract = contracts[k];
      contract.address = config.deployerAddress || contract.address;
      const identifier = getContractIdentifier(contract);
      const provider = new this({ ...config, identifier });
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const instance = contract.contract(provider) as ReturnType<
        T[typeof k]["contract"]
      >;
      instances[k] = {
        identifier,
        contract: instance,
      };
    }
    return instances;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async callMap(_map: ClarityAbiMap, _key: any) {
    throw new Error("Not implemented");
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async callVariable(_variable: ClarityAbiVariable) {
    throw new Error("Not implemented");
  }

  async callReadOnly(request: INodeProviderRequest) {
    const argumentsFormatted = request.arguments.map((arg, index) => {
      const { type } = request.function.args[index];
      const valueCV = parseToCV(arg, type);
      return serializeCV(valueCV).toString();
    });
    const [contractAddress, contractName] = this.identifier.split(".");
    const response = await this.apiClient.callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: request.function.name,
      readOnlyFunctionArgs: {
        sender: request.caller.address,
        arguments: argumentsFormatted,
      },
    });
    if (!response.okay || !response.result) {
      console.log(response);
      throw new Error("Error calling read-only function");
    }
    const resultCV = deserializeCV(
      Buffer.from(response.result.replace(/^0x/, ""), "hex"),
    );
    const value = cvToValue(resultCV);
    switch (resultCV.type) {
      case ClarityType.ResponseOk:
        return ok(value);
      case ClarityType.ResponseErr:
        return err(value);
      default:
        return value;
    }
  }

  callPublic(request: INodeProviderRequest): Transaction<any, any> {
    const argumentsFormatted = request.arguments.map((arg, index) => {
      const { type } = request.function.args[index];
      const valueCV = parseToCV(arg, type);
      return valueCV;
    });
    const [contractAddress, contractName] = this.identifier.split(".");
    return this.makeTx({
      contractAddress,
      contractName,
      functionName: request.function.name,
      functionArgs: argumentsFormatted,
      network: this.network,
      privateKey: request.caller.privateKey,
    });
  }

  makeTx(payload: TxPayload): NodeTransaction<any, any> {
    const submit: Submitter<any, any> = async (
      options: SubmitOptions,
    ): Promise<WebTransactionReceipt<any, any>> => {
      if ("sender" in options) {
        throw new Error("Cannot use test options");
      }

      const contractOptions: SignedContractCallOptions = {
        contractAddress: payload.contractAddress,
        contractName: payload.contractName,
        functionName: payload.functionName,
        functionArgs: payload.functionArgs,
        senderKey: payload.privateKey,
        network: payload.network,
        postConditions: options.postConditions,
        postConditionMode: options.postConditionMode,
        anchorMode: AnchorMode.Any,
      };

      if ("nonce" in options && options.nonce) {
        contractOptions.nonce = new BN(options.nonce, 10);
      }

      const tx = await makeContractCall(contractOptions);
      const broadcastResponse: TxBroadcastResult = await broadcastTransaction(
        tx,
        payload.network,
      );

      if (broadcastResponse.error) {
        throw new Error(
          `Error broadcasting transaction: ${broadcastResponse.error} - ${broadcastResponse.reason}`,
        );
      }

      const success = this.isBroadcastSuccessful(broadcastResponse);

      return {
        txId: broadcastResponse.txid,
        stacksTransaction: tx,
        getResult: async () => {
          if (success) {
            const successfulFunctionCallResult = await getTransactionById(
              broadcastResponse.txid,
              this.network,
            );

            const resultCV = deserializeCV(
              Buffer.from(successfulFunctionCallResult),
            );

            const result = cvToValue(resultCV);
            const transactionResult: TransactionResult<any, any> = {
              isOk: true,
              response: responseOkCV(resultCV),
              value: result,
              events: [], // leave events empty for now and figure later how to fetch them
            };

            return Promise.resolve(transactionResult);
          } else {
            return Promise.resolve({
              isOk: false,
              value: broadcastResponse.error,
              response: responseErrorCV(noneCV()),
            });
          }
        },
      };
    };

    return {
      payload,
      submit,
    };
  }

  private isBroadcastSuccessful(result: TxBroadcastResult): boolean {
    if (result.error || !result.txid) {
      return false;
    } else {
      return true;
    }
  }
}

interface TxPayload {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: ClarityValue[];
  network: StacksNetwork;
  privateKey: string;
  nonce?: string;
  // privateKey: string;
}

export interface ContractCallPayload extends Omit<TxPayload, "privateKey"> {
  publicKey: string;
  txType: "contract_call";
  postConditions?: string[];
}

export interface NodeTransaction<Ok, Err> extends Transaction<Ok, Err> {
  payload: TxPayload;
}
