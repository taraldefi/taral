import { Logger, txOk } from "lib-shared";
import { TaralOracleContract } from "taral-contracts";
import { IOraclePriceFeed } from "./types";

export async function addPrice({
  contract,
  priceFeed,
}: {
  contract: TaralOracleContract;
  priceFeed: IOraclePriceFeed;
}): Promise<boolean> {
  const response = await txOk(
    contract.addPrice(priceFeed.source, priceFeed.payload, priceFeed.signature),
  );

  Logger.debug("add-price", "Received result ", response);
  return response.value;
}
