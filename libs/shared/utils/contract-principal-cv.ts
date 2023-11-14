import { ContractPrincipalCV, contractPrincipalCV } from "@stacks/transactions";
import { getContractNameFromPath } from ".";
import { BaseContract } from "..";

export const getContractPrincipalCV = (
  contract: BaseContract,
): ContractPrincipalCV => {
  const contractName = getContractNameFromPath(contract.contractFile);
  return contractPrincipalCV(contract.address, contractName);
};
