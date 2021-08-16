import { IMetadata } from "../../../lib/providers/types";
import { Transaction } from "../../../lib/transaction";

// prettier-ignore

export interface TestUtilsContract {
    mineBlock: (metadata: IMetadata) => Transaction<boolean, null>;
    getBlockHeight: (metadata: IMetadata) => Promise<number>;
}
