import { Contract } from "../../shared/types";
import { proxy } from "../../shared/test-utils/proxy";
import { BaseProvider } from "../../shared/providers/base-provider";

import type { CounterContract } from "./types";
import { CounterInterface } from "./abi";

export type { CounterContract } from "./types";

export const counterContract = (provider: BaseProvider) => {
  const contract = proxy<CounterContract>(CounterInterface, provider);
  return contract;
};

export const counterInfo: Contract<CounterContract> = {
  contract: counterContract,
  address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
  contractFile: "contracts/counter.clar",
};
