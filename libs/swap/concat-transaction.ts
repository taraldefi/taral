import { Logger } from "lib-shared";
import { ClarityBitcoinContract } from "taral-contracts";
import { TxPartsCvType } from "./types";

export async function concatTransaction({
  txPartsCV,
  contract,
}: {
  txPartsCV: TxPartsCvType;
  contract: ClarityBitcoinContract;
}): Promise<string> {
  const response = await contract.concatTx(txPartsCV);

  let result = response.toString();

  if (result.startsWith("0x")) {
    result = result.substring(2);
  }

  Logger.debug("concat-tx", "Received result ", response);
  return result;
}
