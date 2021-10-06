import {
  Configuration,
  SmartContractsApi,
} from "@stacks/blockchain-api-client";

import {
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
} from "@stacks/transactions";

import { ok, err } from "neverthrow";

import {
  BaseProvider,
  Transaction,
  getContractIdentifier,
  Contracts,
  ContractInstances,
  cvToValue,
  parseToCV,
  SubmitOptions,
  IProviderRequest,
  ClarityAbiMap,
  TransactionResult,
  WebSignerOptions,
} from "lib-shared";

import { StacksNetworkConfiguration } from "taral-configuration";
import { getTransactionById } from "lib-stacks";
import { WebConfig } from "../shared";
import {
  AuthOptions,
} from "micro-stacks/connect";
import {} from "micro-stacks/connect";
import { bytesToHex } from "micro-stacks/common";
import {
  IContractCall,
  MicroStacksWebTransactionReceipt,
} from "./types";

import { useTransactionPopup } from 'micro-stacks/react';
import { StacksTestnet } from "micro-stacks/network";

export class MicroStacksWebProvider implements BaseProvider {
  apiClient: SmartContractsApi;
  identifier: string;
  stxAddress: string;
  privateKey: string;
  network: StacksNetworkConfiguration;
  appDetails: AuthOptions["appDetails"];

  constructor({
    network,
    identifier,
    stxAddress,
    privateKey,
    appDetails,
  }: WebConfig & { identifier: string }) {
    const apiConfig = new Configuration({
      fetchApi: window.fetch.bind(window),
      basePath: network.coreApiUrl,
    });

    const apiClient = new SmartContractsApi(apiConfig);
    this.apiClient = apiClient;
    this.identifier = identifier;
    this.privateKey = privateKey;
    this.stxAddress = stxAddress;
    this.network = network;
    this.appDetails = appDetails;
  }

  callMap(_map: ClarityAbiMap, _key: any): Promise<void> {
    throw new Error("Method not implemented.");
  }

  callVariable(_variable: ClarityAbiVariable): Promise<void> {
    throw new Error("Method not implemented.");
  }

  static fromContracts<T extends Contracts<M>, M>(
    contracts: T,
    config: WebConfig
  ): ContractInstances<T, M> {
    const instances = {} as ContractInstances<T, M>;
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
        sender: request.caller.address,
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
    const result: Transaction<any, any> = {
      submit: async (
        options: SubmitOptions
      ): Promise<MicroStacksWebTransactionReceipt<any, any>> => {
        const postConditions = this.serializePostConditions(
          (options as WebSignerOptions).postConditions
        );

        const contractCallResult = await this.handleContractCallInternal(request, (options as WebSignerOptions).postConditions);

        const success = contractCallResult.success;

        return {
          txId: success ? contractCallResult.payload?.txId : undefined,
          stacksTransaction: success ? contractCallResult.payload!.stacksTransaction: undefined,
          getResult: async () => {
            if (success) {
              const successfulFunctionCallResult = await getTransactionById(
                contractCallResult.payload!.stacksTransaction.txid(),
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

    return result;
  }

  private async handleContractCallInternal(request: IProviderRequest, postConditions?: PostCondition[]): Promise<IContractCall> {
    const argumentsFormatted = request.arguments.map((arg, index) => {
      const { type } = request.function.args[index];
      const valueCV = parseToCV(arg, type);
      return bytesToHex(serializeCV(valueCV));
    });

    const serializedPostConditions = this.serializePostConditions(
      postConditions
    );

    const [contractAddress, contractName] = this.identifier.split(".");

    const { handleContractCall } = useTransactionPopup();

    const promise = new Promise<IContractCall>(async (resolve) => {

      await handleContractCall({
        onFinish: (data: any) => {
          resolve({
            success: true,
            payload: data
          });
        },
        onCancel: () => {
          resolve({
            success: false,
            payload: undefined,
          });
        },
        contractAddress,
        contractName, 
        functionArgs: argumentsFormatted,
        network: new StacksTestnet(),
        functionName: request.function.name,
        postConditionMode: PostConditionMode.Allow,
        validateWithAbi: true,
        appDetails: this.appDetails,
        postConditions: serializedPostConditions,
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
