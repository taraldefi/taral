import { PostCondition, StacksTransaction } from "@stacks/transactions";

export interface ResultAssets {
  stx: Record<string, string>;
  burns: Record<string, string>;
  tokens: Record<string, Record<string, string>>;
  assets: Record<string, Record<string, string>>;
}

export interface TransactionResultOk<Ok> {
  value: Ok;
  response?: ResponseOk<Ok>;
  isOk: true;
  events: any[];
  costs?: {
    [key: string]: any;
    runtime: number;
  };
  assets?: ResultAssets;
  // TODO: add events
}

export interface TransactionResultErr<Err> {
  value: Err;
  response?: ResponseErr<Err>;
  costs?: {
    [key: string]: any;
    runtime: number;
  };
  isOk: false;
}

export type TransactionResult<Ok, Err> =
  | TransactionResultOk<Ok>
  | TransactionResultErr<Err>;

export interface TransactionReceiptBase<Ok, Err> {
  getResult: () => Promise<TransactionResult<Ok, Err>>;
}

export interface WebTransactionReceipt<Ok, Err>
  extends TransactionReceiptBase<Ok, Err> {
  txId: string;
  stacksTransaction: StacksTransaction;
}

export interface TestTransacionReceipt<Ok, Err>
  extends TransactionReceiptBase<Ok, Err> {
  result: TransactionResult<Ok, Err>;
}

export type TransactionReceipt<Ok, Err> =
  | WebTransactionReceipt<Ok, Err>
  | TestTransacionReceipt<Ok, Err>
  | TransactionReceiptBase<Ok, Err>;

export interface WebSignerOptions {
  postConditions?: PostCondition[];
}

export interface TestSignerOptions {
  sender: string;
}

export type SubmitOptions = TestSignerOptions | WebSignerOptions;

export type Submitter<Ok, Err> = (
  options: SubmitOptions
) => Promise<TransactionReceipt<Ok, Err>>;

interface ResponseOk<Ok> {
  value: Ok;
}

interface ResponseErr<Err> {
  value: Err;
}

export type Response<Ok, Err> = ResponseOk<Ok> | ResponseErr<Err>;

export interface Transaction<Ok, Err> {
  submit: Submitter<Ok, Err>;
}

export async function tx<A, B>(tx: Transaction<A, B>, sender: string) {
  const receipt = await tx.submit({ sender });
  const result = await receipt.getResult();
  return result;
}

export async function txOk<A, B>(_tx: Transaction<A, B>, sender: string) {
  const result = await tx(_tx, sender);
  if (!result.isOk)
    throw new Error(`Expected transaction ok, got error: ${result.value}`);
  return result;
}

export async function txErr<A, B>(_tx: Transaction<A, B>, sender: string) {
  const result = await tx(_tx, sender);
  if (result.isOk)
    throw new Error(`Expected transaction error, got ok: ${result.value}`);
  return result;
}
