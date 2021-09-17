import { BaseProvider, Contract, proxy } from "taral-shared";
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
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "C:\biz\taral/packages/clarity/contracts/external/arkadiko/arkadiko-dao-token-trait-v1.clar",
  };
