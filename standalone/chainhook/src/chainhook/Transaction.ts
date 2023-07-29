import { TransactionIdentifier } from './TransactionIdentifier';
import { TransactionMetadata } from './TransactionMetadata';

export interface Transaction {
  transaction_identifier: TransactionIdentifier;
  operations: any[];
  metadata: TransactionMetadata;
}
