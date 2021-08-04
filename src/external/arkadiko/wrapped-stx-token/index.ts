import { BaseProvider } from "../../../../shared/providers/base-provider";
import { proxy } from "../../../../shared/test-utils/proxy";
import { Contract } from "../../../../shared/types";
import { WrappedStxTokenInterface } from "./abi";
import type { WrappedStxTokenContract } from "./types";


export type { WrappedStxTokenContract } from "./types";

export const wrappedStxTokenContract = (provider: BaseProvider) => {
    const contract = proxy<WrappedStxTokenContract>(
        WrappedStxTokenInterface,
        provider
    );
    return contract;
};

export const wrappedStxTokenInfo: Contract<WrappedStxTokenContract> = {
    contract: wrappedStxTokenContract,
    address: "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH",
    contractFile: "contracts/external/arkadiko/wrapped-stx-token.clar",
};
