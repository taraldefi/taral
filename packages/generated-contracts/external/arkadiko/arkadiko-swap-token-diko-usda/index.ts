import { BaseProvider, Contract, proxy } from "lib-shared";
import { ArkadikoSwapTokenDikoUsdaInterface } from "./abi";
import type { ArkadikoSwapTokenDikoUsdaContract } from "./types";
export type { ArkadikoSwapTokenDikoUsdaContract } from "./types";

export const arkadikoSwapTokenDikoUsdaContract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoSwapTokenDikoUsdaContract>(
    ArkadikoSwapTokenDikoUsdaInterface,
    provider
  );
  return contract;
};

export const arkadikoSwapTokenDikoUsdaInfo: Contract<ArkadikoSwapTokenDikoUsdaContract> =
  {
    contract: arkadikoSwapTokenDikoUsdaContract,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "packages/clarity/contracts/external/arkadiko/arkadiko-swap-token-diko-usda.clar",
  };
