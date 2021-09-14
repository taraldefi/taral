import {
  BtcFtSwapContract,
  BtcNftSwapContract,
  ClarityBitcoinContract,
} from "../../generated/taral";
import { ClarinetAccounts } from "../configuration";

export interface BaseRequest {
  accounts: ClarinetAccounts;
}

export interface ClarityBitcoinRequest extends BaseRequest {
  contract: ClarityBitcoinContract;
}

export interface FtSwapRequest extends BaseRequest {
  contract: BtcFtSwapContract;
}

export interface NftSwapRequest extends BaseRequest {
  contract: BtcNftSwapContract;
}
