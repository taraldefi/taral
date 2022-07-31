import {
  Configuration,
  SmartContractsApi,
} from "@stacks/blockchain-api-client";
import { ContractCallOptions, openContractCall } from "@stacks/connect";
import { StacksNetwork } from "@stacks/network";
import {
  AnchorMode,
  ClarityAbiVariable,
  ClarityType,
  deserializeCV,
  noneCV,
  PostCondition,
  PostConditionMode,
  responseErrorCV,
  responseOkCV,
  serializeCV,
  serializePostCondition,
  StacksTransaction,
} from "@stacks/transactions";
import {
  BaseWebProvider,
  ClarityAbiMap,
  cvToValue,
  getContractIdentifier,
  IWebProviderPublicRequest,
  IWebProviderReadonlyRequest,
  parseToCV,
  SubmitOptions,
  Transaction,
  TransactionResult,
  WebContractInstances,
  WebContracts,
  WebSignerOptions,
  WebTransactionReceipt,
} from "lib-shared";
import { getTransactionById } from "lib-stacks";
import { err, ok } from "neverthrow";
import { AppDetails, WebConfig } from "../shared";
import { IContractCall, SimpleStacksWebTransaction, TxPayload } from "./types";
import { fetch } from 'cross-fetch';

export class SimpleStacksWebProvider implements BaseWebProvider {
  apiClient: SmartContractsApi;
  identifier: string;
  network: StacksNetwork;
  appDetails: AppDetails;

  constructor({
    network,
    identifier,
    appDetails,
  }: WebConfig & { identifier: string }) {

    const _fetch = typeof window !== 'undefined' ? window.fetch.bind(window) : fetch;

    const apiConfig = new Configuration({
      fetchApi: _fetch,
      basePath: network.coreApiUrl,
    });

    const apiClient = new SmartContractsApi(apiConfig);
    this.apiClient = apiClient;
    this.identifier = identifier;
    this.network = network;
    this.appDetails = appDetails;
  }

  callMap(_map: ClarityAbiMap, _key: any): Promise<void> {
    throw new Error("Method not implemented.");
  }

  callVariable(_variable: ClarityAbiVariable): Promise<void> {
    throw new Error("Method not implemented.");
  }

  static fromContracts<T extends WebContracts<M>, M>(
    contracts: T,
    config: WebConfig
  ): WebContractInstances<T, M> {
    const instances = {} as WebContractInstances<T, M>;
    for (const k in contracts) {
      const contract = contracts[k];
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

  async callReadOnly(request: IWebProviderReadonlyRequest) {
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
        sender: request.caller,
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

  callPublic(request: IWebProviderPublicRequest): Transaction<any, any> {
    const argumentsFormatted = request.arguments.map((arg, index) => {
      const { type } = request.function.args[index];
      const valueCV = parseToCV(arg, type);
      return serializeCV(valueCV).toString("hex");
    });
    const [contractAddress, contractName] = this.identifier.split(".");

    return this.makeTx({
      contractAddress,
      contractName,
      functionName: request.function.name,
      functionArgs: argumentsFormatted,
      network: this.network,
      appDetails: this.appDetails,
    });
  }

  private makeTx<Ok, Err>(
    payload: TxPayload
  ): SimpleStacksWebTransaction<Ok, Err> {
    return {
      payload,
      submit: async (
        options: SubmitOptions
      ): Promise<WebTransactionReceipt<any, any>> => {
        const postConditions = this.serializePostConditions(
          (options as WebSignerOptions).postConditions
        );

        const contractCallOptions: ContractCallOptions = {
          contractAddress: payload.contractAddress,
          contractName: payload.contractName,
          functionArgs: payload.functionArgs,
          functionName: payload.functionName,
          anchorMode: AnchorMode.Any,
          appDetails: this.appDetails,
          network: payload.network,
          postConditionMode: PostConditionMode.Allow,
          postConditions,
        };

        const result = await this.handlePopup(contractCallOptions);
        const success = result.success;

        const connectTransaction = result.payload!.stacksTransaction;
        const stacksTransaction = new StacksTransaction(
          connectTransaction.version,
          connectTransaction.auth,
          connectTransaction.payload,
          connectTransaction.postConditions,
          connectTransaction.postConditionMode,
          connectTransaction.anchorMode,
          connectTransaction.chainId
        );

        return {
          txId: success ? result.payload?.txId : undefined,
          stacksTransaction,
          getResult: async () => {
            if (success) {
              const successfulFunctionCallResult = await getTransactionById(
                stacksTransaction.txid(),
                this.network
              );

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
                value: "Cancelled",
                response: responseErrorCV(noneCV()),
              });
            }
          },
        };
      },
    };
  }

  private async handlePopup(
    contractCallOptions: ContractCallOptions
  ): Promise<IContractCall> {
    const promise = new Promise<IContractCall>((resolve) => {
      openContractCall({
        ...contractCallOptions,
        onCancel: () => {
          resolve({
            success: false,
            payload: undefined,
          });
        },
        onFinish: (payload: any) => {
          resolve({
            payload,
            success: true,
          });
        },
      });
    });

    const result = await promise;
    return result;
  }

  private serializePostConditions(postConditions?: PostCondition[]): string[] {
    let pcSerialized: string[] = [];
    if (postConditions && typeof postConditions[0] !== "string") {
      pcSerialized = postConditions.map((pc) =>
        serializePostCondition(pc).toString("hex")
      );
    }
    return pcSerialized;
  }
}
