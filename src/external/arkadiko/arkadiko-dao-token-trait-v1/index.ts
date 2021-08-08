import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
import { ArkadikoDaoTokenTraitV1Interface } from "./abi";
import type { ArkadikoDaoTokenTraitV1Contract } from "./types";

export type { ArkadikoDaoTokenTraitV1Contract } from "./types";

export const arkadikoDaoTokenTraitV1Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoDaoTokenTraitV1Contract>(
    ArkadikoDaoTokenTraitV1Interface,
    provider
  );
  return contract;
};

export const arkadikoDaoTokenTraitV1Info: Contract<ArkadikoDaoTokenTraitV1Contract> =
  {
    contract: arkadikoDaoTokenTraitV1Contract,
    address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
    contractFile:
      "contracts/external/arkadiko/arkadiko-dao-token-trait-v1.clar",
  };
