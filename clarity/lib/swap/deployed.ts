import { BtcFtSwapContract, BtcNftSwapContract, ClarityBitcoinContract, NftTraitContract, Sip10FtStandardContract, TaralCoinContract } from "clarity/generated/taral";
import { Contract, ContractInstances } from "../types";

export type DeployedContracts = ContractInstances<{
    sip10FtStandard: Contract<Sip10FtStandardContract>; 
    nftTrait: Contract<NftTraitContract>; taralCoin: Contract<TaralCoinContract>; 
    clarityBitcoin: Contract<ClarityBitcoinContract>;
    btcFtSwap: Contract<BtcFtSwapContract>; 
    btcNftSwap: Contract<BtcNftSwapContract>;
  }, unknown>;