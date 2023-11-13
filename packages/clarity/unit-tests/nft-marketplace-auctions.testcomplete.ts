import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;
const WALLET_2 = accounts.get("wallet_2")!;
const WALLET_3 = accounts.get("wallet_3")!;
const DEPLOYER = accounts.get("deployer")!;

describe("test marketplace auction flows", () => {
    it("Ensure that we can start an auction", () => {
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
    }),

    it("Ensure that a bid can be placed on an auction", () => {
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

        for (let i = 0; i < 500; i++) {
            simnet.mineEmptyBlock();
        }

        const placeBidResult = simnet.callPublicFn(
            "nft-marketplace",
            "place-bid",
            [
                Cl.uint(0), // auction id
                Cl.uint(200), // bid amount
            ],
            WALLET_2
        );

        expect(placeBidResult.result).toBeOk(Cl.bool(true));
    }), 

    it("Ensure that an auction can be successfully ended", () => {
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
    }),

    it("Ensure auction can be cancelled by the maker", () => {
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

        placeBidResponse = simnet.callPublicFn(
            "nft-marketplace",
            "place-bid",
            [
              Cl.uint(0), // auction id
              Cl.uint(5000), // bid amount
            ],
            WALLET_3
        );

        expect(placeBidResponse.result).toBeOk(Cl.bool(true));

        var highestBidTransferEvent = startAuctionResult.events[0].data as any;
        var previousBidTransferEvent = startAuctionResult.events[1].data as any;
        
        expect(highestBidTransferEvent.sender, `${WALLET_3}`);
        expect(highestBidTransferEvent.recipient, `${DEPLOYER}.nft-marketplace`);
        expect(highestBidTransferEvent.amount, 5000 as any);
  

        expect(previousBidTransferEvent.sender,`${DEPLOYER}.nft-marketplace`);
        expect(previousBidTransferEvent.recipient, `${WALLET_2}`);
        expect(previousBidTransferEvent.amount, 1200 as any);
    
        let cancelAuctionResult = simnet.callPublicFn(
            "nft-marketplace",
            "cancel-auction",
            [
                Cl.uint(0), // auction id
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
            ],
            WALLET_2
        );

        expect(cancelAuctionResult.result).toBeErr(Cl.uint(2001));

        cancelAuctionResult = simnet.callPublicFn(
            "nft-marketplace",
            "cancel-auction",
            [
                Cl.uint(0), // auction id
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
            ],
            WALLET_3
        );

        expect(cancelAuctionResult.result).toBeErr(Cl.uint(2001));

        cancelAuctionResult = simnet.callPublicFn(
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

        expect(cancelAuctionResult.result).toBeOk(Cl.bool(true));
    }),

    it("Ensure auction can be cancelled by the owner", () => {
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

        placeBidResponse = simnet.callPublicFn(
            "nft-marketplace",
            "place-bid",
            [
              Cl.uint(0), // auction id
              Cl.uint(5000), // bid amount
            ],
            WALLET_3
        );

        expect(placeBidResponse.result).toBeOk(Cl.bool(true));

        var highestBidTransferEvent = startAuctionResult.events[0].data as any;
        var previousBidTransferEvent = startAuctionResult.events[1].data as any;
        
        expect(highestBidTransferEvent.sender, `${WALLET_3}`);
        expect(highestBidTransferEvent.recipient, `${DEPLOYER}.nft-marketplace`);
        expect(highestBidTransferEvent.amount, 5000 as any);
  

        expect(previousBidTransferEvent.sender,`${DEPLOYER}.nft-marketplace`);
        expect(previousBidTransferEvent.recipient, `${WALLET_2}`);
        expect(previousBidTransferEvent.amount, 1200 as any);
    
        let cancelAuctionResult = simnet.callPublicFn(
            "nft-marketplace",
            "cancel-auction",
            [
                Cl.uint(0), // auction id
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
            ],
            WALLET_2
        );

        expect(cancelAuctionResult.result).toBeErr(Cl.uint(2001));

        cancelAuctionResult = simnet.callPublicFn(
            "nft-marketplace",
            "cancel-auction",
            [
                Cl.uint(0), // auction id
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
            ],
            WALLET_3
        );

        expect(cancelAuctionResult.result).toBeErr(Cl.uint(2001));

        cancelAuctionResult = simnet.callPublicFn(
            "nft-marketplace",
            "cancel-auction",
            [
                Cl.uint(0), // auction id
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
            ],
            DEPLOYER
        );

        expect(cancelAuctionResult.result).toBeOk(Cl.bool(true));
    }),

    it("Ensure auction cannot be started if the contract is paused", () => {
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

        const pauseContractResult = simnet.callPublicFn(
            "nft-marketplace",
            "pause-contract",
            [],
            DEPLOYER
        );

        expect(pauseContractResult.result).toBeOk(Cl.bool(true));

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

        expect(startAuctionResult.result).toBeErr(Cl.uint(9000));
    }),

    it("Ensure place bid fails if contract is paused", () => {
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

        const pauseContractResult = simnet.callPublicFn(
            "nft-marketplace",
            "pause-contract",
            [],
            DEPLOYER
        );

        expect(pauseContractResult.result).toBeOk(Cl.bool(true));

        let placeBidResponse = simnet.callPublicFn(
            "nft-marketplace",
            "place-bid",
            [
              Cl.uint(0), // auction id
              Cl.uint(1200), // bid amount
            ],
            WALLET_2
        );

        expect(placeBidResponse.result).toBeErr(Cl.uint(9000));
    }),
    
    it("Ensure cancel auction fails if contract is paused", () => {
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

        placeBidResponse = simnet.callPublicFn(
            "nft-marketplace",
            "place-bid",
            [
              Cl.uint(0), // auction id
              Cl.uint(5000), // bid amount
            ],
            WALLET_3
        );

        expect(placeBidResponse.result).toBeOk(Cl.bool(true));

        var highestBidTransferEvent = startAuctionResult.events[0].data as any;
        var previousBidTransferEvent = startAuctionResult.events[1].data as any;
        
        expect(highestBidTransferEvent.sender, `${WALLET_3}`);
        expect(highestBidTransferEvent.recipient, `${DEPLOYER}.nft-marketplace`);
        expect(highestBidTransferEvent.amount, 5000 as any);


        expect(previousBidTransferEvent.sender,`${DEPLOYER}.nft-marketplace`);
        expect(previousBidTransferEvent.recipient, `${WALLET_2}`);
        expect(previousBidTransferEvent.amount, 1200 as any);

        const pauseContractResult = simnet.callPublicFn(
            "nft-marketplace",
            "pause-contract",
            [],
            DEPLOYER
        );

        expect(pauseContractResult.result).toBeOk(Cl.bool(true));

        let cancelAuctionResult = simnet.callPublicFn(
            "nft-marketplace",
            "cancel-auction",
            [
                Cl.uint(0), // auction id
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
            ],
            WALLET_2
        );

        expect(cancelAuctionResult.result).toBeErr(Cl.uint(9000));
    }),

    it("Ensure cancel auction succeeds if contract is paused but the caller is the owner", () => {
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

        placeBidResponse = simnet.callPublicFn(
            "nft-marketplace",
            "place-bid",
            [
              Cl.uint(0), // auction id
              Cl.uint(5000), // bid amount
            ],
            WALLET_3
        );

        expect(placeBidResponse.result).toBeOk(Cl.bool(true));

        var highestBidTransferEvent = startAuctionResult.events[0].data as any;
        var previousBidTransferEvent = startAuctionResult.events[1].data as any;
        
        expect(highestBidTransferEvent.sender, `${WALLET_3}`);
        expect(highestBidTransferEvent.recipient, `${DEPLOYER}.nft-marketplace`);
        expect(highestBidTransferEvent.amount, 5000 as any);


        expect(previousBidTransferEvent.sender,`${DEPLOYER}.nft-marketplace`);
        expect(previousBidTransferEvent.recipient, `${WALLET_2}`);
        expect(previousBidTransferEvent.amount, 1200 as any);

        const pauseContractResult = simnet.callPublicFn(
            "nft-marketplace",
            "pause-contract",
            [],
            DEPLOYER
        );

        expect(pauseContractResult.result).toBeOk(Cl.bool(true));

        let cancelAuctionResult = simnet.callPublicFn(
            "nft-marketplace",
            "cancel-auction",
            [
                Cl.uint(0), // auction id
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
            ],
            DEPLOYER
        );

        expect(cancelAuctionResult.result).toBeOk(Cl.bool(true));
    }),

    it("Ensure that an auction cannot be successfully ended if the contract is paused", () => {
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

        for (let i = 0; i < 2000; i++) {
            simnet.mineEmptyBlock();
        }

        const pauseContractResult = simnet.callPublicFn(
            "nft-marketplace",
            "pause-contract",
            [],
            DEPLOYER
        );

        expect(pauseContractResult.result).toBeOk(Cl.bool(true));

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

        expect(endAuctionResult.result).toBeErr(Cl.uint(9000));
    }),

    it("Ensure that an auction can be successfully ended if the contract is paused and tx-sender is admin", () => {
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

        for (let i = 0; i < 2000; i++) {
            simnet.mineEmptyBlock();
        }

        const pauseContractResult = simnet.callPublicFn(
            "nft-marketplace",
            "pause-contract",
            [],
            DEPLOYER
        );

        expect(pauseContractResult.result).toBeOk(Cl.bool(true));

        const endAuctionResult = simnet.callPublicFn(
            "nft-marketplace",
            "end-auction",
            [
                Cl.uint(0), // auction id
                Cl.contractPrincipal(
                    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
                ),
            ],
            DEPLOYER
        );

        expect(endAuctionResult.result).toBeOk(Cl.tuple({
            "auction-id": Cl.uint(0),
            "reserve-price-met": Cl.bool(true),
        }));
    })
});