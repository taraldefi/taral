import { Logger, txOk } from "lib-shared";
import { TaralOracleContract } from "taral-contracts";

export async function addSource({
  source,
  publicKey,
  contract,
}: {
  source: string;
  publicKey: Buffer;
  contract: TaralOracleContract;
}): Promise<boolean> {
  const response = await txOk(contract.addSource(source, publicKey));

  Logger.debug("add-source", "Received result ", response);

  return response.value;
}
