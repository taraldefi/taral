import { BaseProvider } from "../../../shared/providers/base-provider";
import { proxy } from "../../../shared/test-utils/proxy";
import { Contract } from "../../../shared/types";
import { CounterCoinInterface } from "./abi";
import type { CounterCoinContract } from "./types";

export type { CounterCoinContract } from "./types";

export const counterCoinContract = (provider: BaseProvider) => {
  const contract = proxy<CounterCoinContract>(CounterCoinInterface, provider);
  return contract;
};

export const counterCoinInfo: Contract<CounterCoinContract> = {
  contract: counterCoinContract,
  address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
  contractFile: "contracts/taral/counter-coin.clar",
};
