import { FinishedTxData } from "@stacks/connect";
import { StacksNetwork } from "@stacks/network";
import { Transaction } from "lib-shared";
import { AuthOptions } from "micro-stacks/connect";

export interface SimpleStacksWebTransaction<Ok, Err>
  extends Transaction<Ok, Err> {
  payload: TxPayload;
}

export interface IContractCall {
  payload: FinishedTxData | undefined;
  success: boolean;
}

export interface TxPayload {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: string[];
  network: StacksNetwork;
  appDetails: AuthOptions["appDetails"];
}

export interface SimpleStacksContractCallPayload
  extends Omit<TxPayload, "privateKey"> {
  publicKey: string;
  txType: "contract_call";
  postConditions?: string[];
}
