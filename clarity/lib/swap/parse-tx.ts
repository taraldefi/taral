import { Logger } from "../logger";
import { getMetadata } from "./base-request";
import { ClarityBitcoinRequest } from "./clarity-bitcoin-request";

export interface ParseTxRequest extends ClarityBitcoinRequest {
    txCV: Buffer;
}

export async function parseTx(request: ParseTxRequest): Promise<string> {
    let response: string = '';

    try {
        // Call readonly function
        //
        let result = await request.contract.getTxid(request.txCV, getMetadata('readonly', request));
        response = result.toString();
    } catch (e) {
        Logger.error(`parse-tx failed: ${e.toString()}`)
    }

    console.log('parse-tx', response);

    return response;
}