import { ClarityTypes } from '../../../../shared/clarity/types';
import { IMetadata } from '../../../../shared/providers/types';
import { Transaction } from '../../../../shared/transaction';

// prettier-ignore

export interface ArkadikoAuctionEngineV11Contract {
    bid: (vaultManager: string, oracle: string, collType: string, auctionId: number, lotIndex: number, usda: number, metadata: IMetadata) => Transaction<boolean, number>;
    closeAuction: (vaultManager: string, collType: string, auctionId: number, metadata: IMetadata) => Transaction<boolean, number>;
    getMinimumCollateralAmount: (oracle: string, auctionId: number, metadata: IMetadata) => Transaction<number, number>;
    migrateFunds: (auctionEngine: string, token: string, metadata: IMetadata) => Transaction<boolean, number>;
    redeemLotCollateral: (vaultManager: string, ft: string, reserve: string, collType: string, auctionId: number, lotIndex: number, metadata: IMetadata) => Transaction<boolean, number>;
    redeemUsda: (usdaAmount: number, metadata: IMetadata) => Transaction<boolean, number>;
    startAuction: (vaultId: number, uamount: number, extraDebt: number, vaultDebt: number, discount: number, metadata: IMetadata) => Transaction<boolean, number>;
    toggleAuctionEngineShutdown: (metadata: IMetadata) => Transaction<boolean, number>;
    collateralToken: (token: string, metadata: IMetadata) => Promise<string>;
    discountedAuctionPrice: (priceInCents: number, auctionId: number, metadata: IMetadata) => Promise<ClarityTypes.Response<number, null>>;
    getAuctionById: (id: number, metadata: IMetadata) => Promise<{
        "auction-type": string;
        "collateral-amount": number;
        "collateral-token": string;
        "debt-to-raise": number;
        "discount": number;
        "ends-at": number;
        "id": number;
        "lot-size": number;
        "lots-sold": number;
        "total-collateral-sold": number;
        "total-debt-burned": number;
        "total-debt-raised": number;
        "vault-id": number
    }>;
    getAuctionIds: (metadata: IMetadata) => Promise<ClarityTypes.Response<number[], null>>;
    getAuctionOpen: (auctionId: number, metadata: IMetadata) => Promise<ClarityTypes.Response<boolean, null>>;
    getAuctions: (metadata: IMetadata) => Promise<ClarityTypes.Response<{
        "auction-type": string;
        "collateral-amount": number;
        "collateral-token": string;
        "debt-to-raise": number;
        "discount": number;
        "ends-at": number;
        "id": number;
        "lot-size": number;
        "lots-sold": number;
        "total-collateral-sold": number;
        "total-debt-burned": number;
        "total-debt-raised": number;
        "vault-id": number
    }[], null>>;
    getLastBid: (auctionId: number, lotIndex: number, metadata: IMetadata) => Promise<{
        "collateral-amount": number;
        "collateral-token": string;
        "owner": string;
        "redeemed": boolean;
        "usda": number
    }>;
    getWinningLots: (owner: string, metadata: IMetadata) => Promise<{
        "ids": {
            "auction-id": number;
            "lot-index": number
        }[]
    }>;
    ERRAUCTIONNOTALLOWED: () => Promise<number>;
    ERRAUCTIONNOTCLOSED: () => Promise<number>;
    ERRAUCTIONNOTOPEN: () => Promise<number>;
    ERRBLOCKHEIGHTNOTREACHED: () => Promise<number>;
    ERREMERGENCYSHUTDOWNACTIVATED: () => Promise<number>;
    ERRLOTALREADYREDEEMED: () => Promise<number>;
    ERRLOTNOTOPEN: () => Promise<number>;
    ERRLOTSOLD: () => Promise<number>;
    ERRNOTAUTHORIZED: () => Promise<number>;
    ERRPOORBID: () => Promise<number>;
    ERRTOKENTYPEMISMATCH: () => Promise<number>;
    blocksPerDay: () => Promise<number>;
    auctionEngineShutdownActivated: () => Promise<boolean>;
    auctionIds: () => Promise<number[]>;
    lastAuctionId: () => Promise<number>;
    lotSize: () => Promise<number>;
    removingAuctionId: () => Promise<number>;
    auctions: (key: {
        "id": number
    }) => Promise<{
        "auction-type": string;
        "collateral-amount": number;
        "collateral-token": string;
        "debt-to-raise": number;
        "discount": number;
        "ends-at": number;
        "id": number;
        "lot-size": number;
        "lots-sold": number;
        "total-collateral-sold": number;
        "total-debt-burned": number;
        "total-debt-raised": number;
        "vault-id": number
    } | null>;
    bids: (key: {
        "auction-id": number;
        "lot-index": number
    }) => Promise<{
        "collateral-amount": number;
        "collateral-token": string;
        "owner": string;
        "redeemed": boolean;
        "usda": number
    } | null>;
    redeemingLot: (key: {
        "user": string
    }) => Promise<{
        "auction-id": number;
        "lot-index": number
    } | null>;
    winningLots: (key: {
        "user": string
    }) => Promise<{
        "ids": {
            "auction-id": number;
            "lot-index": number
        }[]
    } | null>;
}
