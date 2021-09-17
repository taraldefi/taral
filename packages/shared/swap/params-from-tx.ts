
// import SHA256 from "crypto-js/sha256";
// import MerkleTree from "merkletreejs";
// import { NETWORK } from "taral-configuration";
// import { Block, getBlockByHash, getBlockHeader } from "../bitcoin/block";
// import { getRpcClient } from "../bitcoin/client";
// import { getRawTransaction } from "../bitcoin/transaction";
// import { Logger } from "../logger";
// import {
//   concatTransaction,
// } from "./concat-transaction";
// import { getStxBlock } from "../stacks/get-stx-block";
// import {
//   BlockCvType,
//   HeaderPartsType,
//   InCvType,
//   OutsCvType,
//   ParamsFromTxResponse,
//   ProofCvType,
//   TxPartsCvType,
// } from "./types";
// import { makeBuffer, numberToBuffer, reverse, txForHash } from "./utils";

// const ERR_API_FAILURE: string = "api failure";
// const ERR_DIFFERENT_HEX: string = "different hex";
// const ERR_NO_STACKS_BLOCK: string = "no stacks block";

// function getFailureResponse(error: string): ParamsFromTxResponse {
//   return {
//     txCV: Buffer.from(""),

//     proofCv: {
//       hashes: [],
//       "tree-depth": 0,
//       "tx-index": 0,
//     },

//     block: {
//       bits: "",
//       chainwork: "",
//       confirmations: 0,
//       difficulty: 0,
//       hash: "",
//       height: 0,
//       mediantime: 0,
//       merkleroot: "",
//       nTx: 0,
//       nextblockhash: "",
//       nonce: 0,
//       previousblockhash: "",
//       size: 0,
//       strippedsize: 0,
//       time: 0,
//       tx: [],
//       version: 0,
//       versionHex: "",
//       weight: 0,
//     },

//     blockCv: {
//       header: Buffer.from(""),
//       height: 0,
//     },

//     headerPartsCv: {
//       "merkle-root": Buffer.from(""),
//       height: 0,
//       nbits: Buffer.from(""),
//       nonce: Buffer.from(""),
//       parent: Buffer.from(""),
//       timestamp: Buffer.from(""),
//       version: Buffer.from(""),
//     },

//     blockHeader: "",
//     headerParts: [],
//     stxHeight: 0,
//     txPartsCv: {
//       ins: [],
//       locktime: Buffer.from(""),
//       outs: [],
//       version: Buffer.from(""),
//     },
//     error: error,
//     stacksBlock: undefined,
//   };
// }

// export async function paramsFromTx(
//   { btcTxId, stxHeight, contract }: { 
//     btcTxId: string;
//     stxHeight?: number;
//     contract: ClarityBitcoinContract
//   }
// ): Promise<ParamsFromTxResponse> {
//   Logger.debug("Calling paramsFromTx");

//   const bitcoinRpcClient = getRpcClient();

//   const rawTransaction = await getRawTransaction(
//     bitcoinRpcClient,
//     btcTxId
//   );

//   if (!rawTransaction.hex) {
//     return getFailureResponse(ERR_API_FAILURE);
//   }

//   const txCV = MerkleTree.bufferify(txForHash(rawTransaction.hex));

//   let version;
//   if (rawTransaction.hex.substr(9, 10) === "00") {
//     version = rawTransaction.hex.substr(0, 12);
//   } else {
//     version = rawTransaction.hex.substr(0, 8);
//   }

//   Logger.debug(`params-from-tx :: version - ${version}`);

//   const txPartsCv: TxPartsCvType = {
//     version: makeBuffer(version),
//     ins: rawTransaction.vin.map((input) => {
//       const mapped: InCvType = {
//         outpoint: {
//           hash: reverse(makeBuffer(input.txid)),
//           index: numberToBuffer(input.vout, 4),
//         },
//         scriptSig: makeBuffer(input.scriptSig.hex),
//         sequence: numberToBuffer(input.sequence, 4),
//       };

//       return mapped;
//     }),

//     outs: rawTransaction.vout.map((output) => {
//       const mapped: OutsCvType = {
//         scriptPubKey: makeBuffer(output.scriptPubKey.hex),
//         value: numberToBuffer(output.value * 100_000_000, 8),
//       };

