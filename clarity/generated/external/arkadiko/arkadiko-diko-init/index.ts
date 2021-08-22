import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { ArkadikoDikoInitInterface } from "./abi";
import type { ArkadikoDikoInitContract } from "./types";

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
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile: "clarity/contracts/external/arkadiko/arkadiko-diko-init.clar",
};
