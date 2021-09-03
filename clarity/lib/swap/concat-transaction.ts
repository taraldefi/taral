import { Logger } from "../logger";
import { ClarityBitcoinRequest, getMetadata } from "./base-request";
import { TxPartsCvType } from "./types";

export interface ConcatTransactionRequest extends ClarityBitcoinRequest {
    txPartsCV: TxPartsCvType;
}

export async function concatTransaction(request: ConcatTransactionRequest): Promise<string> {
    // Call readonly function
    //
    let response = await request.contract.concatTx(request.txPartsCV, getMetadata('readonly', request));

    let result = response.toString();

    Logger.debug(`concat-tx result: ${result}`);
    
    return result;
}