import { Predicate } from "./Predicate";

export interface Chainhook {
    uuid: string;
    transaction_predicate: Predicate;
    block_predicate: Predicate;
}
