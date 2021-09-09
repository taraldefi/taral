import { getRpcClient } from "../bitcoin/client";
import { getRawTransaction } from "../bitcoin/transaction";
import { Logger } from "../logger";
import { ClarityBitcoinRequest } from "./base-request";
import MerkleTree from "merkletreejs";
import { makeBuffer, numberToBuffer, reverse, txForHash } from "./utils";
import { BlockCvType, HeaderPartsType, InCvType, OutsCvType, ProofCvType, TxPartsCvType } from "./types";
import { Transaction } from "bitcore-lib";
import { Block } from '../bitcoin/block';
import {
  concatTransaction,
  ConcatTransactionRequest,
} from "./concat-transaction";
import { getStxBlock } from "./stacks";
import { getBlockByHash, getBlockHeader } from "../bitcoin/block";
import { NETWORK } from "clarity/configuration";
import SHA256 from 'crypto-js/sha256';

const ERR_API_FAILURE: string = "api failure";
const ERR_DIFFERENT_HEX: string = "different hex";
const ERR_NO_STACKS_BLOCK: string = 'no stacks block';

export interface ParamsFromTxResponse {
  txCV: Buffer;
  txPartsCv: TxPartsCvType;
  proofCv: ProofCvType;
  block?: Block;

  blockCv: BlockCvType;
  blockHeader: any;
  headerParts: any[];
  headerPartsCv: HeaderPartsType;
  stacksBlock: any;
  stxHeight: number;
  error: string | undefined;
}

export interface ParamsFromTxRequest extends ClarityBitcoinRequest {
  btcTxId: string;
  stxHeight?: number;
}

function getFailureResponse(error: string): ParamsFromTxResponse {
  return {
    txCV: Buffer.from(''),

    proofCv: {
      "hashes": [],
      "tree-depth": 0,
      "tx-index": 0
    },

    block: {
      bits: '',
      chainwork: '',
      confirmations: 0,
      difficulty: 0,
      hash: '',
      height: 0,
      mediantime: 0,
      merkleroot: '',
      nTx: 0,
      nextblockhash: '',
      nonce: 0,
      previousblockhash: '',
      size: 0,
      strippedsize: 0,
      time: 0,
      tx: [],
      version: 0,
      versionHex: '',
      weight: 0
    },

    blockCv: {
      header: Buffer.from(''),
      height: 0
    },

    headerPartsCv: {
      "merkle-root": Buffer.from(''),
      height: 0,
      nbits: Buffer.from(''),
      nonce: Buffer.from(''),
      parent: Buffer.from(''),
      timestamp: Buffer.from(''),
      version: Buffer.from('')
    },

    blockHeader: undefined,
    headerParts: [],
    stxHeight: 0,
    txPartsCv: {
      ins: [],
      locktime: Buffer.from(''),
      outs: [],
      version: Buffer.from('')
    },
    error: error,
    stacksBlock: undefined
  };
}

export async function paramsFromTx(request: ParamsFromTxRequest): Promise<ParamsFromTxResponse> {
  Logger.debug('Calling paramsFromTx');

  const bitcoinRpcClient = getRpcClient();

  const rawTransaction = await getRawTransaction(
    bitcoinRpcClient,
    request.btcTxId
  );

  const transaction = new Transaction(rawTransaction.hex);

  if (!rawTransaction.hex) {
    return getFailureResponse(ERR_API_FAILURE);
  }

  const txCV = MerkleTree.bufferify(txForHash(rawTransaction.hex));

  let version;
  if (rawTransaction.hex.substr(9, 10) === "00") {
    version = rawTransaction.hex.substr(0, 12);
  } else {
    version = rawTransaction.hex.substr(0, 8);
  }

  const txPartsCv: TxPartsCvType = {
    version: makeBuffer(version),
    ins: transaction.inputs.map((input) => {
      const mapped: InCvType = {
        outpoint: {
          hash: input.prevTxId,
          index: numberToBuffer(input.outputIndex, 4),
        },
        scriptSig: input.script.toBuffer(),
        sequence: numberToBuffer(input.sequenceNumber, 4),
      };

      return mapped;
    }),

    outs: transaction.outputs.map((output) => {
      const mapped: OutsCvType = {
        scriptPubKey: output.script.getPublicKey(),
        value: numberToBuffer(output.satoshis, 8),
      };

      return mapped;
    }),

    locktime: Buffer.from(
      rawTransaction.hex.substr(rawTransaction.hex.length - 8),
      "hex"
    ),
  };

  const concatTransactionRequest: ConcatTransactionRequest = {
    accounts: request.accounts,
    contract: request.contract,
    txPartsCV: txPartsCv,
  };

  const txHexResponse = await concatTransaction(concatTransactionRequest);

  if (txHexResponse != rawTransaction.hex) {
    Logger.error("Failed to match tx hex");

    return getFailureResponse(ERR_DIFFERENT_HEX);
  }

  const block = await getBlockByHash(bitcoinRpcClient, rawTransaction.blockhash);
  const blockHeader = await getBlockHeader(bitcoinRpcClient, rawTransaction.blockhash);

  let height;
  let stacksBlock;
  if (!request.stxHeight) {
    console.log("try to find stx height");
    const bitcoinBlockHeight = block.height;
    stacksBlock = await getStxBlock(bitcoinBlockHeight);
    if (!stacksBlock) {
      return getFailureResponse(ERR_NO_STACKS_BLOCK);
    }
    height = stacksBlock.height;
  } else {

    const stacksBlockResponse = await fetch(
      `${NETWORK.coreApiUrl}/extended/v1/block/by_height/${request.stxHeight}`
    );

    stacksBlock = await stacksBlockResponse.json();
    height = request.stxHeight;
  }

  console.log({ height, stacksBlockHash: stacksBlock.hash });

  const txIds = block.tx.map(transaction => transaction.txid);
  const transactionIndex = block.tx.findIndex(transaction => transaction.txid == request.btcTxId);
  const tree = new MerkleTree(txIds, SHA256, { isBitcoinTree: true });
  const treeDepth = tree.getDepth();

  const proof = tree.getProof(request.btcTxId, transactionIndex);
  const proofCv: ProofCvType = {
    "tx-index": transactionIndex,
    "tree-depth": treeDepth,
    hashes: proof.map(proofItem => reverse(proofItem.data))
  };

  const blockCv: BlockCvType = {
    header: Buffer.from(blockHeader, 'hex'),
    height: height
  };

  // block parts
  const headerParts = [
    blockHeader.substr(0, 8),
    blockHeader.substr(8, 64),
    blockHeader.substr(72, 64),
    blockHeader.substr(136, 8),
    blockHeader.substr(144, 8),
    blockHeader.substr(152, 8),
  ];

  const headerPartsCv: HeaderPartsType = {
    "merkle-root": Buffer.from(headerParts[2], 'hex'),
    parent: Buffer.from(headerParts[1], 'hex'),
    version: Buffer.from(headerParts[0], 'hex'),
    timestamp: Buffer.from(headerParts[3], 'hex'),
    nbits: Buffer.from(headerParts[4], 'hex'),
    nonce: Buffer.from(headerParts[5], 'hex'),
    height: height
  };

  const result: ParamsFromTxResponse = {
    txCV,
    txPartsCv,
    proofCv,
    block,
    blockCv,
    blockHeader,
    headerParts,
    headerPartsCv,
    stacksBlock,
    stxHeight: height,
    error: undefined
  };

  Logger.debug('paramsFromTx result');
  Logger.debug(JSON.stringify(result));
  Logger.debug('---------------');

  return result;
}

