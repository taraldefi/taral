import { Receipt } from './Receipt';
import { Position } from './Position';
import { Kind } from './Kind';

export interface TransactionMetadata {
  success: boolean;
  raw_tx: string;
  result: string;
  sender: string;
  nonce: number;
  fee: number;
  kind: Kind;
  receipt: Receipt;
  description: string;
  position: Position;
  proof: null;
}
