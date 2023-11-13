import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;
const WALLET_2 = accounts.get("wallet_2")!;
const DEPLOYER = accounts.get("deployer")!;

describe("Should test marketplace rbac flows", () => {

    it("Should ensure blacklister cannot start an auction", () => {
        const setWhitelistedResult = simnet.callPublicFn(
            "nft-marketplace",
            "set-whitelisted",
            [
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
                Cl.bool(true),
            ],
            DEPLOYER
        );

        expect(setWhitelistedResult.result).toBeOk(Cl.bool(true));

        let mint = simnet.callPublicFn(
            "sip009-nft",
            "mint",
            [Cl.standardPrincipal(WALLET_1)],
            DEPLOYER
        );

        expect(mint.result).toBeOk(Cl.uint(1));

        const nftId = simnet.callReadOnlyFn("sip009-nft", "get-last-token-id", [], DEPLOYER);

        expect(nftId.result).toBeOk(Cl.uint(1));

        const updateBlacklisterResult = simnet.callPublicFn(
            "nft-marketplace",
            "update-blacklisted",
            [
                Cl.standardPrincipal(WALLET_1), 
                Cl.bool(true)
            ],
            DEPLOYER
        );

        expect(updateBlacklisterResult.result).toBeOk(Cl.bool(true));

        const startAuctionResult = simnet.callPublicFn(
            "nft-marketplace",
            "start-auction",
            [
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
                Cl.tuple({
                    "token-id": Cl.uint(1),
                    "start-block": Cl.uint(100),
                    "end-block": Cl.uint(1000),
                    "start-bid": Cl.uint(100),
                    "reserve-price": Cl.uint(1000),
                }),
            ],
            WALLET_1
        );

        expect(startAuctionResult.result).toBeErr(Cl.uint(5));
    }),

    it("Should ensure that a bid cannot be placed on an auction by a blacklister", () => {
        const setWhitelistedResult = simnet.callPublicFn(
            "nft-marketplace",
            "set-whitelisted",
            [
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
                Cl.bool(true),
            ],
            DEPLOYER
        );

        expect(setWhitelistedResult.result).toBeOk(Cl.bool(true));

        let mint = simnet.callPublicFn(
            "sip009-nft",
            "mint",
            [Cl.standardPrincipal(WALLET_1)],
            DEPLOYER
        );

        expect(mint.result).toBeOk(Cl.uint(1));

        const nftId = simnet.callReadOnlyFn("sip009-nft", "get-last-token-id", [], DEPLOYER);

        expect(nftId.result).toBeOk(Cl.uint(1));

        const startAuctionResult = simnet.callPublicFn(
            "nft-marketplace",
            "start-auction",
            [
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
                Cl.tuple({
                    "token-id": Cl.uint(1),
                    "start-block": Cl.uint(100),
                    "end-block": Cl.uint(1000),
                    "start-bid": Cl.uint(100),
                    "reserve-price": Cl.uint(1000),
                }),
            ],
            WALLET_1
        );

        expect(startAuctionResult.result).toBeOk(Cl.uint(0));

        const updateBlacklisterResult = simnet.callPublicFn(
            "nft-marketplace",
            "update-blacklisted",
            [
                Cl.standardPrincipal(WALLET_2), 
                Cl.bool(true)
            ],
            DEPLOYER
        );

        expect(updateBlacklisterResult.result).toBeOk(Cl.bool(true));

        for(let i = 0; i < 500; i++) {
            simnet.mineEmptyBlock();
        }

        let placeBidResponse = simnet.callPublicFn(
            "nft-marketplace",
            "place-bid",
            [
              Cl.uint(0), // auction id
              Cl.uint(1200), // bid amount
            ],
            WALLET_2
        );

        expect(placeBidResponse.result).toBeErr(Cl.uint(5));
    }),

    it("Should ensure that an auction cannot be successfully ended by a blacklister", () => {
        const setWhitelistedResult = simnet.callPublicFn(
            "nft-marketplace",
            "set-whitelisted",
            [
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
                Cl.bool(true),
            ],
            DEPLOYER
        );

        expect(setWhitelistedResult.result).toBeOk(Cl.bool(true));

        let mint = simnet.callPublicFn(
            "sip009-nft",
            "mint",
            [Cl.standardPrincipal(WALLET_1)],
            DEPLOYER
        );

        expect(mint.result).toBeOk(Cl.uint(1));

        const nftId = simnet.callReadOnlyFn("sip009-nft", "get-last-token-id", [], DEPLOYER);

        expect(nftId.result).toBeOk(Cl.uint(1));

        const startAuctionResult = simnet.callPublicFn(
            "nft-marketplace",
            "start-auction",
            [
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
                Cl.tuple({
                    "token-id": Cl.uint(1),
                    "start-block": Cl.uint(100),
                    "end-block": Cl.uint(1000),
                    "start-bid": Cl.uint(100),
                    "reserve-price": Cl.uint(1000),
                }),
            ],
            WALLET_1
        );

        expect(startAuctionResult.result).toBeOk(Cl.uint(0));

        var nftTransferEvent = startAuctionResult.events[0].data as any;

        expect(nftTransferEvent.asset_identifier).toStrictEqual(`${DEPLOYER}.sip009-nft::sip009-nft`);

        expect(nftTransferEvent.sender, `${WALLET_1}`);
        expect(nftTransferEvent.recipient, `${DEPLOYER}.nft-marketplace`);
        expect(nftTransferEvent.value, 1 as any);

        const getOwnerResult = simnet.callReadOnlyFn(
            "sip009-nft",
            "get-owner",
            [Cl.uint(1)],
            WALLET_1
        );

        expect(getOwnerResult.result).toBeOk(Cl.some(Cl.contractPrincipal(`${DEPLOYER}`, "nft-marketplace")));

        for (let i = 0; i < 500; i++) {
            simnet.mineEmptyBlock();
        }

        let placeBidResponse = simnet.callPublicFn(
            "nft-marketplace",
            "place-bid",
            [
              Cl.uint(0), // auction id
              Cl.uint(1200), // bid amount
            ],
            WALLET_2
        );

        expect(placeBidResponse.result).toBeOk(Cl.bool(true));

        var stxTransferEvent = startAuctionResult.events[0].data as any;

        expect(stxTransferEvent.sender, `${WALLET_2}`);
        expect(stxTransferEvent.recipient, `${DEPLOYER}.nft-marketplace`);
        expect(stxTransferEvent.amount, 1200 as any);

        for(let i = 0; i < 2000; i++) {
            simnet.mineEmptyBlock();
        }

        const updateBlacklisterResult = simnet.callPublicFn(
            "nft-marketplace",
            "update-blacklisted",
            [
                Cl.standardPrincipal(WALLET_1), 
                Cl.bool(true)
            ],
            DEPLOYER
        );

        expect(updateBlacklisterResult.result).toBeOk(Cl.bool(true));


        const endAuctionResult = simnet.callPublicFn(
            "nft-marketplace",
            "end-auction",
            [
                Cl.uint(0), // auction id
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
            ],
            WALLET_1
        );

        expect(endAuctionResult.result).toBeErr(Cl.uint(5));
    }),

    it("Should ensure auction cannot be cancelled by maker if blacklisted", () => {
        const setWhitelistedResult = simnet.callPublicFn(
            "nft-marketplace",
            "set-whitelisted",
            [
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
                Cl.bool(true),
            ],
            DEPLOYER
        );

        expect(setWhitelistedResult.result).toBeOk(Cl.bool(true));

        let mint = simnet.callPublicFn(
            "sip009-nft",
            "mint",
            [Cl.standardPrincipal(WALLET_1)],
            DEPLOYER
        );

        expect(mint.result).toBeOk(Cl.uint(1));

        const nftId = simnet.callReadOnlyFn("sip009-nft", "get-last-token-id", [], DEPLOYER);

        expect(nftId.result).toBeOk(Cl.uint(1));

        const startAuctionResult = simnet.callPublicFn(
            "nft-marketplace",
            "start-auction",
            [
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
                Cl.tuple({
                    "token-id": Cl.uint(1),
                    "start-block": Cl.uint(100),
                    "end-block": Cl.uint(1000),
                    "start-bid": Cl.uint(100),
                    "reserve-price": Cl.uint(1000),
                }),
            ],
            WALLET_1
        );

        expect(startAuctionResult.result).toBeOk(Cl.uint(0));

        var nftTransferEvent = startAuctionResult.events[0].data as any;

        expect(nftTransferEvent.asset_identifier).toStrictEqual(`${DEPLOYER}.sip009-nft::sip009-nft`);

        expect(nftTransferEvent.sender, `${WALLET_1}`);
        expect(nftTransferEvent.recipient, `${DEPLOYER}.nft-marketplace`);
        expect(nftTransferEvent.value, 1 as any);

        const getOwnerResult = simnet.callReadOnlyFn(
            "sip009-nft",
            "get-owner",
            [Cl.uint(1)],
            WALLET_1
        );

        expect(getOwnerResult.result).toBeOk(Cl.some(Cl.contractPrincipal(`${DEPLOYER}`, "nft-marketplace")));

        for (let i = 0; i < 500; i++) {
            simnet.mineEmptyBlock();
        }

        let placeBidResponse = simnet.callPublicFn(
            "nft-marketplace",
            "place-bid",
            [
              Cl.uint(0), // auction id
              Cl.uint(1200), // bid amount
            ],
            WALLET_2
        );

        expect(placeBidResponse.result).toBeOk(Cl.bool(true));

        var stxTransferEvent = startAuctionResult.events[0].data as any;

        expect(stxTransferEvent.sender, `${WALLET_2}`);
        expect(stxTransferEvent.recipient, `${DEPLOYER}.nft-marketplace`);
        expect(stxTransferEvent.amount, 1200 as any);

        for(let i = 0; i < 2000; i++) {
            simnet.mineEmptyBlock();
        }

        const updateBlacklisterResult = simnet.callPublicFn(
            "nft-marketplace",
            "update-blacklisted",
            [
                Cl.standardPrincipal(WALLET_1), 
                Cl.bool(true)
            ],
            DEPLOYER
        );

        expect(updateBlacklisterResult.result).toBeOk(Cl.bool(true));

        const cancelAuctionResult = simnet.callPublicFn(
            "nft-marketplace",
            "cancel-auction",
            [
                Cl.uint(0), // auction id
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
            ],
            WALLET_1
        );

        expect(cancelAuctionResult.result).toBeErr(Cl.uint(5));
    }),

    it("Should ensure that maker cannot list an nft for sale as a fixed listing if blacklisted", () => {
        const setWhitelistedResult = simnet.callPublicFn(
            "nft-marketplace",
            "set-whitelisted",
            [
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
                Cl.bool(true),
            ],
            DEPLOYER
        );

        expect(setWhitelistedResult.result).toBeOk(Cl.bool(true));

        let mint = simnet.callPublicFn(
            "sip009-nft",
            "mint",
            [Cl.standardPrincipal(WALLET_1)],
            DEPLOYER
        );

        expect(mint.result).toBeOk(Cl.uint(1));

        const nftId = simnet.callReadOnlyFn("sip009-nft", "get-last-token-id", [], DEPLOYER);

        expect(nftId.result).toBeOk(Cl.uint(1));

        const updateBlacklisterResult = simnet.callPublicFn(
            "nft-marketplace",
            "update-blacklisted",
            [
                Cl.standardPrincipal(WALLET_1), 
                Cl.bool(true)
            ],
            DEPLOYER
        );

        expect(updateBlacklisterResult.result).toBeOk(Cl.bool(true));

        const listFixedPriceResult = simnet.callPublicFn(
            "nft-marketplace",
            "list-fixed-price",
            [
              Cl.contractPrincipal(
                "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
              ),
              Cl.tuple({
                "token-id": Cl.uint(1),
                price: Cl.uint(1000),
              }),
            ],
            WALLET_1
        );

        expect(listFixedPriceResult.result).toBeErr(Cl.uint(5));
    }),

    it("Should ensure that maker cannot cancel a fixed listing if blacklisted", () => {
        const setWhitelistedResult = simnet.callPublicFn(
            "nft-marketplace",
            "set-whitelisted",
            [
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
                Cl.bool(true),
            ],
            DEPLOYER
        );

        expect(setWhitelistedResult.result).toBeOk(Cl.bool(true));

        let mint = simnet.callPublicFn(
            "sip009-nft",
            "mint",
            [Cl.standardPrincipal(WALLET_1)],
            DEPLOYER
        );

        expect(mint.result).toBeOk(Cl.uint(1));

        const nftId = simnet.callReadOnlyFn("sip009-nft", "get-last-token-id", [], DEPLOYER);

        expect(nftId.result).toBeOk(Cl.uint(1));

        const listFixedPriceResult = simnet.callPublicFn(
            "nft-marketplace",
            "list-fixed-price",
            [
              Cl.contractPrincipal(
                "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
              ),
              Cl.tuple({
                "token-id": Cl.uint(1),
                price: Cl.uint(1000),
              }),
            ],
            WALLET_1
        );

        expect(listFixedPriceResult.result).toBeOk(Cl.uint(0));

        let nftTransferEvent = listFixedPriceResult.events[0].data as any;

        expect(nftTransferEvent.asset_identifier).toStrictEqual(`${DEPLOYER}.sip009-nft::sip009-nft`);

        expect(nftTransferEvent.sender, `${WALLET_1}`);
        expect(nftTransferEvent.recipient, `${DEPLOYER}.nft-marketplace`);
        expect(nftTransferEvent.value, 1 as any);

        const updateBlacklisterResult = simnet.callPublicFn(
            "nft-marketplace",
            "update-blacklisted",
            [
                Cl.standardPrincipal(WALLET_1), 
                Cl.bool(true)
            ],
            DEPLOYER
        );

        expect(updateBlacklisterResult.result).toBeOk(Cl.bool(true));

        const cancelPriceListingResult = simnet.callPublicFn(
            "nft-marketplace",
            "cancel-fixed-price-listing",
            [
              Cl.uint(0),
              Cl.contractPrincipal(
                "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
              ),
            ],
            WALLET_1
        );

        expect(cancelPriceListingResult.result).toBeErr(Cl.uint(5));
    }),

    it("Should ensure recipient cannot purchase a fixed listing if blacklisted", () => {
        const setWhitelistedResult = simnet.callPublicFn(
            "nft-marketplace",
            "set-whitelisted",
            [
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
                Cl.bool(true),
            ],
            DEPLOYER
        );

        expect(setWhitelistedResult.result).toBeOk(Cl.bool(true));

        let mint = simnet.callPublicFn(
            "sip009-nft",
            "mint",
            [Cl.standardPrincipal(WALLET_1)],
            DEPLOYER
        );

        expect(mint.result).toBeOk(Cl.uint(1));

        const nftId = simnet.callReadOnlyFn("sip009-nft", "get-last-token-id", [], DEPLOYER);

        expect(nftId.result).toBeOk(Cl.uint(1));

        const listFixedPriceResult = simnet.callPublicFn(
            "nft-marketplace",
            "list-fixed-price",
            [
              Cl.contractPrincipal(
                "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
              ),
              Cl.tuple({
                "token-id": Cl.uint(1),
                price: Cl.uint(1000),
              }),
            ],
            WALLET_1
        );

        expect(listFixedPriceResult.result).toBeOk(Cl.uint(0));

        let nftTransferEvent = listFixedPriceResult.events[0].data as any;

        expect(nftTransferEvent.asset_identifier).toStrictEqual(`${DEPLOYER}.sip009-nft::sip009-nft`);

        expect(nftTransferEvent.sender, `${WALLET_1}`);
        expect(nftTransferEvent.recipient, `${DEPLOYER}.nft-marketplace`);
        expect(nftTransferEvent.value, 1 as any);

        const updateBlacklisterResult = simnet.callPublicFn(
            "nft-marketplace",
            "update-blacklisted",
            [
                Cl.standardPrincipal(WALLET_2), 
                Cl.bool(true)
            ],
            DEPLOYER
        );

        expect(updateBlacklisterResult.result).toBeOk(Cl.bool(true));

        const purchaseFixedPriceListingResult = simnet.callPublicFn(
            "nft-marketplace",
            "purchase-fixed-price-listing",
            [
              Cl.uint(0), // valid listing id
              Cl.standardPrincipal(WALLET_2),
              Cl.contractPrincipal(
                "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
              ),
            ],
            WALLET_2
        );

        expect(purchaseFixedPriceListingResult.result).toBeErr(Cl.uint(5));
    })
});