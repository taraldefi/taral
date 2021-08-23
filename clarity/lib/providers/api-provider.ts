import { SmartContractTransaction } from "@stacks/stacks-blockchain-api-types";
import {
  broadcastTransaction,
  callReadOnlyFunction,
  ClarityAbiFunction,
  ClarityAbiVariable,
  ClarityType,
  ClarityValue,
  cvToString,
  deserializeCV,
  makeContractCall,
  makeContractDeploy,
  noneCV,
  ReadOnlyFunctionOptions,
  responseErrorCV,
  responseOkCV,
  SignedContractCallOptions,
  SignedMultiSigContractCallOptions,
  StacksTransaction,
  TxBroadcastResult,
  TxBroadcastResultOk,
  TxBroadcastResultRejected,
} from "@stacks/transactions";
import { StacksNetworkConfiguration } from "../../configuration/stacks-network";
import * as fs from "fs";
import { err, ok } from "neverthrow";
import { ClarityAbiMap, cvToValue, parseToCV } from "../clarity";
import { Logger } from "../logger";
import { Submitter, Transaction, TransactionResult } from "../transaction";
import {
  ApiCreateOptions,
  ContractInstances,
  Contracts,
  FromApiContractOptions,
} from "../types";
import { getContractIdentifier, getContractNameFromPath } from "../utils";
import { BaseProvider, IProviderRequest } from "./base-provider";
import { DeployerAccount, IMetadata, instanceOfMetadata } from "./types";

export class ApiProvider implements BaseProvider {
  private readonly network: StacksNetworkConfiguration;
  private readonly deployerAccount: DeployerAccount;
  private readonly contractName: string;

  constructor(
    network: StacksNetworkConfiguration,
    deployerAccount: DeployerAccount,
    contractName: string
  ) {
    this.network = network;
    this.deployerAccount = deployerAccount;
    this.contractName = contractName;
  }

  callMap(_map: ClarityAbiMap, _key: any): Promise<void> {
    Logger.error("Method not implemented");
    return this.asyncFunc();
  }

  callVariable(_variable: ClarityAbiVariable): Promise<void> {
    Logger.error("Method not implemented");
    return this.asyncFunc();
  }

  asyncFunc: () => Promise<void> = async () => {
    await new Promise<void>((resolve) => resolve());
  };

  async callReadOnly(request: IProviderRequest): Promise<any> {
    let formattedArguments: [ClarityValue[], IMetadata] =
      this.formatReadonlyArguments(request.function, request.arguments);

    var metadata = formattedArguments[1];
    var args = formattedArguments[0];

    let options: ReadOnlyFunctionOptions = {
      contractAddress: this.deployerAccount.stacksAddress,
      contractName: this.contractName,
      functionArgs: args,
      functionName: request.function.name,
      senderAddress: metadata.sender,
      network: this.network,
    };

    try {
      var cv = await callReadOnlyFunction(options);

      const value = cvToValue(cv);

      switch (cv.type) {
        case ClarityType.ResponseOk:
          return ok(value);
        case ClarityType.ResponseErr:
          return err(value);
        default:
          return value;
      }
    } catch (error) {
      Logger.error("----------------");
      Logger.error(`Error calling readonly function ${request.function.name}`);
      Logger.error("Arguments:");
      Logger.error(JSON.stringify(options));
      Logger.error(JSON.stringify(error));
      Logger.error("----------------");

      return err(undefined);
    }
  }

