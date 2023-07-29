import { Transaction } from "lib-shared";
import { ClarityTypes } from "lib-shared";

export interface MarketplaceStorageContract {
  addAuction: (
    auctionId: number | bigint,
    auction: {
      "end-block": bigint;
      "highest-bid": bigint;
      "highest-bidder": string | null;
      maker: string;
      "nft-asset-contract": string;
      "reserve-price": bigint;
      "start-bid": bigint;
      "start-block": bigint;
      "token-id": bigint;
    }
  ) => Transaction<boolean, null>;
  addBid: (
    key: {
      "auction-id": bigint;
      bidder: string;
    },
    amount: number | bigint
  ) => Transaction<boolean, null>;
  addCancelledAuction: (
    auctionId: number | bigint,
    auction: {
      "end-block": bigint;
      "highest-bid": bigint;
      "highest-bidder": string | null;
      maker: string;
      "nft-asset-contract": string;
      "reserve-price": bigint;
      "start-bid": bigint;
      "start-block": bigint;
      "token-id": bigint;
    }
  ) => Transaction<boolean, null>;
  addCancelledFixedPriceListing: (
    listingId: number | bigint,
    listing: {
      maker: string;
      "nft-asset-contract": string;
      price: bigint;
      "token-id": bigint;
    }
  ) => Transaction<boolean, null>;
  addCompletedAuction: (
    auctionId: number | bigint,
    auction: {
      "end-block": bigint;
      "highest-bid": bigint;
      "highest-bidder": string | null;
      maker: string;
      "nft-asset-contract": string;
      "reserve-price": bigint;
      "start-bid": bigint;
      "start-block": bigint;
      "token-id": bigint;
    }
  ) => Transaction<boolean, null>;
  addCompletedFixedPriceListing: (
    listingId: number | bigint,
    listing: {
      maker: string;
      "nft-asset-contract": string;
      price: bigint;
      "token-id": bigint;
    }
  ) => Transaction<boolean, null>;
  addFixedPriceListing: (
    listingId: number | bigint,
    listing: {
      maker: string;
      "nft-asset-contract": string;
      price: bigint;
      "token-id": bigint;
    }
  ) => Transaction<boolean, null>;
  addWithdrawnBid: (
    key: {
      "auction-id": bigint;
      bidder: string;
    },
    amount: number | bigint
  ) => Transaction<boolean, null>;
  deleteAuction: (auctionId: number | bigint) => Transaction<boolean, null>;
  deleteBid: (key: {
    "auction-id": bigint;
    bidder: string;
  }) => Transaction<boolean, null>;
  incrementAuctionNonce: () => Transaction<boolean, null>;
  incrementFixedPriceNonce: () => Transaction<boolean, null>;
  removeFixedPriceListing: (
    listingId: number | bigint
  ) => Transaction<boolean, null>;
  setOwner: (newOwner: string) => Transaction<boolean, null>;
  setWhitelisted: (
    assetContract: string,
    whitelisted: boolean
  ) => Transaction<boolean, null>;
  updateAuction: (
    auctionId: number | bigint,
    auction: {
      "end-block": bigint;
      "highest-bid": bigint;
      "highest-bidder": string | null;
      maker: string;
      "nft-asset-contract": string;
      "reserve-price": bigint;
      "start-bid": bigint;
      "start-block": bigint;
      "token-id": bigint;
    }
  ) => Transaction<boolean, null>;
  getAuction: (auctionId: number | bigint) => Promise<{
    "end-block": bigint;
    "highest-bid": bigint;
    "highest-bidder": string | null;
    maker: string;
    "nft-asset-contract": string;
    "reserve-price": bigint;
    "start-bid": bigint;
    "start-block": bigint;
    "token-id": bigint;
  } | null>;
  getAuctionNonce: () => Promise<bigint>;
  getCompletedAuction: (auctionId: number | bigint) => Promise<{
    "end-block": bigint;
    "highest-bid": bigint;
    "highest-bidder": string | null;
    maker: string;
    "nft-asset-contract": string;
    "reserve-price": bigint;
    "start-bid": bigint;
    "start-block": bigint;
    "token-id": bigint;
  } | null>;
  getFixedPriceListing: (listingId: number | bigint) => Promise<{
    maker: string;
    "nft-asset-contract": string;
    price: bigint;
    "token-id": bigint;
  } | null>;
  getFixedPriceListingNonce: () => Promise<bigint>;
  getPreviousBid: (
    auctionId: number | bigint,
    bidder: string
  ) => Promise<bigint>;
  getWithdrawnBid: (
    auctionId: number | bigint,
    bidder: string
  ) => Promise<bigint | null>;
  isWhitelisted: (assetContract: string) => Promise<boolean>;
  auctionNonce: () => Promise<bigint>;
  contractOwner: () => Promise<string>;
  fixedPriceNonce: () => Promise<bigint>;
  auctions: (key: bigint) => Promise<{
    "end-block": bigint;
    "highest-bid": bigint;
    "highest-bidder": string | null;
    maker: string;
    "nft-asset-contract": string;
    "reserve-price": bigint;
    "start-bid": bigint;
    "start-block": bigint;
    "token-id": bigint;
  } | null>;
  bids: (key: {
    "auction-id": bigint;
    bidder: string;
  }) => Promise<bigint | null>;
  cancelledAuctions: (key: bigint) => Promise<{
    "end-block": bigint;
    "highest-bid": bigint;
    "highest-bidder": string | null;
    maker: string;
    "nft-asset-contract": string;
    "reserve-price": bigint;
    "start-bid": bigint;
    "start-block": bigint;
    "token-id": bigint;
  } | null>;
  cancelledFixedPriceListings: (key: bigint) => Promise<{
    maker: string;
    "nft-asset-contract": string;
    price: bigint;
    "token-id": bigint;
  } | null>;
  completedAuctions: (key: bigint) => Promise<{
    "end-block": bigint;
    "highest-bid": bigint;
    "highest-bidder": string | null;
    maker: string;
    "nft-asset-contract": string;
    "reserve-price": bigint;
    "start-bid": bigint;
    "start-block": bigint;
    "token-id": bigint;
  } | null>;
  completedFixedPriceListings: (key: bigint) => Promise<{
    maker: string;
    "nft-asset-contract": string;
    price: bigint;
    "token-id": bigint;
  } | null>;
  fixedPriceListings: (key: bigint) => Promise<{
    maker: string;
    "nft-asset-contract": string;
    price: bigint;
    "token-id": bigint;
  } | null>;
  whitelistedAssetContracts: (key: string) => Promise<boolean | null>;
  withdrawnBids: (key: {
    "auction-id": bigint;
    bidder: string;
  }) => Promise<bigint | null>;
}
