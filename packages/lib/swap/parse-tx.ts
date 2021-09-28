import { Logger } from "lib-shared";
import { ClarityBitcoinContract } from "taral-generated-contracts";

const NAME = "parse-tx";

export async function parseTx({
  txCV,
  contract,
}: {
  txCV: Buffer;
  contract: ClarityBitcoinContract;
}): Promise<string> {
  let result: string = "";

  try {
    // Call readonly function
    //
    let response = await contract.getTxid(txCV);
    result = response.toString();
  } catch (error) {
    Logger.error(NAME, `parse-tx failed: ${(error as any).toString()}`);
  }

  Logger.debug("parse-tx", "Received result ", result);

  return result;
}
