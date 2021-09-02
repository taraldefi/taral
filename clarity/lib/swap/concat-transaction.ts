import { getMetadata } from "./base-request";
import { ClarityBitcoinRequest } from "./clarity-bitcoin-request";

export type txPartsCvType = {
    "ins": {
        "outpoint": {
            "hash": Buffer;
            "index": Buffer
        };
        "scriptSig": Buffer;
        "sequence": Buffer
    }[];
    "locktime": Buffer;
    "outs": {
        "scriptPubKey": Buffer;
        "value": Buffer
    }[];
    "version": Buffer
};

export interface ConcatTransactionRequest extends ClarityBitcoinRequest {
    txPartsCV: txPartsCvType;
}

export async function concatTransaction(request: ConcatTransactionRequest): Promise<Buffer> {
    // Call readonly function
    //
    let result = await request.contract.concatTx(request.txPartsCV, getMetadata('readonly', request));

    console.log('concat-tx', result.toString());
    return result;
}