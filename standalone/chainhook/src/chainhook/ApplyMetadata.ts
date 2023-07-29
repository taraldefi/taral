import { BlockIdentifier } from './BlockIdentifier';

export interface ApplyMetadata {
  bitcoin_anchor_block_identifier: BlockIdentifier;
  pox_cycle_index: number;
  pox_cycle_position: number;
  pox_cycle_length: number;
  confirm_microblock_identifier: null;
}
