import { Logger } from "../shared/logger";
import { Contracts } from "../shared/types";
import { getContractNameFromPath } from "../shared/utils/contract-name-for-path";
import { contracts } from "../src";
import { deployContract } from "./deploy-utils";

console.log("Deploying contracts");
deployMany(contracts);

async function deployMany<T extends Contracts<M>, M>(contracts: T) {
  for (const k in contracts) {
    const contract: T[Extract<keyof T, string>] = contracts[k];

    const contractName = getContractNameFromPath(contract.contractFile);
    Logger.debug(`Deploying contract ${contractName}`);

    var result = await deployContract(contract);
    Logger.debug(`Contract deployed: ${contractName} with result ${result}`);
  }
}
