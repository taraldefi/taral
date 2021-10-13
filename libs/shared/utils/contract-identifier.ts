import { getContractNameFromPath } from ".";
import { BaseContract } from "../contracts";

export const getContractIdentifier = (contract: BaseContract) => {
  const contractName = getContractNameFromPath(contract.contractFile);
  return `${contract.address}.${contractName}`;
};
