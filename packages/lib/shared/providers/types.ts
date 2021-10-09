import { ClarityAbiFunction } from "@stacks/transactions";
import { ClarinetAccount } from "..";
import { Noop } from "../proxy/types";

export function unchanged(codeBody: string) {
  return codeBody;
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
