import { ClarityBitcoinRequest, getMetadata } from "./base-request";
import { Logger } from "../logger";

export interface GetTxIdRequest extends ClarityBitcoinRequest {
    txBuffCV: Buffer;
}

export interface GetReversedTxIdRequest extends ClarityBitcoinRequest {
    txCv: Buffer;
}

export async function getTxId(request: GetTxIdRequest): Promise<string> {
    Logger.debug('Calling getTxid');

    // Call readonly function
    //
    let response = await request.contract.getTxid(request.txBuffCV, getMetadata('readonly', request));

    let result = response.toString();

    Logger.debug('getTxid result');
    Logger.debug(JSON.stringify(response));
    Logger.debug('---------------');

    return result;
}

export async function getReversedTxId(request: GetReversedTxIdRequest): Promise<string> {
    Logger.debug('Calling getReversedTxid');
    
    // Call readonly function
    //
    let response = await request.contract.getReversedTxid(request.txCv, getMetadata('readonly', request));

    let result = response.toString();

    Logger.debug('getReversedTxid result');
    Logger.debug(JSON.stringify(response));
    Logger.debug('---------------');

    return result;
}