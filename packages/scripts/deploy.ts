import { taralContracts } from "taral-generated-contracts";
import { makeContractDeploy } from "@stacks/transactions";
import { Logger } from "taral-shared";
import * as fs from "fs";

import { Contracts } from "taral-shared";
import { getContractNameFromPath } from "taral-shared";
import { NETWORK } from "taral-configuration";

import { getClarinetAccounts } from "taral-shared";
import { handleTransaction } from "taral-shared";

Logger.debug("Deploying contracts");
deployMany(taralContracts);

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

  Logger.debug(`Deploying contract ${contractName}`);
  return handleTransaction(transaction, NETWORK);
}
