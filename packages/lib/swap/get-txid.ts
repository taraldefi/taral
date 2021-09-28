import { Logger } from "lib-shared";
import { ClarityBitcoinContract } from "taral-generated-contracts";

export async function getTxId({
  txBuffCV,
  contract,
}: {
  txBuffCV: Buffer;
  contract: ClarityBitcoinContract;
}): Promise<string> {
  // Call readonly function
  //
  let response = await contract.getTxid(txBuffCV);

  let result = response.toString();

  Logger.debug("get-tx-id", "Received result ", response);
  return result;
}

export async function getReversedTxId({
  txCv,
  contract,
}: {
  txCv: Buffer;
  contract: ClarityBitcoinContract;
}): Promise<string> {
  // Call readonly function
  //
  let response = await contract.getReversedTxid(txCv);

  let result = response.toString();

  Logger.debug("get-reversed-tx-id", "Received result ", response);
  return result;
}
