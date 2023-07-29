import { Transaction } from './Transaction';
import { ApplyMetadata } from './ApplyMetadata';
import { BlockIdentifier } from './BlockIdentifier';

export interface Apply {
  block_identifier: BlockIdentifier;
  parent_block_identifier: BlockIdentifier;
  timestamp: number;
  transactions: Transaction[];
  metadata: ApplyMetadata;
}
