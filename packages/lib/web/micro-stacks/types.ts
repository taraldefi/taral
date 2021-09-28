import { ContractCallTxOptions, FinishedTxData } from "micro-stacks/connect";
import { Transaction, TransactionReceiptBase } from "lib-shared";
import { StacksTransaction } from "micro-stacks/transactions";

export interface IContractCall {
    payload: FinishedTxData | undefined;
    success: boolean;
}

export interface MicroStacksWebTransaction<Ok, Err> extends Transaction<Ok, Err> {
    payload: ContractCallTxOptions;
}

export interface MicroStacksWebTransactionReceipt<Ok, Err>
    extends TransactionReceiptBase<Ok, Err> {
    txId: string | undefined;
    stacksTransaction: StacksTransaction;
}