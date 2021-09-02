import { getMetadata } from "./base-request";
import { ClarityBitcoinRequest } from "./clarity-bitcoin-request";
import { Logger } from "../logger";

export interface GetReversedTxIdRequest extends ClarityBitcoinRequest {
    txCv: Buffer;
}

export async function getReversedTxId(request: GetReversedTxIdRequest): Promise<string> {
    // Call readonly function
    //
    let response = await request.contract.getReversedTxid(request.txCv, getMetadata('readonly', request));

    let result = response.toString();

    Logger.debug(`getReversedTxId result: ${result}`);

    return result;
}