  callPublic(request: IProviderRequest): Transaction<any, any> {
    let formattedArguments: [string[], IMetadata] = this.formatArguments(
      request.function,
      request.arguments
    );
    var metadata = formattedArguments[1];
    var args = formattedArguments[0];

    const submit: Submitter<any, any> = async (options) => {
      if (!("sender" in options)) {
        throw new Error("Passing `sender` is required.");
      }

      var rawFunctionCallResult = await this.callContractFunction(
        this.contractName,
        request.function.name,
        metadata.sender,
        args
      );

      let successfulFunctionCallResult: TxBroadcastResultOk = "";

      let unsuccessfullFunctionCalResult: TxBroadcastResultRejected;

      let success: boolean;
      if ((rawFunctionCallResult as TxBroadcastResultRejected).error) {
        success = false;
        unsuccessfullFunctionCalResult =
          rawFunctionCallResult as TxBroadcastResultRejected;
      } else {
        success = true;
        successfulFunctionCallResult = await ApiProvider.getTransactionById(
          this.network,
          rawFunctionCallResult as TxBroadcastResultOk
        );
      }

      const getResult = (): Promise<TransactionResult<any, any>> => {
        if (success) {
          const sct: SmartContractTransaction =
            successfulFunctionCallResult as any as SmartContractTransaction;

          const resultCV = deserializeCV(sct.tx_result.hex);

          const result = cvToValue(resultCV);

          return Promise.resolve({
            isOk: true,
            response: responseOkCV(resultCV),
            value: result,
            events: sct.events,
          });
        } else {
          return Promise.resolve({
            isOk: false,
            value: unsuccessfullFunctionCalResult.error,
            response: responseErrorCV(noneCV()),
          });
        }
      };
      return {
        getResult,
      };
    };
    return {
      submit,
    };
  }

  public static async fromContracts<T extends Contracts<M>, M>(
    deploy: boolean,
    contracts: T,
    network: StacksNetworkConfiguration,
    account: DeployerAccount
  ): Promise<ContractInstances<T, M>> {
    const instances = {} as ContractInstances<T, M>;
    for (const k in contracts) {
      const contract = contracts[k];
      const instance = await this.fromContract({
        deploy,
        contract,
        network,
        account,
      });
      instances[k] = {
        identifier: getContractIdentifier(contract),
        contract: instance as ReturnType<T[typeof k]["contract"]>,
      };
    }
    return instances;
  }

  static async fromContract<T>({
    deploy,
    contract,
    network,
    account,
  }: FromApiContractOptions<T>) {
    const { address } = contract;
    if (!address) {
      throw new Error("TestProvider must have an address");
    }
    const contractName = getContractNameFromPath(contract.contractFile);

    const provider = await this.create({
      deploy,
      contractFilePath: contract.contractFile,
      contractIdentifier: contractName,
      network,
      account,
    });
    return contract.contract(provider);
  }

  static async create({
    deploy,
    contractFilePath,
    contractIdentifier,
    network,
    account,
  }: ApiCreateOptions) {
    if (deploy) {
      await this.deployContract(
        contractIdentifier,
        contractFilePath,
        network,
        account.secretKey
      );
    }

    return new this(network, account, contractIdentifier);
  }

  static async deployContract(
    contractName: string,
    contractPath: string,
    network: StacksNetworkConfiguration,
    secretDeployKey: string
  ) {
    let codeBody = fs.readFileSync(contractPath).toString();

    var transaction = await makeContractDeploy({
      contractName,
      codeBody,
      senderKey: secretDeployKey,
      network,
      anchorMode: 3
    });

    return this.handleTransaction(transaction, network);
  }

  static async handleTransaction(
    transaction: StacksTransaction,
    network: StacksNetworkConfiguration
  ): Promise<TxBroadcastResultOk> {
    const result = await broadcastTransaction(transaction, network);
    if ((result as TxBroadcastResultRejected).error) {
      if (
        (result as TxBroadcastResultRejected).reason === "ContractAlreadyExists"
      ) {
        Logger.info("Contract already deployed");
        return "" as TxBroadcastResultOk;
      } else {
        throw new Error(
          `failed to handle transaction ${transaction.txid()}: ${JSON.stringify(
            result
          )}`
        );
      }
    }

    const processed = await this.processing(
      network,
      result as TxBroadcastResultOk
    );

    if (!processed) {
      throw new Error(
        `failed to process transaction ${transaction.txid}: transaction not found`
      );
    }

    return result as TxBroadcastResultOk;
  }

  async timeout(ms: number) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  static async processing(
    network: StacksNetworkConfiguration,
    tx: string,
    count: number = 0
  ): Promise<boolean> {
    return this.processingWithSidecar(tx, count, network);
  }

  static async processingWithSidecar(
    tx: string,
    count: number = 0,
    network: StacksNetworkConfiguration
  ): Promise<boolean> {
    var value = await this.getTransactionById(network, tx);
    if (value.tx_status === "success") {
      return true;
    }

    if (count > 20) {
      return false;
    }

    await this.timeout(3000);
    return this.processing(network, tx, count + 1);
  }

