import { Transaction } from "../../../../../transaction";

// prettier-ignore

export interface TestUtilsContract {
    mineBlock: () => Transaction<boolean, null>;
    getBlockHeight: () => Promise<number>;
}
