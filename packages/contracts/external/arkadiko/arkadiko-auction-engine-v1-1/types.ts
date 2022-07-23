import { ClarityTypes, Transaction } from "lib-shared";

export interface ArkadikoAuctionEngineV11Contract {
    bid: (
        vaultManager: string,
        oracle: string,
        collType: string,
        auctionId: number | bigint,
        lotIndex: number | bigint,
        usda: number | bigint
    ) => Transaction<boolean, bigint>;
    closeAuction: (
        vaultManager: string,
        collType: string,
        auctionId: number | bigint
    ) => Transaction<boolean, bigint>;
    getMinimumCollateralAmount: (
        oracle: string,
        auctionId: number | bigint
    ) => Transaction<bigint, bigint>;
    migrateFunds: (
        auctionEngine: string,
        token: string
    ) => Transaction<boolean, bigint>;
    redeemLotCollateral: (
        vaultManager: string,
        ft: string,
        reserve: string,
        collType: string,
        auctionId: number | bigint,
        lotIndex: number | bigint
    ) => Transaction<boolean, bigint>;
    redeemUsda: (usdaAmount: number | bigint) => Transaction<boolean, bigint>;
    startAuction: (
        vaultId: number | bigint,
        uamount: number | bigint,
        extraDebt: number | bigint,
        vaultDebt: number | bigint,
        discount: number | bigint
    ) => Transaction<boolean, bigint>;
    toggleAuctionEngineShutdown: () => Transaction<boolean, bigint>;
    discountedAuctionPrice: (
        priceInCents: number | bigint,
        auctionId: number | bigint
    ) => Promise<ClarityTypes.Response<bigint, null>>;
    getAuctionById: (id: number | bigint) => Promise<{
        "auction-type": string;
        "collateral-amount": bigint;
        "collateral-token": string;
        "debt-to-raise": bigint;
        discount: bigint;
        "ends-at": bigint;
        id: bigint;
        "lot-size": bigint;
        "lots-sold": bigint;
        "total-collateral-sold": bigint;
        "total-debt-burned": bigint;
        "total-debt-raised": bigint;
        "vault-id": bigint;
    }>;
    getAuctionIds: () => Promise<ClarityTypes.Response<bigint[], null>>;
    getAuctionOpen: (
        auctionId: number | bigint
    ) => Promise<ClarityTypes.Response<boolean, null>>;
    getAuctions: () => Promise<
        ClarityTypes.Response<
            {
                "auction-type": string;
                "collateral-amount": bigint;
                "collateral-token": string;
                "debt-to-raise": bigint;
                discount: bigint;
                "ends-at": bigint;
                id: bigint;
                "lot-size": bigint;
                "lots-sold": bigint;
                "total-collateral-sold": bigint;
                "total-debt-burned": bigint;
                "total-debt-raised": bigint;
                "vault-id": bigint;
            }[],
            null
        >
    >;
    getLastBid: (
        auctionId: number | bigint,
        lotIndex: number | bigint
    ) => Promise<{
        "collateral-amount": bigint;
        "collateral-token": string;
        owner: string;
        redeemed: boolean;
        usda: bigint;
    }>;
    getWinningLots: (owner: string) => Promise<{
        ids: {
            "auction-id": bigint;
            "lot-index": bigint;
        }[];
    }>;
    ERRAUCTIONNOTALLOWED: () => Promise<bigint>;
    ERRAUCTIONNOTCLOSED: () => Promise<bigint>;
    ERRAUCTIONNOTOPEN: () => Promise<bigint>;
    ERRBLOCKHEIGHTNOTREACHED: () => Promise<bigint>;
    ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<bigint>;
    ERRLOTALREADYREDEEMED: () => Promise<bigint>;
    ERRLOTNOTOPEN: () => Promise<bigint>;
    ERRLOTSOLD: () => Promise<bigint>;
    ERRNOTAUTHORIZED: () => Promise<bigint>;
    ERRPOORBID: () => Promise<bigint>;
    ERRTOKENTYPEMISMATCH: () => Promise<bigint>;
    blocksPerDay: () => Promise<bigint>;
    auctionEngineShutdownActivated: () => Promise<boolean>;
    auctionIds: () => Promise<bigint[]>;
    lastAuctionId: () => Promise<bigint>;
    lotSize: () => Promise<bigint>;
    removingAuctionId: () => Promise<bigint>;
    auctions: (key: { id: bigint }) => Promise<{
        "auction-type": string;
        "collateral-amount": bigint;
        "collateral-token": string;
        "debt-to-raise": bigint;
        discount: bigint;
        "ends-at": bigint;
        id: bigint;
        "lot-size": bigint;
        "lots-sold": bigint;
        "total-collateral-sold": bigint;
        "total-debt-burned": bigint;
        "total-debt-raised": bigint;
        "vault-id": bigint;
    } | null>;
    bids: (key: { "auction-id": bigint; "lot-index": bigint }) => Promise<{
        "collateral-amount": bigint;
        "collateral-token": string;
        owner: string;
        redeemed: boolean;
        usda: bigint;
    } | null>;
    redeemingLot: (key: { user: string }) => Promise<{
        "auction-id": bigint;
        "lot-index": bigint;
    } | null>;
    winningLots: (key: { user: string }) => Promise<{
        ids: {
            "auction-id": bigint;
            "lot-index": bigint;
        }[];
    } | null>;
}
