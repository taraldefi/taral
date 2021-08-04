import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
import { ArkadikoStakePoolWstxDikoV11Interface } from "./abi";
import type { ArkadikoStakePoolWstxDikoV11Contract } from "./types";


export type { ArkadikoStakePoolWstxDikoV11Contract } from "./types";

export const arkadikoStakePoolWstxDikoV11Contract = (
    provider: BaseProvider
) => {
    const contract = proxy<ArkadikoStakePoolWstxDikoV11Contract>(
        ArkadikoStakePoolWstxDikoV11Interface,
        provider
    );
    return contract;
};

export const arkadikoStakePoolWstxDikoV11Info: Contract<ArkadikoStakePoolWstxDikoV11Contract> =
{
    contract: arkadikoStakePoolWstxDikoV11Contract,
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile:
        "contracts/external/arkadiko/arkadiko-stake-pool-wstx-diko-v1-1.clar",
};
