import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
import { UsdaTokenInterface } from "./abi";
import type { UsdaTokenContract } from "./types";

export type { UsdaTokenContract } from "./types";

export const usdaTokenContract = (provider: BaseProvider) => {
  const contract = proxy<UsdaTokenContract>(UsdaTokenInterface, provider);
  return contract;
};

export const usdaTokenInfo: Contract<UsdaTokenContract> = {
  contract: usdaTokenContract,
  address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
  contractFile: "contracts/external/arkadiko/usda-token.clar",
};
