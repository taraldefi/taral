import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
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
      "clarity/contracts/external/arkadiko/arkadiko-swap-token-diko-usda.clar",
  };
