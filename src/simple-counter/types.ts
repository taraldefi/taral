import { Transaction } from "../../shared/transaction";
import { ClarityTypes } from "../../shared/clarity/types";
import { IMetadata } from "../../shared/providers/types";

// prettier-ignore

export interface SimpleCounterContract {
  decrement: (metadata: IMetadata) => Transaction<number, null>;
  increment: (metadata: IMetadata) => Transaction<number, null>;
  getCounter: (metadata: IMetadata) => Promise<number>;
  counter: () => Promise<number>;
}
