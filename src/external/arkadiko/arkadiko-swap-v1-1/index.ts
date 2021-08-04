import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
import { ArkadikoSwapV11Interface } from "./abi";
import type { ArkadikoSwapV11Contract } from "./types";


export type { ArkadikoSwapV11Contract } from "./types";

export const arkadikoSwapV11Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoSwapV11Contract>(
        ArkadikoSwapV11Interface,
        provider
    );
    return contract;
};

export const arkadikoSwapV11Info: Contract<ArkadikoSwapV11Contract> = {
    contract: arkadikoSwapV11Contract,
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile: "contracts/external/arkadiko/arkadiko-swap-v1-1.clar",
};
