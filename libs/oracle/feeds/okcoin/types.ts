export interface OkCoinInstruments {
    best_ask: string;
    best_bid: string;
    instrument_id: string;
    open_utc0: string;
    open_utc8: string;
    product_id: string;
    last: string;
    last_qty: string;
    ask: string;
    best_ask_size: string;
    bid: string;
    best_bid_size: string;
    open_24h: string;
    high_24h: string;
    low_24h: string;
    base_volume_24h: string;
    timestamp: Date;
    quote_volume_24h: string;
}

export interface OkCoinPrices {
    BTC: string;
    ETH: string;
}

export interface OkCoinOracleResponse {
    messages: string[];
    prices: OkCoinPrices;
    signatures: string[];
    timestamp: string;
}
