import { nodeSip10FtStandardInfo, webSip10FtStandardInfo } from './sip-10-ft-standard';
import { nodeNftTraitInfo, webNftTraitInfo } from './nft-trait';
import { nodeTaralCoinInfo, webTaralCoinInfo } from './taral-coin';
import { nodeClarityBitcoinInfo, webClarityBitcoinInfo } from './clarity-bitcoin';
import { nodeBtcFtSwapInfo, webBtcFtSwapInfo } from './btc-ft-swap';
import { nodeBtcNftSwapInfo, webBtcNftSwapInfo } from './btc-nft-swap';
    export type { Sip10FtStandardContract } from './sip-10-ft-standard';
export type { NftTraitContract } from './nft-trait';
export type { TaralCoinContract } from './taral-coin';
export type { ClarityBitcoinContract } from './clarity-bitcoin';
export type { BtcFtSwapContract } from './btc-ft-swap';
export type { BtcNftSwapContract } from './btc-nft-swap';
    
    export const nodeTaralContracts = {
      nodeSip10FtStandard: nodeSip10FtStandardInfo,
  nodeNftTrait: nodeNftTraitInfo,
  nodeTaralCoin: nodeTaralCoinInfo,
  nodeClarityBitcoin: nodeClarityBitcoinInfo,
  nodeBtcFtSwap: nodeBtcFtSwapInfo,
  nodeBtcNftSwap: nodeBtcNftSwapInfo,
    };

    export const webTaralContracts = {
      webSip10FtStandard: webSip10FtStandardInfo,
  webNftTrait: webNftTraitInfo,
  webTaralCoin: webTaralCoinInfo,
  webClarityBitcoin: webClarityBitcoinInfo,
  webBtcFtSwap: webBtcFtSwapInfo,
  webBtcNftSwap: webBtcNftSwapInfo,
    };
    