import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
import { ArkadikoVaultRewardsV11Interface } from "./abi";
import type { ArkadikoVaultRewardsV11Contract } from "./types";

export type { ArkadikoVaultRewardsV11Contract } from "./types";

export const arkadikoVaultRewardsV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoVaultRewardsV11Contract>(
    ArkadikoVaultRewardsV11Interface,
    provider
  );
  return contract;
};

export const arkadikoVaultRewardsV11Info: Contract<ArkadikoVaultRewardsV11Contract> =
  {
    contract: arkadikoVaultRewardsV11Contract,
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile:
      "contracts/external/arkadiko/arkadiko-vault-rewards-v1-1.clar",
  };
