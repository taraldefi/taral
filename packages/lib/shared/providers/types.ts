import { ClarityAbiFunction } from "@stacks/transactions";
import { Noop } from "../proxy/types";

export function unchanged(codeBody: string) {
  return codeBody;
}

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

export interface DeployerAccount {
  secretKey: string;
  stacksAddress: string;
}

export interface INodeProviderRequest {
  function: ClarityAbiFunction;
  caller: ClarinetAccount;
  arguments: any[];
}

export interface IWebProviderRequest {
  function: ClarityAbiFunction;
  arguments: any[];
  onFinish: Noop;
  onCancel: Noop;
}
