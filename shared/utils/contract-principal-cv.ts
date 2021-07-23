import { Contract } from "../types";

import { getContractNameFromPath } from ".";
import { contractPrincipalCV } from "@stacks/transactions";

export const getContractPrincipalCV = <T>(contract: Contract<T>) => {
  const contractName = getContractNameFromPath(contract.contractFile);
  return contractPrincipalCV(contract.address, contractName);
};
