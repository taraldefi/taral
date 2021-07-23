import {
  broadcastTransaction,
  makeContractDeploy,
  StacksTransaction,
  TxBroadcastResultOk,
  TxBroadcastResultRejected,
  makeContractCall,
  SignedContractCallOptions,
  SignedMultiSigContractCallOptions,
} from "@stacks/transactions";
import { Logger } from "../shared/logger";
import * as fs from "fs";
import fetch from "node-fetch";

import { ADDR1, testnetKeyMap } from "../configuration/testnet";
import { Contracts } from "../shared/types";
import { getContractNameFromPath } from "../shared/utils/contract-name-for-path";
import { getTransactionUrl, NETWORK } from "../configuration";

const keys = testnetKeyMap[ADDR1];

export const secretKey = keys.secretKey;

export const contractAddress = keys.address;

const deployKey = testnetKeyMap[ADDR1];

export const deployContractAddress = deployKey.address;

export const secretDeployKey = deployKey.secretKey;

export async function handleTransaction(transaction: StacksTransaction) {
  const result = await broadcastTransaction(transaction, NETWORK);
  Logger.debug(`Broadcast transaction result: ${JSON.stringify(result)}`);

  if ((result as TxBroadcastResultRejected).error) {
    if (
      (result as TxBroadcastResultRejected).reason === "ContractAlreadyExists"
    ) {
      Logger.debug("already deployed");
      return "" as TxBroadcastResultOk;
    } else {
      throw new Error(
        `failed to handle transaction ${transaction.txid()}: ${JSON.stringify(
          result
        )}`
      );
    }
  }

  const processed = await processing(result as TxBroadcastResultOk);
  if (!processed) {
    throw new Error(
      `failed to process transaction ${transaction.txid}: transaction not found`
    );
  }

  Logger.debug(`Processed: ${processed}, Result: ${JSON.stringify(result)}`);
  return result as TxBroadcastResultOk;
}

export async function callContractFunction(
  contractName: string,
  functionName: string,
  sender: any,
  args: any
) {
  const txOptions:
    | SignedContractCallOptions
    | SignedMultiSigContractCallOptions = {
    contractAddress: deployContractAddress,
    contractName: contractName,
    functionName: functionName,
    functionArgs: args,
    senderKey: sender,
    network: NETWORK,
    postConditionMode: 0x01, // PostconditionMode.Allow
    anchorMode: 3,
  };

  Logger.debug(`Sending transaction ${contractName}`);
  const transaction = await makeContractCall(txOptions);
  Logger.debug(`Transaction: ${transaction}`);

  return handleTransaction(transaction);
}

export async function deployContract<T extends Contracts<M>, M>(
  contract: T[Extract<keyof T, string>]
) {
  const contractName = getContractNameFromPath(contract.contractFile);

  let codeBody = fs.readFileSync(`./contracts/${contractName}.clar`).toString();

  var transaction = await makeContractDeploy({
    contractName,
    codeBody,
    senderKey: secretDeployKey,
    network: NETWORK,
    anchorMode: 3,
  });

  Logger.debug(`deploy contract ${contractName}`);
  return handleTransaction(transaction);
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processing(tx: String, count: number = 0): Promise<boolean> {
  return processingWithSidecar(tx, count);
}

async function processingWithSidecar(
  tx: String,
  count: number = 0
): Promise<boolean> {
  var transactionUrl: string = getTransactionUrl(tx);

  var result = await fetch(transactionUrl);
  var value = await result.json();
  Logger.debug(`${count}`);
  if (value.tx_status === "success") {
    Logger.debug(`transaction ${tx} processed`);
    Logger.debug(JSON.stringify(value));
    return true;
  }
  if (value.tx_status === "pending") {
    Logger.debug(JSON.stringify(value));
  } else if (count === 3) {
    Logger.debug(JSON.stringify(value));
  }

  if (count > 20) {
    Logger.debug("failed after 10 tries");
    Logger.debug(JSON.stringify(value));
    return false;
  }

  await timeout(3000);
  return processing(tx, count + 1);
}

export function unchanged(codeBody: string) {
  return codeBody;
}
