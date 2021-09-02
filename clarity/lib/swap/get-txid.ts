import { getMetadata } from "./base-request";
import { ClarityBitcoinRequest } from "./clarity-bitcoin-request";
import { Logger } from "../logger";

export interface GetTxIdRequest extends ClarityBitcoinRequest {
    txBuffCV: Buffer;
}

export async function getTxId(request: GetTxIdRequest): Promise<string> {
    // Call readonly function
    //
    let response = await request.contract.getTxid(request.txBuffCV, getMetadata('readonly', request));

    let result = response.toString();

    Logger.debug(`txid result: ${result}`);

    return result;
}