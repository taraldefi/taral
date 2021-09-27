import {
  Configuration,
  SmartContractsApi,
} from "@stacks/blockchain-api-client";
import {
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
  TxBroadcastResultOk,
  TxBroadcastResultRejected,
} from "@stacks/transactions";
import BN from "bn.js";
import fetch from "cross-fetch";
import { err, ok } from "neverthrow";
import { StacksNetworkConfiguration } from "taral-configuration";
import { BaseProvider, IProviderRequest } from "lib-shared";
import {
  ClarityAbiMap,
  ContractInstances,
  Contracts,
  cvToValue,
  getContractIdentifier,
  parseToCV,
  SubmitOptions,
  Submitter,
  Transaction,
  TransactionResult,
  WebTransactionReceipt,
} from "lib-shared";
import { getTransactionById } from "../stacks/utils";

export interface NodeConfig {
  privateKey: string;
  network: StacksNetworkConfiguration;
  deployerAddress?: string;
}

export class NodeProvider implements BaseProvider {
  apiClient: SmartContractsApi;
  identifier: string;
  privateKey: string;
  network: StacksNetworkConfiguration;

  constructor({
    network,
    identifier,
    privateKey,
  }: NodeConfig & { identifier: string }) {
    const apiConfig = new Configuration({
      fetchApi: fetch,
      basePath: network.coreApiUrl,
    });

    const apiClient = new SmartContractsApi(apiConfig);
    this.apiClient = apiClient;
    this.identifier = identifier;
    this.privateKey = privateKey;
    this.network = network;
  }

  static fromContracts<T extends Contracts<M>, M>(
    contracts: T,
    config: NodeConfig
  ): ContractInstances<T, M> {
    const instances = {} as ContractInstances<T, M>;
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

  async callMap(_map: ClarityAbiMap, _key: any) {
    throw new Error("Not implemented");
  }

  async callVariable(_variable: ClarityAbiVariable) {
    throw new Error("Not implemented");
  }

  async callReadOnly(request: IProviderRequest) {
    const argumentsFormatted = request.arguments.map((arg, index) => {
      const { type } = request.function.args[index];
      const valueCV = parseToCV(arg, type);
      return serializeCV(valueCV).toString("hex");
    });
    const [contractAddress, contractName] = this.identifier.split(".");
    const response = await this.apiClient.callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: request.function.name,
      readOnlyFunctionArgs: {
        sender: "STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6",
        arguments: argumentsFormatted,
      },
    });
    if (!response.okay || !response.result) {
      console.log(response);
      throw new Error("Error calling read-only function");
    }
    const resultCV = deserializeCV(
      Buffer.from(response.result.replace(/^0x/, ""), "hex")
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

  callPublic(request: IProviderRequest): Transaction<any, any> {
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
      privateKey: this.privateKey,
    });
  }

  makeTx(payload: TxPayload): NodeTransaction<any, any> {
    const submit: Submitter<any, any> = async (
      options: SubmitOptions
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
        anchorMode: 3,
        // fee: new BN(10000, 10),
      };

      if ("nonce" in options && options.nonce) {
        contractOptions.nonce = new BN(options.nonce, 10);
      }

      const tx = await makeContractCall(contractOptions);
      const broadcastResponse = await broadcastTransaction(tx, payload.network);

      let successfulFunctionCallResult: TxBroadcastResultOk = "";
      let unsuccessfullFunctionCalResult: TxBroadcastResultRejected;

      let success: boolean;
      if ((broadcastResponse as TxBroadcastResultRejected).error) {
        success = false;
        unsuccessfullFunctionCalResult =
          broadcastResponse as TxBroadcastResultRejected;
      } else {
        success = true;
        successfulFunctionCallResult = await getTransactionById(
          broadcastResponse as TxBroadcastResultOk,
          this.network
        );
      }

      if (typeof broadcastResponse === "string") {
        return {
          txId: broadcastResponse,
          stacksTransaction: tx,
          getResult: () => {
            if (success) {
              const resultCV = deserializeCV(
                Buffer.from(successfulFunctionCallResult)
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
                value: unsuccessfullFunctionCalResult.error,
                response: responseErrorCV(noneCV()),
              });
            }
          },
        };
      }

      throw new Error(
        `Error broadcasting transaction: ${broadcastResponse.error} - ${broadcastResponse.reason}`
      );
    };

    return {
      payload,
      submit,
    };
  }
}

interface TxPayload {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: ClarityValue[];
  network: StacksNetworkConfiguration;
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
