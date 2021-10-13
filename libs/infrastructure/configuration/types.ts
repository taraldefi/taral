import { NativeClarityBinProvider } from "lib-clarity-bin";
import { ClarinetAccounts, DeployerAccount, NodeContract } from "lib-shared";
import { StacksNetworkConfiguration } from "taral-configuration";

export interface ConfigContract {
  address: string;
  file: string;
}

export type AllocationOrAccounts = ClarinetAccounts | Allocation[];

export interface Allocation {
  principal: string;
  amount: number;
}

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
  contract: NodeContract<T>;
  network: StacksNetworkConfiguration;
  account: DeployerAccount;
}

export interface FromContractOptions<T> {
  deploy: boolean;
  clarityBin: NativeClarityBinProvider;
  contract: NodeContract<T>;
}
