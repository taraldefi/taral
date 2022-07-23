import { OKCOIN_TICKER_ENDPOINT } from "../../const";
import { OkCoinInstruments } from "./types";

export async function fetchInstruments(): Promise<OkCoinInstruments[]> {
    const json = await (await fetch(OKCOIN_TICKER_ENDPOINT)).text();
    return JSON.parse(json);
}
