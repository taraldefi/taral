import { StacksNetwork } from "@stacks/network";
import { makeContractDeploy } from "@stacks/transactions";
import * as fs from "fs";
import { Logger } from "lib-shared";
import { handleTransaction } from "lib-stacks";

const NAME = "contract-deployer";

export async function deployContractOnStacks(
  contractName: string,
  contractPath: string,
  network: StacksNetwork,
  secretDeployKey: string
) {
  Logger.debug(NAME, `preparing to deploy contract ${contractName} ......`);

  let codeBody = fs.readFileSync(contractPath).toString();

  var transaction = await makeContractDeploy({
    contractName,
    codeBody,
    senderKey: secretDeployKey,
    network,
    anchorMode: 3,
  });

  Logger.debug(NAME, `contract deploy successful - ${contractName}`);

  return handleTransaction(transaction, network);
}
