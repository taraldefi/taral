import { Transaction, TransactionReceiptBase } from "lib-shared";
import { FinishedTxData } from "micro-stacks/connect";
import { StacksTransaction } from "micro-stacks/transactions";

export interface IMCContractCall {
  payload: FinishedTxData | undefined;
  success: boolean;
}

export type MicroStacksWebTransaction<Ok, Err> = Transaction<Ok, Err>;

export interface MicroStacksWebTransactionReceipt<Ok, Err>
  extends TransactionReceiptBase<Ok, Err> {
  txId: string | undefined;
  stacksTransaction: StacksTransaction | undefined;
}
