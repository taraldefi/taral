import { IMetadata } from "../../../shared/providers/types";
import { Transaction } from "../../../shared/transaction";

// prettier-ignore

export interface SimpleCounterContract {
    decrement: (metadata: IMetadata) => Transaction<number, null>;
    increment: (metadata: IMetadata) => Transaction<number, null>;
    getCounter: (metadata: IMetadata) => Promise<number>;
    counter: () => Promise<number>;
}
