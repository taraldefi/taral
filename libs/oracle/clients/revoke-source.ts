import { Logger, txOk } from "lib-shared";
import { TaralOracleV1Contract } from "taral-contracts";

export async function revokeSource({
  source,
  contract,
}: {
  source: string;
  contract: TaralOracleV1Contract;
}): Promise<boolean> {
  let response = await txOk(contract.revokeSource(source));

  Logger.debug("revoke-source", "Received result ", response);

  return response.value;
}
