import { Logger } from "../logger";
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

export async function concatTransaction(request: ConcatTransactionRequest): Promise<string> {
    // Call readonly function
    //
    let response = await request.contract.concatTx(request.txPartsCV, getMetadata('readonly', request));

    let result = response.toString();

    Logger.debug(`concat-tx result: ${result}`);
    
    return result;
}