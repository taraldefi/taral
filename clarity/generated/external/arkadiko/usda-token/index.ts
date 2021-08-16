import { BaseProvider } from "../../../../lib/providers/base-provider";
import { proxy } from "../../../../lib/test-utils/proxy";
import { Contract } from "../../../../lib/types";
import { UsdaTokenInterface } from "./abi";
import type { UsdaTokenContract } from "./types";

export type { UsdaTokenContract } from "./types";

export const usdaTokenContract = (provider: BaseProvider) => {
  const contract = proxy<UsdaTokenContract>(UsdaTokenInterface, provider);
  return contract;
};

export const usdaTokenInfo: Contract<UsdaTokenContract> = {
  contract: usdaTokenContract,
  address: "ST228ADYKA0VKDSZXCA4E13MB38SG3EZJTZY9EPJR",
  contractFile: "clarity/contracts/external/arkadiko/usda-token.clar",
};
