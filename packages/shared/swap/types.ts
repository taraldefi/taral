import {
  BtcFtSwapContract,
  BtcNftSwapContract,
  ClarityBitcoinContract,
  NftTraitContract,
  Sip10FtStandardContract,
  TaralCoinContract,
} from "../../generated/taral";
import { Block } from "../bitcoin/block";
import { Contract, ContractInstances } from "../types";

export type DeployedContracts = ContractInstances<
  {
    sip10FtStandard: Contract<Sip10FtStandardContract>;
    nftTrait: Contract<NftTraitContract>;
    taralCoin: Contract<TaralCoinContract>;
    clarityBitcoin: Contract<ClarityBitcoinContract>;
    btcFtSwap: Contract<BtcFtSwapContract>;
    btcNftSwap: Contract<BtcNftSwapContract>;
  },
  unknown
>;

export type RequestType = "readonly" | "public";

export type HeaderPartsType = {
  version: Buffer;
  parent: Buffer;
  "merkle-root": Buffer;
  timestamp: Buffer;
  nbits: Buffer;
  nonce: Buffer;
  height: number;
};

export type BlockCvType = {
  header: Buffer;
  height: number;
};

export type BlockPartsType = {
  height: number;
  "merkle-root": Buffer;
  nbits: Buffer;
  nonce: Buffer;
  parent: Buffer;
  timestamp: Buffer;
  version: Buffer;
};

export type ProofCvType = {
  hashes: Buffer[];
  "tree-depth": number;
  "tx-index": number;
};

export type InCvType = {
  outpoint: {
    hash: Buffer;
    index: Buffer;
  };
  scriptSig: Buffer;
  sequence: Buffer;
};

export type OutsCvType = {
  scriptPubKey: Buffer;
  value: Buffer;
};

export type TxPartsCvType = {
  version: Buffer;
  ins: InCvType[];
  outs: OutsCvType[];
  locktime: Buffer;
};

export interface ParamsFromTxResponse {
  txCV: Buffer;
  txPartsCv: TxPartsCvType;
  proofCv: ProofCvType;
  block?: Block;

  blockCv: BlockCvType;
  blockHeader: string;
  headerParts: any[];
  headerPartsCv: HeaderPartsType;
  stacksBlock: any;
  stxHeight: number;
  error: string | undefined;
}
