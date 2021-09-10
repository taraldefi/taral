import { contracts } from "../clarity/generated/taral";
import {
  makeContractDeploy,
} from "@stacks/transactions";
import { Logger } from "../clarity/lib/logger";
import * as fs from "fs";

import { Contracts } from "../clarity/lib/types";
import { getContractNameFromPath } from "../clarity/lib/utils/contract-name-for-path";
import {  NETWORK } from "../clarity/configuration";

import { getClarinetAccounts } from "../clarity/lib";
import { handleTransaction } from "../clarity/lib/stacks/handle-transaction";

console.log("Deploying contracts");
deployMany(contracts);

async function deployMany<T extends Contracts<M>, M>(contracts: T) {
  const cwd = `${process.cwd()}/clarity/`;
  const clarinetAccounts = await getClarinetAccounts(cwd);

  const deployer = clarinetAccounts.deployer;

  for (const k in contracts) {
    const contract: T[Extract<keyof T, string>] = contracts[k];

    const contractName = getContractNameFromPath(contract.contractFile);
    Logger.debug(`Deploying contract ${contractName}`);

    var result = await deployContract(contract, deployer.privateKey);
    Logger.debug(`Contract deployed: ${contractName} with result ${result}`);
  }
}

async function deployContract<T extends Contracts<M>, M>(
  contract: T[Extract<keyof T, string>],
  senderKey: string
) {
  const contractName = getContractNameFromPath(contract.contractFile);
  let codeBody = fs.readFileSync(`./${contract.contractFile}`).toString();

  var transaction = await makeContractDeploy({
    contractName,
    codeBody,
    senderKey: senderKey,
    network: NETWORK,
    anchorMode: 3,
  });

  Logger.debug(`deploy contract ${contractName}`);
  return handleTransaction(transaction, NETWORK);
}
