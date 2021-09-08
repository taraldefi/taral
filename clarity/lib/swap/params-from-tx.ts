import { getRpcClient } from "../bitcoin/client";
import { getRawTransaction } from "../bitcoin/transaction";
import { Logger } from "../logger";
import { ClarityBitcoinRequest, getMetadata } from "./base-request";
import MerkleTree from "merkletreejs";
import { makeBuffer, numberToBuffer, reverse, txForHash } from "./utils";
import { InCvType, OutsCvType, TxPartsCvType } from "./types";
import { Block, Transaction } from "bitcore-lib";
import {
  concatTransaction,
  ConcatTransactionRequest,
} from "./concat-transaction";
import { getStxBlock } from "./stacks";
import { getBlockByHash, getBlockHeader } from "../bitcoin/block";
import { NETWORK } from "clarity/configuration";

const ERR_API_FAILURE = "api failure";

const ERR_DIFFERENT_HEX = "different hex";

const ERR_NO_STACKS_BLOCK = 'no stacks block';

export interface ParamsFromTxRequest extends ClarityBitcoinRequest {
  btcTxId: string;
  stxHeight: number;
}

export async function paramsFromTx(request: ParamsFromTxRequest) {
  Logger.debug(`Fetching params for transaction ${request.btcTxId}`);

  const bitcoinRpcClient = getRpcClient();

  const rawTransaction = await getRawTransaction(
    bitcoinRpcClient,
    request.btcTxId
  );

  const transaction = new Transaction(rawTransaction.hex);

  if (!rawTransaction.hex) {
    return {
      txCV: undefined,
      proofCV: undefined,
      block: undefined,
      blockCV: undefined,
      headerPartsCV: undefined,
      header: undefined,
      headerParts: undefined,
      stxHeight: undefined,
      txPartsCV: undefined,
      error: ERR_API_FAILURE,
    };
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

    return {
      txCV: undefined,
      proofCV: undefined,
      block: undefined,
      blockCV: undefined,
      headerPartsCV: undefined,
      header: undefined,
      headerParts: undefined,
      stxHeight: undefined,
      txPartsCV: undefined,
      error: ERR_DIFFERENT_HEX,
    };
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
      return {
        txCV: undefined,
        proofCV: undefined,
        block: undefined,
        blockCV: undefined,
        headerPartsCV: undefined,
        header: undefined,
        headerParts: undefined,
        stxHeight: undefined,
        txPartsCV: undefined,
        error: ERR_NO_STACKS_BLOCK,
      };
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
}
