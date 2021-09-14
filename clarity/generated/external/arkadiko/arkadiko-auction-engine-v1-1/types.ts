import { Transaction } from "../../../../lib/transaction";
import { ClarityTypes } from "../../../../lib/clarity/types";

// prettier-ignore

export interface ArkadikoAuctionEngineV11Contract {
  bid: (vaultManager: string, oracle: string, collType: string, auctionId: number, lotIndex: number, usda: number) => Transaction<boolean, number>;
  closeAuction: (vaultManager: string, collType: string, auctionId: number) => Transaction<boolean, number>;
  getMinimumCollateralAmount: (oracle: string, auctionId: number) => Transaction<number, number>;
  migrateFunds: (auctionEngine: string, token: string) => Transaction<boolean, number>;
  redeemLotCollateral: (vaultManager: string, ft: string, reserve: string, collType: string, auctionId: number, lotIndex: number) => Transaction<boolean, number>;
  redeemUsda: (usdaAmount: number) => Transaction<boolean, number>;
  startAuction: (vaultId: number, uamount: number, extraDebt: number, vaultDebt: number, discount: number) => Transaction<boolean, number>;
  toggleAuctionEngineShutdown: () => Transaction<boolean, number>;
  discountedAuctionPrice: (priceInCents: number, auctionId: number) => Promise<ClarityTypes.Response<number, null>>;
  getAuctionById: (id: number) => Promise<{
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
  getAuctionIds: () => Promise<ClarityTypes.Response<number[], null>>;
  getAuctionOpen: (auctionId: number) => Promise<ClarityTypes.Response<boolean, null>>;
  getAuctions: () => Promise<ClarityTypes.Response<{
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
  getLastBid: (auctionId: number, lotIndex: number) => Promise<{
    "collateral-amount": number;
  "collateral-token": string;
  "owner": string;
  "redeemed": boolean;
  "usda": number
      }>;
  getWinningLots: (owner: string) => Promise<{
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
