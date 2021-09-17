import { makeContractDeploy } from "@stacks/transactions";
import * as fs from "fs";
import { StacksNetworkConfiguration } from "taral-configuration";
import { Logger } from "..";
import { handleTransaction } from "./handle-transaction";

export async function deployContractOnStacks(
  contractName: string,
  contractPath: string,
  network: StacksNetworkConfiguration,
  secretDeployKey: string
) {
  Logger.debug(`preparing to deploy contract ${contractName}`);

  let codeBody = fs.readFileSync(contractPath).toString();

  var transaction = await makeContractDeploy({
    contractName,
    codeBody,
    senderKey: secretDeployKey,
    network,
    anchorMode: 3,
  });

  Logger.debug(`deploy contract ${contractName}`);

  return handleTransaction(transaction, network);
}
