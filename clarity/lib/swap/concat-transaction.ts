import { Logger } from "../logger";
import { ClarityBitcoinRequest, getMetadata } from "./base-request";
import { TxPartsCvType } from "./types";

export interface ConcatTransactionRequest extends ClarityBitcoinRequest {
  txPartsCV: TxPartsCvType;
}

export async function concatTransaction(
  request: ConcatTransactionRequest
): Promise<string> {
  Logger.debug("Calling concatTx");
  // Call readonly function
  //
  let response = await request.contract.concatTx(
    request.txPartsCV,
    getMetadata("readonly", request)
  );

  let result = response.toString();

  Logger.debug("verifyBlockHeader result");
  Logger.debug(JSON.stringify(response));
  Logger.debug("---------------");

  return result;
}
