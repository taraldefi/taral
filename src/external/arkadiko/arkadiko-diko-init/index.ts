import { Contract } from "../../../../shared/types";
import { proxy } from "../../../../shared/test-utils/proxy";
import { BaseProvider } from "../../../../shared/providers/base-provider";

import type { ArkadikoDikoInitContract } from "./types";
import { ArkadikoDikoInitInterface } from "./abi";

export type { ArkadikoDikoInitContract } from "./types";

export const arkadikoDikoInitContract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoDikoInitContract>(
    ArkadikoDikoInitInterface,
    provider
  );
  return contract;
};

export const arkadikoDikoInitInfo: Contract<ArkadikoDikoInitContract> = {
  contract: arkadikoDikoInitContract,
  address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
  contractFile: "contracts/external/arkadiko/arkadiko-diko-init.clar",
};
