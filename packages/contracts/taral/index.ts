import { nodeBtcFtSwapInfo, webBtcFtSwapInfo } from "./btc-ft-swap";
import { nodeBtcNftSwapInfo, webBtcNftSwapInfo } from "./btc-nft-swap";
import {
  nodeClarityBitcoinInfo,
  webClarityBitcoinInfo,
} from "./clarity-bitcoin";
import { nodeNftTraitInfo, webNftTraitInfo } from "./nft-trait";
import {
  nodeSip10FtStandardInfo,
  webSip10FtStandardInfo,
} from "./sip-10-ft-standard";
import { nodeTaralCoinInfo, webTaralCoinInfo } from "./taral-coin";
import {
  nodeTaralOracleTraitV1Info,
  webTaralOracleTraitV1Info,
} from "./taral-oracle-trait-v1";
import { nodeTaralOracleV1Info, webTaralOracleV1Info } from "./taral-oracle-v1";
export type { BtcFtSwapContract } from "./btc-ft-swap";
export type { BtcNftSwapContract } from "./btc-nft-swap";
export type { ClarityBitcoinContract } from "./clarity-bitcoin";
export type { NftTraitContract } from "./nft-trait";
export type { Sip10FtStandardContract } from "./sip-10-ft-standard";
export type { TaralCoinContract } from "./taral-coin";
export type { TaralOracleTraitV1Contract } from "./taral-oracle-trait-v1";
export type { TaralOracleV1Contract } from "./taral-oracle-v1";

export const nodeTaralContracts = {
  nodeSip10FtStandard: nodeSip10FtStandardInfo,
  nodeNftTrait: nodeNftTraitInfo,
  nodeTaralCoin: nodeTaralCoinInfo,
  nodeClarityBitcoin: nodeClarityBitcoinInfo,
  nodeBtcFtSwap: nodeBtcFtSwapInfo,
  nodeBtcNftSwap: nodeBtcNftSwapInfo,
  nodeTaralOracleTraitV1: nodeTaralOracleTraitV1Info,
  nodeTaralOracleV1: nodeTaralOracleV1Info,
};

export const webTaralContracts = {
  webSip10FtStandard: webSip10FtStandardInfo,
  webNftTrait: webNftTraitInfo,
  webTaralCoin: webTaralCoinInfo,
  webClarityBitcoin: webClarityBitcoinInfo,
  webBtcFtSwap: webBtcFtSwapInfo,
  webBtcNftSwap: webBtcNftSwapInfo,
  webTaralOracleTraitV1: webTaralOracleTraitV1Info,
  webTaralOracleV1: webTaralOracleV1Info,
};
