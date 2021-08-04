import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
import { ArkadikoSwapTokenWstxUsdaInterface } from "./abi";
import type { ArkadikoSwapTokenWstxUsdaContract } from "./types";


export type { ArkadikoSwapTokenWstxUsdaContract } from "./types";

export const arkadikoSwapTokenWstxUsdaContract = (provider: BaseProvider) => {
    const contract = proxy<ArkadikoSwapTokenWstxUsdaContract>(
        ArkadikoSwapTokenWstxUsdaInterface,
        provider
    );
    return contract;
};

export const arkadikoSwapTokenWstxUsdaInfo: Contract<ArkadikoSwapTokenWstxUsdaContract> =
{
    contract: arkadikoSwapTokenWstxUsdaContract,
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile:
        "contracts/external/arkadiko/arkadiko-swap-token-wstx-usda.clar",
};
