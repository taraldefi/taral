import { getRpcClient } from "../bitcoin/client";
import { getRawTransaction } from "../bitcoin/transaction";
import { Logger } from "../logger";
import { ClarityBitcoinRequest, getMetadata } from "./base-request";
import MerkleTree from "merkletreejs";
import { makeBuffer, txForHash } from "./utils";
import { TxPartsCvType } from "./types";

const ERR_API_FAILURE = 'api failure';

export interface ParamsFromTxRequest extends ClarityBitcoinRequest {
    btcTxId: string;
    stxHeight: number;
}

// export async function paramsFromTx(request: ParamsFromTxRequest) {
//     Logger.debug(`Fetching params for transaction ${request.btcTxId}`);

//     const bitcoinRpcClient = await getRpcClient();

//     const rawTransaction = await getRawTransaction(bitcoinRpcClient, request.btcTxId);

//     if (!rawTransaction.hex) {
//         return {
//             txCV: undefined,
//             proofCV: undefined,
//             block: undefined,
//             blockCV: undefined,
//             headerPartsCV: undefined,
//             header: undefined,
//             headerParts: undefined,
//             stxHeight: undefined,
//             txPartsCV: undefined,
//             error: ERR_API_FAILURE,
//         };
//     }

//     const txCV = MerkleTree.bufferify(txForHash(rawTransaction.hex));

//     let version;
//     if (rawTransaction.hex.substr(9, 10) === "00") {
//         version = rawTransaction.hex.substr(0, 12)
//     } else {
//         version = rawTransaction.hex.substr(0, 8)
//     }

//     const txPartsCv: TxPartsCvType = {
//         version: makeBuffer(version),
//         ins: rawTransaction.vin.map(input => {
//              /*
//         input.prev_hash = input.received_from.txid;
//         input.output_index = input.received_from.output_no;
//         input.script = input.script_hex;
//         input.sequence = 123;
//         */
//         switch (input.script_type) {
//             case 'pay-to-witness-pubkey-hash':
//               return tupleCV({
//                 outpoint: tupleCV({
//                   hash: bufferCV(reverse(Buffer.from(input.prev_hash, 'hex'))),
//                   index: bufferCV(numberToBuffer(input.output_index, 4)),
//                 }),
//                 scriptSig: bufferCV(Buffer.from(input.script, 'hex')),
//                 sequence: bufferCV(numberToBuffer(input.sequence, 4)),
//               });
//             case 'pay-to-pubkey-hash':
//             default:
//               return tupleCV({
//                 outpoint: tupleCV({
//                   hash: bufferCV(reverse(Buffer.from(input.prev_hash, 'hex'))),
//                   index: bufferCV(numberToBuffer(input.output_index, 4)),
//                 }),
//                 scriptSig: bufferCV(Buffer.from(input.script, 'hex')),
//                 sequence: bufferCV(numberToBuffer(input.sequence, 4)),
//               });
//         })
//     }
// }
