import { ClarityTypes } from "../../../lib/clarity/types";
import { IMetadata } from "../../../lib/providers/types";

// prettier-ignore

export interface LockupContract {
    getLockups: (stxBlockHeightOpt: number | null, metadata: IMetadata) => Promise<ClarityTypes.Response<{
        "amount": number;
        "recipient": string
    }[], null>>;
    lockups: (key: number) => Promise<{
        "amount": number;
        "recipient": string
    }[] | null>;
}
