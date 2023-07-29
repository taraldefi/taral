import { Action } from './action.model';
import { Highestbidder } from './highest-bidder.model';

interface ReturnPreviousBid {
  action: Action;
  'auction-id': Action;
  bid: Action;
  'end-block': Action;
  'highest-bid': Action;
  'highest-bidder': Highestbidder;
  maker: Action;
  'nft-asset-contract': Action;
  'previous-bidder': Action;
  'reserve-price': Action;
  'start-bid': Action;
  'start-block': Action;
  'token-id': Action;
}
