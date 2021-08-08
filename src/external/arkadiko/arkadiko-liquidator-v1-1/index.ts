import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
import { ArkadikoLiquidatorV11Interface } from "./abi";
import type { ArkadikoLiquidatorV11Contract } from "./types";

export type { ArkadikoLiquidatorV11Contract } from "./types";

export const arkadikoLiquidatorV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoLiquidatorV11Contract>(
    ArkadikoLiquidatorV11Interface,
    provider
  );
  return contract;
};

export const arkadikoLiquidatorV11Info: Contract<ArkadikoLiquidatorV11Contract> =
  {
    contract: arkadikoLiquidatorV11Contract,
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile: "contracts/external/arkadiko/arkadiko-liquidator-v1-1.clar",
  };
