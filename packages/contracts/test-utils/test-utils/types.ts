import { Transaction } from "lib-shared";
import { ClarityTypes } from "lib-shared";

export interface TestUtilsContract {
  mineBlock: () => Transaction<boolean, null>;
  getBlockHeight: () => Promise<bigint>;
  getStxBalance: (account: string) => Promise<bigint>;
}
