import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
import { ArkadikoSip10ReserveV11Interface } from "./abi";
import type { ArkadikoSip10ReserveV11Contract } from "./types";

export type { ArkadikoSip10ReserveV11Contract } from "./types";

export const arkadikoSip10ReserveV11Contract = (provider: BaseProvider) => {
  const contract = proxy<ArkadikoSip10ReserveV11Contract>(
    ArkadikoSip10ReserveV11Interface,
    provider
  );
  return contract;
};

export const arkadikoSip10ReserveV11Info: Contract<ArkadikoSip10ReserveV11Contract> =
  {
    contract: arkadikoSip10ReserveV11Contract,
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile:
      "contracts/external/arkadiko/arkadiko-sip10-reserve-v1-1.clar",
  };
