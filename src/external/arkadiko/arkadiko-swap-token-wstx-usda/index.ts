import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
import { ArkadikoSwapTokenWstxUsdaInterface } from "./abi";
import type { ArkadikoSwapTokenWstxUsdaContract } from "./types";

export type { ArkadikoSwapTokenWstxUsdaContract } from "./types";

export const arkadikoSwapTokenWstxUsdaContract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoSwapTokenWstxUsdaContract>(
    ArkadikoSwapTokenWstxUsdaInterface,
    provider
  );
  return contract;
};

export const arkadikoSwapTokenWstxUsdaInfo: Contract<ArkadikoSwapTokenWstxUsdaContract> =
  {
    contract: arkadikoSwapTokenWstxUsdaContract,
    address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
    contractFile:
      "contracts/external/arkadiko/arkadiko-swap-token-wstx-usda.clar",
  };
