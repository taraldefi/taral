import { Apply } from './Apply';
import { Chainhook } from './Chainhook';

export interface ChainhookResponse {
  apply: Apply[];
  rollback: any[];
  chainhook: Chainhook;
}
