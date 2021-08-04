import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
import { ArkadikoStakePoolTraitV1Interface } from "./abi";
import type { ArkadikoStakePoolTraitV1Contract } from "./types";


export type { ArkadikoStakePoolTraitV1Contract } from "./types";

export const arkadikoStakePoolTraitV1Contract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoStakePoolTraitV1Contract>(
        ArkadikoStakePoolTraitV1Interface,
        provider
    );
    return contract;
};

export const arkadikoStakePoolTraitV1Info: Contract<ArkadikoStakePoolTraitV1Contract> =
{
    contract: arkadikoStakePoolTraitV1Contract,
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile:
        "contracts/external/arkadiko/arkadiko-stake-pool-trait-v1.clar",
};