//       return mapped;
//     }),

//     locktime: Buffer.from(
//       rawTransaction.hex.substr(rawTransaction.hex.length - 8),
//       "hex"
//     ),
//   };

//   Logger.debug(`params-from-tx :: assembled transaction parts`);
//   Logger.debug(JSON.stringify(txPartsCv));


//   const txHexResponse = await concatTransaction({
//     contract: contract,
//     txPartsCV: txPartsCv,
//   });

//   if (txHexResponse != rawTransaction.hex) {
//     Logger.debug(
//       "Got the transaction hex back from calling concat-tx function"
//     );
//     Logger.debug(JSON.stringify(txHexResponse));

//     Logger.error(
//       `Failed to match tx hex: ${JSON.stringify(txHexResponse)} against ${
//         rawTransaction.hex
//       }`
//     );

//     return getFailureResponse(ERR_DIFFERENT_HEX);
//   }

//   const block = await getBlockByHash(
//     bitcoinRpcClient,
//     rawTransaction.blockhash
//   );

//   Logger.debug(
//     `-------------------------- Block info --------------------------`
//   );
//   Logger.debug(JSON.stringify(block));
//   Logger.debug(
//     `--------------------------              --------------------------`
//   );

//   const blockHeader = await getBlockHeader(
//     bitcoinRpcClient,
//     rawTransaction.blockhash
//   );

//   Logger.debug(
//     `-------------------------- Block header --------------------------`
//   );
//   Logger.debug(JSON.stringify(blockHeader));
//   Logger.debug(
//     `--------------------------              --------------------------`
//   );

//   let height;
//   let stacksBlock;
//   if (!stxHeight) {
//     Logger.debug("Finding stx height value by calling the stx block");
//     const bitcoinBlockHeight = block.height;
//     stacksBlock = await getStxBlock(bitcoinBlockHeight);
//     if (!stacksBlock) {
//       return getFailureResponse(ERR_NO_STACKS_BLOCK);
//     }
//     height = stacksBlock.height;
//   } else {
//     const stacksBlockResponse = await fetch(
//       `${NETWORK.coreApiUrl}/extended/v1/block/by_height/${stxHeight}`
//     );

//     stacksBlock = await stacksBlockResponse.json();
//     height = stxHeight;
//   }

//   const txIds = block.tx.map((transaction) => transaction.txid);
//   const transactionIndex = block.tx.findIndex(
//     (transaction) => transaction.txid == btcTxId
//   );
//   const tree = new MerkleTree(txIds, SHA256, { isBitcoinTree: true });
//   const treeDepth = tree.getDepth();

//   const proof = tree.getProof(btcTxId, transactionIndex);
//   const proofCv: ProofCvType = {
//     "tx-index": transactionIndex,
//     "tree-depth": treeDepth,
//     hashes: proof.map((proofItem) => reverse(proofItem.data)),
//   };

//   const blockCv: BlockCvType = {
//     header: Buffer.from(blockHeader, "hex"),
//     height: height,
//   };

//   // block parts
//   const headerParts = [
//     blockHeader.substr(0, 8),
//     blockHeader.substr(8, 64),
//     blockHeader.substr(72, 64),
//     blockHeader.substr(136, 8),
//     blockHeader.substr(144, 8),
//     blockHeader.substr(152, 8),
//   ];

//   const headerPartsCv: HeaderPartsType = {
//     "merkle-root": Buffer.from(headerParts[2], "hex"),
//     parent: Buffer.from(headerParts[1], "hex"),
//     version: Buffer.from(headerParts[0], "hex"),
//     timestamp: Buffer.from(headerParts[3], "hex"),
//     nbits: Buffer.from(headerParts[4], "hex"),
//     nonce: Buffer.from(headerParts[5], "hex"),
//     height: height,
//   };

//   const result: ParamsFromTxResponse = {
//     txCV,
//     txPartsCv,
//     proofCv,
//     block,
//     blockCv,
//     blockHeader,
//     headerParts,
//     headerPartsCv,
//     stacksBlock,
//     stxHeight: height,
//     error: undefined,
//   };

//   return result;
// }
