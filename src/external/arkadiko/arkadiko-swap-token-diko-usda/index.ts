import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
import { ArkadikoSwapTokenDikoUsdaInterface } from "./abi";
import type { ArkadikoSwapTokenDikoUsdaContract } from "./types";


export type { ArkadikoSwapTokenDikoUsdaContract } from "./types";

export const arkadikoSwapTokenDikoUsdaContract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoSwapTokenDikoUsdaContract>(
        ArkadikoSwapTokenDikoUsdaInterface,
        provider
    );
    return contract;
};

export const arkadikoSwapTokenDikoUsdaInfo: Contract<ArkadikoSwapTokenDikoUsdaContract> =
{
    contract: arkadikoSwapTokenDikoUsdaContract,
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile:
        "contracts/external/arkadiko/arkadiko-swap-token-diko-usda.clar",
};
