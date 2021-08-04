import { Contract } from "../../../../shared/types";
import { proxy } from "../../../../shared/test-utils/proxy";
import { BaseProvider } from "../../../../shared/providers/base-provider";

import type { ArkadikoSwapTokenWstxDikoContract } from "./types";
import { ArkadikoSwapTokenWstxDikoInterface } from "./abi";

export type { ArkadikoSwapTokenWstxDikoContract } from "./types";

export const arkadikoSwapTokenWstxDikoContract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoSwapTokenWstxDikoContract>(
    ArkadikoSwapTokenWstxDikoInterface,
    provider
  );
  return contract;
};

export const arkadikoSwapTokenWstxDikoInfo: Contract<ArkadikoSwapTokenWstxDikoContract> =
  {
    contract: arkadikoSwapTokenWstxDikoContract,
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile:
      "contracts/external/arkadiko/arkadiko-swap-token-wstx-diko.clar",
  };
