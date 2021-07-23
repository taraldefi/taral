import { Contract } from "../types";
import { getContractNameFromPath } from ".";

export const getContractIdentifier = <T>(contract: Contract<T>) => {
  const contractName = getContractNameFromPath(contract.contractFile);
  return `${contract.address}.${contractName}`;
};