  static async getTransactionById(
    network: StacksNetworkConfiguration,
    txId: string
  ): Promise<any> {
    const url = `${network.coreApiUrl}/extended/v1/tx/${txId}`;
    var result = await fetch(url);
    var value = await result.json();

    return value;
  }

  static async timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async callContractFunction(
    contractName: string,
    functionName: string,
    sender: any,
    args: any
  ) {
    const txOptions:
      | SignedContractCallOptions
      | SignedMultiSigContractCallOptions = {
      contractAddress: this.deployerAccount.stacksAddress,
      contractName: contractName,
      functionName: functionName,
      functionArgs: args,
      senderKey: sender,
      network: this.network,
      postConditionMode: 0x01, // PostconditionMode.Allow
      anchorMode: 3,
    };

    Logger.debug(`Contract function call on ${contractName}::${functionName}`);

    const transaction = await makeContractCall(txOptions);
    return this.handleFunctionTransaction(
      transaction,
      this.network,
      functionName,
      contractName
    );
  }

  async handleFunctionTransaction(
    transaction: StacksTransaction,
    network: StacksNetworkConfiguration,
    functionName: string,
    contractName: string
  ): Promise<TxBroadcastResult> {
    const result = await broadcastTransaction(transaction, network);
    if ((result as TxBroadcastResultRejected).error) {
      return result as TxBroadcastResultRejected;
    }

    const processed = await this.functionProcessing(
      network,
      result as TxBroadcastResultOk,
      functionName,
      contractName
    );

    if (!processed) {
      return result as TxBroadcastResultRejected;
    }

    return result as TxBroadcastResultOk;
  }

  async functionProcessing(
    network: StacksNetworkConfiguration,
    tx: String,
    functionName: string,
    contractName: string,
    count: number = 0
  ): Promise<boolean> {
    return this.functionProcessingWithSidecar(
      tx,
      count,
      network,
      functionName,
      contractName
    );
  }

  async functionProcessingWithSidecar(
    tx: String,
    count: number = 0,
    network: StacksNetworkConfiguration,
    functionName: string,
    contractName: string
  ): Promise<boolean> {
    const url = `${network.coreApiUrl}/extended/v1/tx/${tx}`;
    var result = await fetch(url);
    var value = await result.json();
    if (value.tx_status === "success") {
      return true;
    }

    if (count > 30) {
      Logger.error(
        `Failed calling ${contractName}::${functionName} after 30 retries `
      );
      return false;
    }

    await this.timeout(3000);
    return this.functionProcessing(
      network,
      tx,
      functionName,
      contractName,
      count + 1
    );
  }

  formatArguments(
    func: ClarityAbiFunction,
    args: any[]
  ): [string[], IMetadata] {
    var metadata = args.filter((arg) => instanceOfMetadata(arg));
    if (metadata.length > 1) {
      throw new TypeError("More than one metadata objects");
    }

    var metadataConfig = metadata[0];

    var argsWithoutMetadata =
      metadata.length == 1 ? args.filter((x) => x !== metadataConfig) : args;

    var formatted = argsWithoutMetadata.map((arg, index) => {
      const { type } = func.args[index];
      if (type === "trait_reference") {
        return `'${arg}`;
      }
      const argCV = parseToCV(arg, type);
      const cvString = cvToString(argCV);
      if (type === "principal") {
        return `'${cvString}`;
      }
      return cvString;
    });

    return [formatted, metadataConfig];
  }

  formatReadonlyArguments(
    func: ClarityAbiFunction,
    args: any[]
  ): [ClarityValue[], IMetadata] {
    var metadata = args.filter((arg) => instanceOfMetadata(arg));
    if (metadata.length > 1) {
      throw new TypeError("More than one metadata objects");
    }

    var metadataConfig = metadata[0];

    var argsWithoutMetadata =
      metadata.length == 1 ? args.filter((x) => x !== metadataConfig) : args;

    var formatted = argsWithoutMetadata.map((arg, index) => {
      const { type } = func.args[index];
      const argCV = parseToCV(arg, type);
      return argCV;
    });

    return [formatted, metadataConfig];
  }
}
