import { Logger, txOk } from "lib-shared";
import { TaralOracleV1Contract } from "taral-contracts";
import { IOraclePriceFeed } from "./types";

interface InternalOraclePrice {
    src: string;
    msg: Buffer;
    sig: Buffer;
}

export async function addPrices({
    contract,
    priceFeed,
}: {
    contract: TaralOracleV1Contract;
    priceFeed: IOraclePriceFeed[];
}): Promise<boolean> {
    const map = priceFeed.map(
        (feed) =>
            <InternalOraclePrice>{
                msg: feed.payload,
                sig: feed.signature,
                src: feed.source,
            }
    );

    const response = await txOk(contract.addPrices(map));

    Logger.debug("add-prices", "Received result ", response);

    return response.value;
}
