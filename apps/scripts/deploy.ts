import {
  AnchorMode,
  makeContractDeploy,
  PostConditionMode,
} from "@stacks/transactions";
import * as fs from "fs";
import { getClarinetAccounts } from "lib-infra";
import {
  getContractNameFromPath,
  getRootDirectory,
  Logger,
  NodeContracts,
} from "lib-shared";
import { getNonce, handleTransaction } from "lib-stacks";
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

  let index = 0;
  for (const k in contracts) {
    index++;

    const contract: T[Extract<keyof T, string>] = contracts[k];

    const contractName = getContractNameFromPath(contract.contractFile);
    Logger.debug(NAME, "Deploying contract", contractName);

    const result = await deployContract(
      contract,
      deployer.privateKey,
      deployer.address,
      index
    );
    Logger.debug(
      NAME,
      `Contract deployed: ${contractName} with result ${result}`
    );
  }
}

async function deployContract<T extends NodeContracts<M>, M>(
  contract: T[Extract<keyof T, string>],
  senderKey: string,
  senderAddress: string,
  index: number
) {
  const contractName = getContractNameFromPath(contract.contractFile);
  const normalizedPath = normalize(getRootDirectory()).replace(/\\/g, "/");
  const fullContractFilePath = resolve(
    normalizedPath,
    contract.contractFile
  ).replace(/\\/g, "/");

  Logger.debug(NAME, `Reading contract from ${fullContractFilePath}`);

  const codeBody = fs.readFileSync(fullContractFilePath).toString();

  const nonce = await getNonce({
    principal: senderAddress,
  });

  const nextNonce = nonce.possible_next_nonce;

  console.log("Next possible nonce ", nextNonce);

  const transaction = await makeContractDeploy({
    contractName,
    codeBody,
    senderKey: senderKey,
    network: NETWORK,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    fee: 10000000,
    // nonce: callNonce
  });

  Logger.debug(NAME, `Deploying contract ${contractName}`);
  return handleTransaction(transaction, NETWORK);
}
