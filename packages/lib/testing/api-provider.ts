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
import {
  ApiCreateOptions,
  BaseProvider,
  ClarityAbiMap,
  ContractInstances,
  Contracts,
  cvToValue,
  DeployerAccount,
  FromApiContractOptions,
  getContractIdentifier,
  getContractNameFromPath,
  getRootDirectory,
  IProviderRequest,
  Logger,
  Submitter,
  Transaction,
  TransactionResult,
} from "lib-shared";
import { handleFunctionTransaction } from "lib-stacks";
import { err, ok } from "neverthrow";
import { StacksNetworkConfiguration } from "taral-configuration";
import { deployContractOnStacks } from "../stacks/deploy-contract";
import { formatArguments } from "../stacks/format-arguments";
import { getNonce } from "../stacks/get-nonce";
import { getTransactionById } from "../stacks/utils";

const NAME = "api-provider";

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
    Logger.error(NAME, "Method not implemented");
    return this.asyncFunc();
  }

  callVariable(_variable: ClarityAbiVariable): Promise<void> {
    Logger.error(NAME, "Method not implemented");
    return this.asyncFunc();
  }

  asyncFunc: () => Promise<void> = async () => {
    await new Promise<void>((resolve) => resolve());
  };

  async callReadOnly(request: IProviderRequest): Promise<any> {
    let formattedArguments: ClarityValue[] = formatArguments(
      request.function,
      request.arguments
    );

    let options: ReadOnlyFunctionOptions = {
      contractAddress: this.deployerAccount.stacksAddress,
      contractName: this.contractName,
      functionArgs: formattedArguments,
      functionName: request.function.name,
      senderAddress: request.caller.address,
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
      Logger.error(
        NAME,
        `Error calling readonly function ${request.function.name} with arguments `,
        options,
        error
      );
      return err(undefined);
    }
  }

  callPublic(request: IProviderRequest): Transaction<any, any> {
    let formattedArguments: ClarityValue[] = formatArguments(
      request.function,
      request.arguments
    );

    Logger.debug(
      NAME,
      `Calling public method ${request.function.name} on contract ${this.contractName}`
    );

    const submit: Submitter<any, any> = async () => {
      // if (!("x" in options)) {
      //   throw new Error("Passing `x` is required.");
      // }

      var rawFunctionCallResult = await this.callContractFunction(
        this.contractName,
        request.function.name,
        request.caller.privateKey,
        request.caller.address,
        formattedArguments
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

          const response: TransactionResult<any, any> = {
            isOk: true,
            response: responseOkCV(resultCV),
            value: result,
            events: sct.events,
          };

          return Promise.resolve(response);
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
    const fullContractFilePath = `${getRootDirectory()}/${
      contract.contractFile
    }`;

    const provider = await this.create({
      deploy,
      contractFilePath: fullContractFilePath,
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

    const transaction = await makeContractCall(txOptions);

    return handleFunctionTransaction(
      transaction,
      this.network,
      functionName,
      contractName
    );
  }
}
