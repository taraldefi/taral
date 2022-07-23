export interface InsurancePoolOracleContract {
    getPrice: (
        source: string,
        symbol: string
    ) => Promise<{
        amount: bigint;
        height: bigint;
        timestamp: bigint;
    } | null>;
}
