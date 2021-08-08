import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
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
    address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
    contractFile:
      "contracts/external/arkadiko/arkadiko-diko-guardian-v1-1.clar",
  };
