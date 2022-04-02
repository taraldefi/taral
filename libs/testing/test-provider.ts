import {
  ClarityAbiFunction,
  ClarityAbiType,
  ClarityAbiVariable,
  ClarityType,
  cvToString,
  deserializeCV,
  responseErrorCV,
  responseOkCV,
} from "@stacks/transactions";
import { NativeClarityBinProvider } from "lib-clarity-bin";
import { CreateOptions, FromContractOptions } from "lib-infra";
import {
  BaseProvider,
  ClarinetAccounts,
  ClarityAbiMap,
  cvToValue,
  EvalOk,
  getContractIdentifier,
  getContractNameFromPath,
  getRootDirectory,
  INodeProviderRequest,
  NodeContractInstances,
  NodeContracts,
  parseToCV,
  SubmitOptions,
  Submitter,
  Transaction,
  TransactionResult,
} from "lib-shared";
import {
  deployContract,
  evalJson,
  evalWithCode,
  executeJson,
  getDefaultClarityBin,
} from "lib-testing";
import { err, ok } from "neverthrow";
import {
  cleanupBootContractsCalls,
  cleanupTmpContractFile,
} from "./test-utils/cleanup-boot-contract-calls";

export class TestProvider implements BaseProvider {
  private readonly clarityBin: NativeClarityBinProvider;
  private readonly contractIdentifier: string;
  private readonly contractFilePath: string;

  constructor(
    clarityBin: NativeClarityBinProvider,
    contractIdentifier: string,
    contractFilePath: string
  ) {
    this.clarityBin = clarityBin;
    this.contractIdentifier = contractIdentifier;
    this.contractFilePath = contractFilePath;
  }

  static async create({
    deploy,
    clarityBin,
    contractFilePath,
    contractIdentifier,
  }: CreateOptions) {
    let tmpContractFilePath = "";
    if (deploy) {
      tmpContractFilePath = cleanupBootContractsCalls(contractFilePath);
    }

    if (deploy) {
      await deployContract(contractIdentifier, tmpContractFilePath, clarityBin);
      cleanupTmpContractFile(tmpContractFilePath);
    }

    return new this(clarityBin, contractIdentifier, contractFilePath);
  }

  static async fromContract<T>({
    deploy,
    contract,
    clarityBin,
  }: FromContractOptions<T>) {
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
      clarityBin,
      contractFilePath: fullContractFilePath,
      contractIdentifier: `${address}.${contractName}`,
    });
    return contract.contract(provider);
  }

  public static async fromContracts<T extends NodeContracts<M>, M>(
    deploy: boolean,
    contracts: T,
    clarityBin?: NativeClarityBinProvider
  ): Promise<NodeContractInstances<T, M>>;
  public static async fromContracts<T extends NodeContracts<M>, M>(
    deploy: boolean,
    contracts: T,
    accounts?: ClarinetAccounts
  ): Promise<NodeContractInstances<T, M>>;
  public static async fromContracts<T extends NodeContracts<M>, M>(
    deploy: boolean,
    contracts: T,
    clarityBinOrAccounts?: NativeClarityBinProvider | ClarinetAccounts
  ): Promise<NodeContractInstances<T, M>> {
    const clarityBin = await getDefaultClarityBin(clarityBinOrAccounts);
    const instances = {} as NodeContractInstances<T, M>;
    for (const k in contracts) {
      const contract = contracts[k];
      const instance = await this.fromContract({
        deploy,
        contract,
        clarityBin,
      });
      instances[k] = {
        identifier: getContractIdentifier(contract),
        contract: instance as ReturnType<T[typeof k]["contract"]>,
      };
    }
    return instances;
  }

  async callMap(map: ClarityAbiMap, key: any): Promise<void> {
    const keyFormatted = this.formatArgument(map.key, key);
    const evalCode = `(map-get? ${map.name} ${keyFormatted})`;
    const result = await evalWithCode({
      contractAddress: this.contractIdentifier,
      evalCode,
      provider: this.clarityBin,
    });
    return this.handleEvalResponse(result);
  }

  async callVariable(variable: ClarityAbiVariable): Promise<void> {
    let evalCode: string;
    if (variable.access === "constant") {
      evalCode = `${variable.name}`;
    } else {
      evalCode = `(var-get ${variable.name})`;
    }
    const result = await evalWithCode({
      contractAddress: this.contractIdentifier,
      evalCode,
      provider: this.clarityBin,
    });
    return this.handleEvalResponse(result);
  }

  async callReadOnly(request: INodeProviderRequest) {
    const argsFormatted = this.formatArguments(
      request.function,
      request.arguments
    );
    const result = await evalJson({
      contractAddress: this.contractIdentifier,
      functionName: request.function.name,
      args: argsFormatted,
      provider: this.clarityBin,
    });

    return this.handleEvalResponse(result);
  }

  callPublic(request: INodeProviderRequest): Transaction<any, any> {
    const argsFormatted = this.formatArguments(
      request.function,
      request.arguments
    );
    const submit: Submitter<any, any> = async (_options: SubmitOptions) => {
      // if (!("x" in options)) {
      //   throw new Error("Passing `x` is required.");
      // }
      const receipt = await executeJson({
        provider: this.clarityBin,
        contractAddress: this.contractIdentifier,
        senderAddress: request.caller.address,
        functionName: request.function.name,
        args: argsFormatted,
      });
      const getResult = (): Promise<TransactionResult<any, any>> => {
        const resultCV = deserializeCV(
          Buffer.from(receipt.output_serialized, "hex")
        );
        const result = cvToValue(resultCV);
        if (receipt.success) {
          return Promise.resolve({
            isOk: true,
            response: responseOkCV(resultCV),
            value: result,
            events: receipt.events,
            costs: receipt.costs,
            assets: receipt.assets,
          });
        } else {
          return Promise.resolve({
            isOk: false,
            response: responseErrorCV(resultCV),
            value: result,
            costs: receipt.costs,
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

  formatArguments(func: ClarityAbiFunction, args: any[]): string[] {
    const formatted = args.map((arg, index) => {
      const { type } = func.args[index];
      return this.formatArgument(type, arg);
    });

    return formatted;
  }

  formatArgument(type: ClarityAbiType, arg: any) {
    if (type === "trait_reference") {
      return `'${arg}`;
    }
    const argCV = parseToCV(arg, type);
    const cvString = cvToString(argCV);
    if (type === "principal") {
      return `'${cvString}`;
    }
    return cvString;
  }

  handleEvalResponse(result: EvalOk) {
    const resultCV = deserializeCV(
      Buffer.from(result.output_serialized, "hex")
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
}
