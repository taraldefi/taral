import { Logger } from "../logger";
import { ClarityBitcoinRequest, getMetadata } from "./base-request";

export interface ParseTxRequest extends ClarityBitcoinRequest {
  txCV: Buffer;
}

export async function parseTx(request: ParseTxRequest): Promise<string> {
  Logger.debug("Calling getTxid");

  let result: string = "";

  try {
    // Call readonly function
    //
    let response = await request.contract.getTxid(
      request.txCV,
      getMetadata("readonly", request)
    );
    result = response.toString();
  } catch (error: any) {
    Logger.error(`parse-tx failed: ${error.toString()}`);
  }

  Logger.debug("getTxid result");
  Logger.debug(JSON.stringify(result));
  Logger.debug("---------------");

  return result;
}
