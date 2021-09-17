import { ClarityBitcoinContract } from "taral-generated-contracts";
import { Logger } from "../logger";
import { TxPartsCvType } from "./types";

export async function concatTransaction({
  txPartsCV,
  contract,
}: {
  txPartsCV: TxPartsCvType;
  contract: ClarityBitcoinContract;
}): Promise<string> {
  Logger.debug("Calling concatTx");

  let response = await contract.concatTx(txPartsCV);

  let result = response.toString();

  if (result.startsWith("0x")) {
    result = result.substring(2);
  }

  Logger.debug("concat-tx result");
  Logger.debug(JSON.stringify(response));
  Logger.debug("---------------");

  return result;
}
