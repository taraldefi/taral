import { StacksNetwork } from "@stacks/network";
import { SmartContractTransaction } from "@stacks/stacks-blockchain-api-types";
import {
  callReadOnlyFunction,
  ClarityAbiVariable,
  ClarityType,
  ClarityValue,
  deserializeCV,
  getNonce,
  makeContractCall,
  noneCV,
  ReadOnlyFunctionOptions,
  responseErrorCV,
  responseOkCV,
  SignedContractCallOptions,
  SignedMultiSigContractCallOptions,
  TxBroadcastResult,
} from "@stacks/transactions";
import { ApiCreateOptions, FromApiContractOptions } from "lib-infra";
import {
  BaseProvider,
  ClarityAbiMap,
  CoreNodeEvent,
  cvToValue,
  DeployerAccount,
  getContractIdentifier,
  getContractNameFromPath,
  getRootDirectory,
  INodeProviderRequest,
  Logger,
  NodeContractInstances,
  NodeContracts,
  Submitter,
  Transaction,
  TransactionResult,
} from "lib-shared";
import { handleFunctionTransaction } from "lib-stacks";
import { err, ok } from "neverthrow";
import { NETWORK } from "taral-configuration";
import { formatArguments, getTransactionById } from "lib-stacks";
import { deployContractOnStacks } from "./stacks/deploy-contract";

const NAME = "api-provider";

export class ApiProvider implements BaseProvider {
  private readonly network: StacksNetwork;
  private readonly deployerAccount: DeployerAccount;
  private readonly contractName: string;

  constructor(
    network: StacksNetwork,
    deployerAccount: DeployerAccount,
    contractName: string,
  ) {
    this.network = network;
    this.deployerAccount = deployerAccount;
    this.contractName = contractName;
  }

  callMap(_map: ClarityAbiMap, _key: any): Promise<void> {
    Logger.error(NAME, `Method not implemented for ${_map.name}`);
    return this.asyncFunc();
  }

  callVariable(_variable: ClarityAbiVariable): Promise<void> {
    Logger.error(NAME, "Method not implemented");
    return this.asyncFunc();
  }

  asyncFunc: () => Promise<void> = async () => {
    await new Promise<void>((resolve) => resolve());
  };

  async callReadOnly(request: INodeProviderRequest): Promise<any> {
    const formattedArguments: ClarityValue[] = formatArguments(
      request.function,
      request.arguments,
    );

    const options: ReadOnlyFunctionOptions = {
      contractAddress: this.deployerAccount.stacksAddress,
      contractName: this.contractName,
      functionArgs: formattedArguments,
      functionName: request.function.name,
      senderAddress: request.caller.address,
      network: this.network,
    };

    try {
      const cv = await callReadOnlyFunction(options);

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
        error,
      );
      return err(undefined);
    }
  }

  callPublic(request: INodeProviderRequest): Transaction<any, any> {
    const formattedArguments: ClarityValue[] = formatArguments(
      request.function,
      request.arguments,
    );

    Logger.debug(
      NAME,
      `Calling public method ${request.function.name} on contract ${this.contractName}`,
    );

    const submit: Submitter<any, any> = async () => {
      // if (!("x" in options)) {
      //   throw new Error("Passing `x` is required.");
      // }

      const rawFunctionCallResult: TxBroadcastResult =
        await this.callContractFunction(
          this.contractName,
          request.function.name,
          request.caller.privateKey,
          request.caller.address,
          formattedArguments,
        );

      const success = this.isBroadcastSuccessful(rawFunctionCallResult);

      const getResult = async (): Promise<TransactionResult<any, any>> => {
        if (success) {
          const sct: SmartContractTransaction = await getTransactionById(
            rawFunctionCallResult.txid,
            this.network,
          );

          const resultCV = deserializeCV(sct.tx_result.hex);

          const result = cvToValue(resultCV);

          const response: TransactionResult<any, any> = {
            isOk: true,
            response: responseOkCV(resultCV),
            value: result,
            events: sct.events as any as CoreNodeEvent[],
          };

          return Promise.resolve(response);
        } else {
          return Promise.resolve({
            isOk: false,
            value: rawFunctionCallResult.error,
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

  public static async fromContracts<T extends NodeContracts<M>, M>(
    deploy: boolean,
    contracts: T,
    network: StacksNetwork,
    account: DeployerAccount,
  ): Promise<NodeContractInstances<T, M>> {
    const instances = {} as NodeContractInstances<T, M>;
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
        account.secretKey,
      );
    }

    return new this(network, account, contractIdentifier);
  }

  private isBroadcastSuccessful(result: TxBroadcastResult): boolean {
    if (result.error || !result.txid) {
      return false;
    } else {
      return true;
    }
  }

  async callContractFunction(
    contractName: string,
    functionName: string,
    sender: string,
    senderAddress: string,
    args: ClarityValue[],
  ) {
    const nonce = await getNonce(senderAddress, NETWORK);

    //todo: properly estimate fee or require it from upstairs
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
      nonce,
      fee: 100000,
    };

    const transaction = await makeContractCall(txOptions);

    return handleFunctionTransaction(
      transaction,
      this.network,
      functionName,
      contractName,
    );
  }
}
