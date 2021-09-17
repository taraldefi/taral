import { BaseProvider, Contract, proxy } from "taral-shared";
import { ArkadikoDaoInterface } from "./abi";
import type { ArkadikoDaoContract } from "./types";
export type { ArkadikoDaoContract } from "./types";

export const arkadikoDaoContract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoDaoContract>(ArkadikoDaoInterface, provider);
  return contract;
};

export const arkadikoDaoInfo: Contract<ArkadikoDaoContract> = {
  contract: arkadikoDaoContract,
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractFile:
    "packages/clarity/contracts/external/arkadiko/arkadiko-dao.clar",
};
