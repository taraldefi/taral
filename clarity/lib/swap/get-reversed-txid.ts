import { getMetadata } from "./base-request";
import { ClarityBitcoinRequest } from "./clarity-bitcoin-request";

export interface GetReversedTxIdRequest extends ClarityBitcoinRequest {
    txCv: Buffer;
}

export async function getReversedTxId(request: GetReversedTxIdRequest): Promise<Buffer> {
    // Call readonly function
    //
    let result = await request.contract.getReversedTxid(request.txCv, getMetadata('readonly', request));

    console.log('getReversedTxId', result.toString());
    return result;
}