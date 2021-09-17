import { ClarityBitcoinContract } from "taral-generated-contracts";
import { Logger } from "../logger";

export async function getTxId({ txBuffCV, contract }: { txBuffCV: Buffer; contract: ClarityBitcoinContract }): Promise<string> {
  Logger.debug("Calling getTxid");

  // Call readonly function
  //
  let response = await contract.getTxid(txBuffCV);

  let result = response.toString();

  Logger.debug("getTxid result");
  Logger.debug(JSON.stringify(response));
  Logger.debug("---------------");

  return result;
}

export async function getReversedTxId(
  { txCv, contract }: { txCv: Buffer; contract: ClarityBitcoinContract; }
): Promise<string> {
  Logger.debug("Calling getReversedTxid");

  // Call readonly function
  //
  let response = await contract.getReversedTxid(txCv);

  let result = response.toString();

  Logger.debug("getReversedTxid result");
  Logger.debug(JSON.stringify(response));
  Logger.debug("---------------");

  return result;
}
