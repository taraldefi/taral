import { BaseProvider } from "../../../shared/providers/base-provider";
import { proxy } from "../../../shared/test-utils/proxy";
import { Contract } from "../../../shared/types";
import { CounterInterface } from "./abi";
import type { CounterContract } from "./types";

export type { CounterContract } from "./types";

export const counterContract = (provider: BaseProvider) => {
  const contract = proxy<CounterContract>(CounterInterface, provider);
  return contract;
};

export const counterInfo: Contract<CounterContract> = {
  contract: counterContract,
  address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
  contractFile: "contracts/taral/counter.clar",
};
