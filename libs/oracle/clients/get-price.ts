import { Logger } from "lib-shared";
import { TaralOracleV1Contract } from "taral-contracts";
import { IOraclePriceEntry } from "./types";

export async function getPrice({
  contract,
  source,
  symbol,
}: {
  contract: TaralOracleV1Contract;
  source: string;
  symbol: string;
}): Promise<IOraclePriceEntry | null> {
  const response = await contract.getPrice(source, symbol);

  Logger.debug("get-price", "Received result ", response);

  if (response == null) {
    return null;
  }

  return <IOraclePriceEntry>{
    amount: response.amount,
    height: response.height,
    timestamp: response.timestamp,
  };
}
