import { makeContractDeploy } from "@stacks/transactions";
import * as fs from "fs";
import { getClarinetAccounts } from "lib-infra";
import {
  getContractNameFromPath,
  getRootDirectory,
  Logger,
  NodeContracts,
} from "lib-shared";
import { handleTransaction } from "lib-stacks";
import { normalize, resolve } from "path";
import { NETWORK } from "taral-configuration";
import { nodeTaralContracts } from "taral-contracts";

const NAME = "Deploy tool";

Logger.debug(NAME, "Deploying contracts");
deployMany(nodeTaralContracts);

async function deployMany<T extends NodeContracts<M>, M>(contracts: T) {
  const root = `${getRootDirectory()}/packages/clarity`;
  const clarinetAccounts = await getClarinetAccounts(root);

  const deployer = clarinetAccounts.deployer;

  for (const k in contracts) {
    const contract: T[Extract<keyof T, string>] = contracts[k];

    const contractName = getContractNameFromPath(contract.contractFile);
    Logger.debug(NAME, "Deploying contract", contractName);

    const result = await deployContract(contract, deployer.privateKey);
    Logger.debug(
      NAME,
      `Contract deployed: ${contractName} with result ${result}`
    );
  }
}

async function deployContract<T extends NodeContracts<M>, M>(
  contract: T[Extract<keyof T, string>],
  senderKey: string
) {
  const contractName = getContractNameFromPath(contract.contractFile);
  const normalizedPath = normalize(getRootDirectory()).replace(/\\/g, "/");
  const fullContractFilePath = resolve(
    normalizedPath,
    contract.contractFile
  ).replace(/\\/g, "/");

  Logger.debug(NAME, `Reading contract from ${fullContractFilePath}`);

  const codeBody = fs.readFileSync(fullContractFilePath).toString();

  const transaction = await makeContractDeploy({
    contractName,
    codeBody,
    senderKey: senderKey,
    network: NETWORK,
    anchorMode: 3,
  });

  Logger.debug(NAME, `Deploying contract ${contractName}`);
  return handleTransaction(transaction, NETWORK);
}
