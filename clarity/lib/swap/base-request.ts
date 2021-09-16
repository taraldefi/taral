import {
  BtcFtSwapContract,
  BtcNftSwapContract,
  ClarityBitcoinContract,
} from "../../generated/taral";

export interface BaseRequest {
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
