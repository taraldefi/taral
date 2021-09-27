import { NativeClarityBinProvider } from "lib-clarity-bin";
import { StacksNetworkConfiguration } from "taral-configuration";
import { ClarinetAccount, ClarinetAccounts } from "./configuration";
import type { BaseProvider, DeployerAccount } from "./providers";
import { ResultAssets } from "./transaction";

export type ContractBuilder<T> = (
  provider: BaseProvider
) => (account: ClarinetAccount) => T;

export interface Contract<T> {
  address: string;
  contractFile: string;
  contract: ContractBuilder<T>;
}

export interface Contracts<T> {
  [key: string]: Contract<T>;
}

export interface ContractInstance<T> {
  identifier: string;
  contract: T;
}

export type ContractInstances<T extends Contracts<M>, M> = {
  [Name in keyof T]: ContractInstance<ReturnType<T[Name]["contract"]>>;
};

export interface EvalOk {
  success: true;
  costs: {
    [key: string]: any;
    runtime: number;
  };
  output_serialized: string;
}

export interface EvalErr {
  success: false;
  error: string;
}

export type EvalResult = EvalOk | EvalErr;

export interface Allocation {
  principal: string;
  amount: number;
}

export interface ExecuteOk {
  success: true;
  message: string;
  events: any[];
  output_serialized: string;
  costs: {
    [key: string]: any;
    runtime: number;
  };
  assets: ResultAssets;
  // todo: logs
}

export interface ExecuteErr {
  message: string;
  error: any;
  output_serialized: string;
  costs: {
    [key: string]: any;
    runtime: number;
  };
  assets: ResultAssets;
  success: false;
}

export type ExecuteResult = ExecuteOk | ExecuteErr;

export interface BaseCreateOptions {
  allocations?: Allocation[];
  contractIdentifier: string;
  contractFilePath: string;
}

export interface ApiCreateOptions extends BaseCreateOptions {
  deploy: boolean;
  network: StacksNetworkConfiguration;
  account: DeployerAccount;
}

export interface CreateOptions extends BaseCreateOptions {
  deploy: boolean;
  clarityBin: NativeClarityBinProvider;
}

export interface FromApiContractOptions<T> {
  deploy: boolean;
  contract: Contract<T>;
  network: StacksNetworkConfiguration;
  account: DeployerAccount;
}

export interface FromContractOptions<T> {
  deploy: boolean;
  clarityBin: NativeClarityBinProvider;
  contract: Contract<T>;
}

export interface UtilsContract {
  getBlockHeight: Promise<number>;
}

export type AllocationOrAccounts = ClarinetAccounts | Allocation[];
