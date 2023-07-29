import { Event } from './Event';

export interface Receipt {
  mutated_contracts_radius: any[];
  mutated_assets_radius: any[];
  contract_calls_stack: any[];
  events: Event[];
}
