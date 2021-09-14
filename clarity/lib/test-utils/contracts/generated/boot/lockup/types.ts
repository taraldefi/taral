import { ClarityTypes } from "../../../../../clarity/types";
// prettier-ignore

export interface LockupContract {
    getLockups: (stxBlockHeightOpt: number | null ) => Promise<ClarityTypes.Response<{
        "amount": number;
        "recipient": string
    }[], null>>;
    lockups: (key: number) => Promise<{
        "amount": number;
        "recipient": string
    }[] | null>;
}
