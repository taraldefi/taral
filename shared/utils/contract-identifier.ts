import { getContractNameFromPath } from ".";
import { Contract } from "../types";

export const getContractIdentifier = <T>(contract: Contract<T>) => {
  const contractName = getContractNameFromPath(contract.contractFile);
  return `${contract.address}.${contractName}`;
};
