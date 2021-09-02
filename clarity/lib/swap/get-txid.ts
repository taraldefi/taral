import { getMetadata } from "./base-request";
import { ClarityBitcoinRequest } from "./clarity-bitcoin-request";

export interface GetTxIdRequest extends ClarityBitcoinRequest {
    txBuffCV: Buffer;
}

export async function getTxId(request: GetTxIdRequest): Promise<Buffer> {
    // Call readonly function
    //
    let result = await request.contract.getTxid(request.txBuffCV, getMetadata('readonly', request));

    console.log('txid', result.toString());

    return result;
}