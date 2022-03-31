export interface OraclePrice {
    source: string;
    payload: Buffer;
    signature: Buffer;
}

export interface IOraclePriceEntry {
    amount: bigint,
    height: bigint,
    timestamp: bigint
}

export interface IOracleSource {
    publicKey: Buffer;
}
