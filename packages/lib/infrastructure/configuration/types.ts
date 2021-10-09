import { DeployerAccount, NodeContract } from "lib-shared";
import { NativeClarityBinProvider } from "lib-clarity-bin";
import { StacksNetworkConfiguration } from "taral-configuration";

export interface ClarinetConfigAccount {
  mnemonic: string;
  balance: bigint;
}

export interface ClarinetDevConfig {
  network: {
    name: string;
  };
  accounts: {
    deployer: ClarinetConfigAccount;
    [key: string]: ClarinetConfigAccount;
  };
}

export interface ClarinetConfig {
  contracts: {
    [name: string]: {
      path: string;
      dependsOn: string[];
    };
  };
}

export interface ClarinetAccount extends ClarinetConfigAccount {
  address: string;
  privateKey: string;
}

export interface ClarinetAccounts {
  deployer: ClarinetAccount;
  [name: string]: ClarinetAccount;
}

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
