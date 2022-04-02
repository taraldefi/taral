import { Readable } from "stream";

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

export interface ExecuteOptions {
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  stdin?: Readable | string;
}

export interface InitialAllocation {
  principal: string;
  amount: number;
}

export interface ResultInterface<ResultType, ErrorType> {
  success: boolean;
  error?: ErrorType;
  result?: ResultType;
}

export interface Receipt extends ResultInterface<string, string> {
  debugOutput?: string;
}

export interface BufferAtomicType {
  BufferType: number;
}

export interface OptionalType {
  OptionalType: TypeSignature;
}

export const ResponseTypeOk = 0;
export const ResponseTypeError = 1;

export interface ResponseType {
  ResponseType: {
    [ResponseTypeOk]: TypeSignature;
    [ResponseTypeError]: TypeSignature;
  };
}

export interface TupleAtomicType {
  TupleType: {
    type_map: {
      [name: string]: TypeSignature;
    };
  };
}

export type AtomicType =
  | "NoType"
  | "IntType"
  | "BoolType"
  | "PrincipalType"
  | BufferAtomicType
  | OptionalType
  | ResponseType
  | TupleAtomicType;

export interface TypeSignature {
  atomic_type: AtomicType;
  list_dimensions?: number | null;
}

export interface FunctionArg extends TypeSignature {
  name: string;
}

export const FunctionArgTypes = 0;
export const FunctionReturnType = 1;

export interface FunctionTypeSignatureArray {
  [FunctionArgTypes]: FunctionArg[];
  [FunctionReturnType]: TypeSignature;
}

export interface FunctionTypeSignature {
  Fixed: FunctionTypeSignatureArray;
  // Variadic?: FunctionTypeSignatureArray;
}

export interface ContractInterface {
  private_function_types: {
    [name: string]: FunctionTypeSignature;
  };
  public_function_types: {
    [name: string]: FunctionTypeSignature;
  };
  read_only_function_types: {
    [name: string]: FunctionTypeSignature;
  };
  variable_types: {
    [name: string]: TypeSignature;
  };
  map_types: {
    [name: string]: TypeSignature[];
  };
}

export interface Provider {
  initialize(): Promise<void>;

  checkContract(contractFilePath: string): Promise<CheckResult>;

  launchContract(
    contractName: string,
    contractFilePath: string
  ): Promise<Receipt>;

  execute(
    contractName: string,
    functionName: string,
    senderAddress: string,
    ...args: string[]
  ): Promise<Receipt>;

  eval(
    contractName: string,
    evalStatement: string,
    includeDebugOutput?: boolean,
    atChaintip?: boolean
  ): Promise<Receipt>;

  evalRaw(evalStatement: string): Promise<Receipt>;

  getBlockHeight(): Promise<bigint>;

  mineBlock(time?: number | bigint): Promise<void>;

  close(): Promise<void>;
}

export type CheckResult = ResultInterface<ContractInterface, string>;

export class ExecutionError extends Error {
  readonly code: number;
  readonly commandOutput: string;
  readonly errorOutput: string;
  constructor(
    message: string,
    code: number,
    commandOutput: string,
    errorOutput: string
  ) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    this.code = code;
    this.commandOutput = commandOutput;
    this.errorOutput = errorOutput;
  }
}
