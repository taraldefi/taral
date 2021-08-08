import { BaseProvider } from "../../../shared/providers/base-provider";
import { proxy } from "../../../shared/test-utils/proxy";
import { Contract } from "../../../shared/types";
import { SimpleCounterInterface } from "./abi";
import type { SimpleCounterContract } from "./types";

export type { SimpleCounterContract } from "./types";

export const simpleCounterContract = (provider: BaseProvider) => {
  const contract = proxy<SimpleCounterContract>(
    SimpleCounterInterface,
    provider
  );
  return contract;
};

export const simpleCounterInfo: Contract<SimpleCounterContract> = {
  contract: simpleCounterContract,
  address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
  contractFile: "contracts/taral/simple-counter.clar",
};
