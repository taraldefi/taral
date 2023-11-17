import { Logger, txOk } from "lib-shared";
import { TaralOracleContract } from "taral-contracts";

export async function revokeSource({
  source,
  contract,
}: {
  source: string;
  contract: TaralOracleContract;
}): Promise<boolean> {
  const response = await txOk(contract.revokeSource(source));

  Logger.debug("revoke-source", "Received result ", response);

  return response.value;
}
