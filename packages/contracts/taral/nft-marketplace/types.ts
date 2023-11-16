import { Transaction } from "lib-shared";
import { ClarityTypes } from "lib-shared";

export interface NftMarketplaceContract {
  addPrincipalToRole: (
    roleToAdd: number | bigint,
    principalToAdd: string,
  ) => Transaction<boolean, bigint>;
  cancelAuction: (
    auctionId: number | bigint,
    nftAssetContract: string,
  ) => Transaction<boolean, bigint>;
  cancelFixedPriceListing: (
    listingId: number | bigint,
    nftAssetContract: string,
  ) => Transaction<boolean, bigint>;
  endAuction: (
    auctionId: number | bigint,
    nftAssetContract: string,
  ) => Transaction<
    {
      "auction-id": bigint;
      "reserve-price-met": boolean;
    },
    bigint
  >;
  initialize: (
    nameToSet: string,
    symbolToSet: string,
    decimalsToSet: number | bigint,
    initialOwner: string,
  ) => Transaction<boolean, bigint>;
  listFixedPrice: (
    nftAssetContract: string,
    nftAsset: {
      price: bigint;
      "token-id": bigint;
    },
  ) => Transaction<bigint, bigint>;
  pauseContract: () => Transaction<boolean, bigint>;
  placeBid: (
    auctionId: number | bigint,
    bid: number | bigint,
  ) => Transaction<boolean, bigint>;
  purchaseFixedPriceListing: (
    listingId: number | bigint,
    recipient: string,
    nftAssetContract: string,
  ) => Transaction<boolean, bigint>;
  removePrincipalFromRole: (
    roleToRemove: number | bigint,
    principalToRemove: string,
  ) => Transaction<boolean, bigint>;
  resumeContract: () => Transaction<boolean, bigint>;
  setOwner: (newOwner: string) => Transaction<boolean, bigint>;
  setWhitelisted: (
    assetContract: string,
    whitelisted: boolean,
  ) => Transaction<boolean, bigint>;
  startAuction: (
    nftAssetContract: string,
    nftAsset: {
      "end-block": bigint;
      "reserve-price": bigint;
      "start-bid": bigint;
      "start-block": bigint;
      "token-id": bigint;
    },
  ) => Transaction<bigint, bigint>;
  updateBlacklisted: (
    principalToUpdate: string,
    setBlacklisted: boolean,
  ) => Transaction<boolean, bigint>;
  detectRestriction: (
    participant: string,
  ) => Promise<ClarityTypes.Response<bigint, bigint>>;
  getInfo: () => Promise<
    ClarityTypes.Response<
      {
        version: string;
      },
      null
    >
  >;
  getVersion: () => Promise<string>;
  hasRole: (
    roleToCheck: number | bigint,
    principalToCheck: string,
  ) => Promise<boolean>;
  isBlacklisted: (principalToCheck: string) => Promise<boolean>;
  BLACKLISTER_ROLE: () => Promise<bigint>;
  ERR_INVALID_PRINCIPAL: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INVALID_ROLE: () => Promise<ClarityTypes.Response<null, bigint>>;
  OWNER_ROLE: () => Promise<bigint>;
  PERMISSION_DENIED_ERROR: () => Promise<bigint>;
  RESTRICTION_BLACKLIST: () => Promise<bigint>;
  RESTRICTION_NONE: () => Promise<bigint>;
  VERSION: () => Promise<string>;
  defaultErrorValue: () => Promise<ClarityTypes.Response<null, bigint>>;
  errAssetContractNotWhitelisted: () => Promise<
    ClarityTypes.Response<null, bigint>
  >;
  errAuctionEnded: () => Promise<ClarityTypes.Response<null, bigint>>;
  errAuctionNotEnded: () => Promise<ClarityTypes.Response<null, bigint>>;
  errBidTooLow: () => Promise<ClarityTypes.Response<null, bigint>>;
  errBidWithdrawal: () => Promise<ClarityTypes.Response<null, bigint>>;
  errBlockInfo: () => Promise<ClarityTypes.Response<null, bigint>>;
  errContractPaused: () => Promise<ClarityTypes.Response<null, bigint>>;
  errExpiryInPast: () => Promise<ClarityTypes.Response<null, bigint>>;
  errListingExpired: () => Promise<ClarityTypes.Response<null, bigint>>;
  errMakerTakerEqual: () => Promise<ClarityTypes.Response<null, bigint>>;
  errNftAssetMismatch: () => Promise<ClarityTypes.Response<null, bigint>>;
  errNoBids: () => Promise<ClarityTypes.Response<null, bigint>>;
  errPaymentAssetMismatch: () => Promise<ClarityTypes.Response<null, bigint>>;
  errPaymentContractNotWhitelisted: () => Promise<
    ClarityTypes.Response<null, bigint>
  >;
  errPriceZero: () => Promise<ClarityTypes.Response<null, bigint>>;
  errReserveNotMet: () => Promise<ClarityTypes.Response<null, bigint>>;
  errUnauthorised: () => Promise<ClarityTypes.Response<null, bigint>>;
  errUnintendedTaker: () => Promise<ClarityTypes.Response<null, bigint>>;
  errUnknownListing: () => Promise<ClarityTypes.Response<null, bigint>>;
  failedToTransfer: () => Promise<ClarityTypes.Response<null, bigint>>;
  failedToTransferNft: () => Promise<ClarityTypes.Response<null, bigint>>;
  marketplaceStorageError: () => Promise<ClarityTypes.Response<null, bigint>>;
  contractOwner: () => Promise<string>;
  contractPaused: () => Promise<boolean>;
  isInitialized: () => Promise<boolean>;
  blacklist: (key: { account: string }) => Promise<{
    blacklisted: boolean;
  } | null>;
  roles: (key: { account: string; role: bigint }) => Promise<{
    allowed: boolean;
  } | null>;
}
