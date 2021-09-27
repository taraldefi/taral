import { makeContractDeploy } from "@stacks/transactions";
import * as fs from "fs";
import { normalize, resolve } from "path";
import { NETWORK } from "taral-configuration";
import { taralContracts } from "taral-generated-contracts";
import {
  Contracts,
  getClarinetAccounts,
  getContractNameFromPath,
  getRootDirectory,
  Logger,
} from "lib-shared";

import {
  handleTransaction
} from "lib-stacks";

const NAME = "Deploy tool";

Logger.debug(NAME, "Deploying contracts");
deployMany(taralContracts);

async function deployMany<T extends Contracts<M>, M>(contracts: T) {
  const root = `${getRootDirectory()}/packages/clarity`;
  const clarinetAccounts = await getClarinetAccounts(root);

  const deployer = clarinetAccounts.deployer;

  for (const k in contracts) {
    const contract: T[Extract<keyof T, string>] = contracts[k];

    const contractName = getContractNameFromPath(contract.contractFile);
    Logger.debug(NAME, "Deploying contract", contractName);

    var result = await deployContract(contract, deployer.privateKey);
    Logger.debug(
      NAME,
      `Contract deployed: ${contractName} with result ${result}`
    );
  }
}

async function deployContract<T extends Contracts<M>, M>(
  contract: T[Extract<keyof T, string>],
  senderKey: string
) {
  const contractName = getContractNameFromPath(contract.contractFile);
  var normalizedPath = normalize(getRootDirectory()).replace(/\\/g, "/");
  const fullContractFilePath = resolve(
    normalizedPath,
    contract.contractFile
  ).replace(/\\/g, "/");

  Logger.debug(NAME, `Reading contract from ${fullContractFilePath}`);

  let codeBody = fs.readFileSync(fullContractFilePath).toString();

  var transaction = await makeContractDeploy({
    contractName,
    codeBody,
    senderKey: senderKey,
    network: NETWORK,
    anchorMode: 3,
  });

  Logger.debug(NAME, `Deploying contract ${contractName}`);
  return handleTransaction(transaction, NETWORK);
}
