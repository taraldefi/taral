import { IMetadata } from "../../../../../providers/types";
import { Transaction } from "../../../../../transaction";

// prettier-ignore

export interface TestUtilsContract {
    mineBlock: (metadata: IMetadata) => Transaction<boolean, null>;
    getBlockHeight: (metadata: IMetadata) => Promise<number>;
}
