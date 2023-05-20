import { ClarityTypes } from "lib-shared";

export interface LockupContract {
    getLockups: (stxBlockHeightOpt: bigint | null) => Promise<
        ClarityTypes.Response<
            {
                amount: bigint;
                recipient: string;
            }[],
            null
        >
    >;
    lockups: (key: bigint) => Promise<
        | {
            amount: bigint;
            recipient: string;
        }[]
        | null
    >;
}
