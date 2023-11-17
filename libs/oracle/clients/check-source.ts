import { Logger } from "lib-shared";
import { TaralOracleContract } from "taral-contracts";
import { IOracleSource } from "./types";

export async function checkSource({
  source,
  contract,
}: {
  source: string;
  contract: TaralOracleContract;
}): Promise<IOracleSource | null> {
  const response = await contract.checkSource(source);

  Logger.debug("check-source", "Received result ", response);

  if (response == null) {
    return null;
  }

  return {
    publicKey: response["public-key"],
  };
}
