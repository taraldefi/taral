import { Action } from './action.model';
import { Highestbidder } from './highest-bidder.model';

export interface PlaceBid {
  action: Action;
  'auction-id': Action;
  bid: Action;
  bidder: Action;
  'end-block': Action;
  'highest-bid': Action;
  'highest-bidder': Highestbidder;
  maker: Action;
  'nft-asset-contract': Action;
  'reserve-price': Action;
  'start-bid': Action;
  'start-block': Action;
  'token-id': Action;
  type: Action;
}
