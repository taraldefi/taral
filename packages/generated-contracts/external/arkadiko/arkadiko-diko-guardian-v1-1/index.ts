import { BaseProvider, Contract, proxy } from "lib-shared";
import { ArkadikoDikoGuardianV11Interface } from "./abi";
import type { ArkadikoDikoGuardianV11Contract } from "./types";
export type { ArkadikoDikoGuardianV11Contract } from "./types";

export const arkadikoDikoGuardianV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoDikoGuardianV11Contract>(
    ArkadikoDikoGuardianV11Interface,
    provider
  );
  return contract;
};

export const arkadikoDikoGuardianV11Info: Contract<ArkadikoDikoGuardianV11Contract> =
  {
    contract: arkadikoDikoGuardianV11Contract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-diko-guardian-v1-1.clar",
  };
