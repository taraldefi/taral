import { ContractPrincipalCV, contractPrincipalCV } from "@stacks/transactions";
import { getContractNameFromPath } from ".";
import { Contract } from "../types";

export const getContractPrincipalCV = <T>(
  contract: Contract<T>
): ContractPrincipalCV => {
  const contractName = getContractNameFromPath(contract.contractFile);
  return contractPrincipalCV(contract.address, contractName);
};
