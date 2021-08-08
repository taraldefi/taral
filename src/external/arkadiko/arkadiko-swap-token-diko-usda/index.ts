import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
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
    address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
    contractFile:
      "contracts/external/arkadiko/arkadiko-swap-token-diko-usda.clar",
  };
