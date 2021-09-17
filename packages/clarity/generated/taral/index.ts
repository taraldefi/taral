import { btcFtSwapInfo } from "./btc-ft-swap";
import { btcNftSwapInfo } from "./btc-nft-swap";
import { clarityBitcoinInfo } from "./clarity-bitcoin";
import { nftTraitInfo } from "./nft-trait";
import { sip10FtStandardInfo } from "./sip-10-ft-standard";
import { taralCoinInfo } from "./taral-coin";
export type { BtcFtSwapContract } from "./btc-ft-swap";
export type { BtcNftSwapContract } from "./btc-nft-swap";
export type { ClarityBitcoinContract } from "./clarity-bitcoin";
export type { NftTraitContract } from "./nft-trait";
export type { Sip10FtStandardContract } from "./sip-10-ft-standard";
export type { TaralCoinContract } from "./taral-coin";

export const contracts = {
  sip10FtStandard: sip10FtStandardInfo,
  nftTrait: nftTraitInfo,
  taralCoin: taralCoinInfo,
  clarityBitcoin: clarityBitcoinInfo,
  btcFtSwap: btcFtSwapInfo,
  btcNftSwap: btcNftSwapInfo,
};
