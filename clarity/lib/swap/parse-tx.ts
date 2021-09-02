import { Logger } from "../logger";
import { getMetadata } from "./base-request";
import { ClarityBitcoinRequest } from "./clarity-bitcoin-request";

export interface ParseTxRequest extends ClarityBitcoinRequest {
    txCV: Buffer;
}

export async function parseTx(request: ParseTxRequest): Promise<string> {
    let result: string = '';

    try {
        // Call readonly function
        //
        let response = await request.contract.getTxid(request.txCV, getMetadata('readonly', request));
        result = response.toString();
    } catch (e) {
        Logger.error(`parse-tx failed: ${e.toString()}`)
    }

    console.log(`parse-tx result: ${result}`);

    return result;
}