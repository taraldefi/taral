import { Block } from "lib-bitcoin";
import { NodeContract, NodeContractInstances } from "lib-shared";
import {
    BtcFtSwapContract,
    BtcNftSwapContract,
    ClarityBitcoinContract,
    NftTraitContract,
    Sip10FtStandardContract,
    TaralCoinContract
} from "taral-contracts";

export type DeployedContracts = NodeContractInstances<
    {
        sip10FtStandard: NodeContract<Sip10FtStandardContract>;
        nftTrait: NodeContract<NftTraitContract>;
        taralCoin: NodeContract<TaralCoinContract>;
        clarityBitcoin: NodeContract<ClarityBitcoinContract>;
        btcFtSwap: NodeContract<BtcFtSwapContract>;
        btcNftSwap: NodeContract<BtcNftSwapContract>;
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
    height: bigint;
};

export type BlockCvType = {
    header: Buffer;
    height: bigint;
};

export type BlockPartsType = {
    height: bigint;
    "merkle-root": Buffer;
    nbits: Buffer;
    nonce: Buffer;
    parent: Buffer;
    timestamp: Buffer;
    version: Buffer;
};

export type ProofCvType = {
    hashes: Buffer[];
    "tree-depth": bigint;
    "tx-index": bigint;
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
    stxHeight: bigint;
    error: string | undefined;
}
