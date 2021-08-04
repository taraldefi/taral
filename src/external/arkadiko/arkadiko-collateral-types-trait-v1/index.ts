import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
import { ArkadikoCollateralTypesTraitV1Interface } from "./abi";
import type { ArkadikoCollateralTypesTraitV1Contract } from "./types";


export type { ArkadikoCollateralTypesTraitV1Contract } from "./types";

export const arkadikoCollateralTypesTraitV1Contract = (
    provider: BaseProvider
) => {
    const contract = proxy<ArkadikoCollateralTypesTraitV1Contract>(
        ArkadikoCollateralTypesTraitV1Interface,
        provider
    );
    return contract;
};

export const arkadikoCollateralTypesTraitV1Info: Contract<ArkadikoCollateralTypesTraitV1Contract> =
{
    contract: arkadikoCollateralTypesTraitV1Contract,
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile:
        "contracts/external/arkadiko/arkadiko-collateral-types-trait-v1.clar",
};
