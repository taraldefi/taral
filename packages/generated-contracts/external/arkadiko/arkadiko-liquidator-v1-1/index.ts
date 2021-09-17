import { BaseProvider, Contract, proxy } from "taral-shared";
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
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    contractFile:
      "C:\biz\taral/packages/clarity/contracts/external/arkadiko/arkadiko-liquidator-v1-1.clar",
  };
