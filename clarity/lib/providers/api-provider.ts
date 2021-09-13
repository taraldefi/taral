import { SmartContractTransaction } from "@stacks/stacks-blockchain-api-types";
import {
  callReadOnlyFunction,
  ClarityAbiVariable,
  ClarityType,
  ClarityValue,
  deserializeCV,
  makeContractCall,
  noneCV,
  ReadOnlyFunctionOptions,
  responseErrorCV,
  responseOkCV,
  SignedContractCallOptions,
  SignedMultiSigContractCallOptions,
  TxBroadcastResultOk,
  TxBroadcastResultRejected,
} from "@stacks/transactions";
import BN from "bn.js";
import { err, ok } from "neverthrow";
import { StacksNetworkConfiguration } from "../../configuration/stacks-network";
import { ClarityAbiMap, cvToValue } from "../clarity";
import { Logger } from "../logger";
import { deployContractOnStacks } from "../stacks/deploy-contract";
import { formatArguments } from "../stacks/format-arguments";
import { getNonce } from "../stacks/get-nonce";
import { handleFunctionTransaction } from "../stacks/handle-function-transaction";
import { getTransactionById } from "../stacks/utils";
import { Submitter, Transaction, TransactionResult } from "../transaction";
import {
  ApiCreateOptions,
  ContractInstances,
  Contracts,
  FromApiContractOptions,
} from "../types";
import { getContractIdentifier, getContractNameFromPath } from "../utils";
import { BaseProvider, IProviderRequest } from "./base-provider";
import { DeployerAccount, IMetadata } from "./types";

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
    let formattedArguments: [ClarityValue[], IMetadata] = formatArguments(
      request.function,
      request.arguments
    );

    var metadata = formattedArguments[1];
    var args = formattedArguments[0];

    let options: ReadOnlyFunctionOptions = {
      contractAddress: this.deployerAccount.stacksAddress,
      contractName: this.contractName,
      functionArgs: args,
      functionName: request.function.name,
      senderAddress: metadata.address,
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
    let formattedArguments: [ClarityValue[], IMetadata] = formatArguments(
      request.function,
      request.arguments
    );
    var metadata = formattedArguments[1];
    var args = formattedArguments[0];

    Logger.debug(
      `Calling public method ${request.function.name} on contract ${this.contractName}`
    );
    Logger.debug(JSON.stringify(request));

    const submit: Submitter<any, any> = async (options) => {
      if (!("sender" in options)) {
        throw new Error("Passing `sender` is required.");
      }

      var rawFunctionCallResult = await this.callContractFunction(
        this.contractName,
        request.function.name,
        metadata.sender ?? options.sender,
        metadata.address,
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
        successfulFunctionCallResult = await getTransactionById(
          rawFunctionCallResult as TxBroadcastResultOk,
          this.network
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
      await deployContractOnStacks(
        contractIdentifier,
        contractFilePath,
        network,
        account.secretKey
      );
    }

    return new this(network, account, contractIdentifier);
  }

  async callContractFunction(
    contractName: string,
    functionName: string,
    sender: string,
    senderAddress: string,
    args: ClarityValue[]
  ) {
    const nonce = await getNonce({
      principal: senderAddress,
    });

    const nextNonce = nonce.possible_next_nonce;

    const callNonce = new BN(nextNonce);

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
      nonce: callNonce,
    };

    Logger.debug(`Contract function call on ${contractName}::${functionName}`);
    Logger.debug(JSON.stringify(txOptions));

    const transaction = await makeContractCall(txOptions);

    Logger.debug(`Issued transaction on ${contractName}::${functionName}`);
    Logger.debug(JSON.stringify(transaction));

    return handleFunctionTransaction(
      transaction,
      this.network,
      functionName,
      contractName
    );
  }
}
