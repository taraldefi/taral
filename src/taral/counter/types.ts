import { IMetadata } from "../../../shared/providers/types";
import { Transaction } from "../../../shared/transaction";

// prettier-ignore

export interface CounterContract {
    decrement: (metadata: IMetadata) => Transaction<number, number>;
    increment: (metadata: IMetadata) => Transaction<number, number>;
    getCounter: (metadata: IMetadata) => Promise<number>;
    decimals: () => Promise<number>;
    counter: () => Promise<number>;
}
