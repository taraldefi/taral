import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;
const WALLET_2 = accounts.get("wallet_2")!;
const WALLET_3 = accounts.get("wallet_3")!;
const DEPLOYER = accounts.get("deployer")!;

describe("test marketplace fixed listings flows", () => {

    it("Ensure that we can list an nft for sale as a fixed listing", () => {
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

        var nftTransferEvent = listFixedPriceResult.events[0].data as any;

        expect(nftTransferEvent.asset_identifier).toStrictEqual(`${DEPLOYER}.sip009-nft::sip009-nft`);

        expect(nftTransferEvent.sender, `${WALLET_1}`);
        expect(nftTransferEvent.recipient, `${DEPLOYER}.nft-marketplace`);
        expect(nftTransferEvent.value, 1 as any);

    }),

    it("Ensure that we can cancel a fixed listing", () => {
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

        expect(cancelPriceListingResult.result).toBeOk(Cl.bool(true));

        nftTransferEvent = listFixedPriceResult.events[0].data as any;

        expect(nftTransferEvent.asset_identifier).toStrictEqual(`${DEPLOYER}.sip009-nft::sip009-nft`);

        expect(nftTransferEvent.sender, `${DEPLOYER}.nft-marketplace`);
        expect(nftTransferEvent.recipient, `${WALLET_1}`);
        expect(nftTransferEvent.value, 1 as any);
    }),

    it("Ensure that we cannot cancel an invalid fixed listing", () => {
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

        const cancelPriceListingResult = simnet.callPublicFn(
            "nft-marketplace",
            "cancel-fixed-price-listing",
            [
              Cl.uint(10),
              Cl.contractPrincipal(
                "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
              ),
            ],
            WALLET_1
        );

        expect(cancelPriceListingResult.result).toBeErr(Cl.uint(2000));
    }),

    it("Ensure that only the maker can cancel a fixed listing", () => {
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

        const cancelPriceListingResult = simnet.callPublicFn(
            "nft-marketplace",
            "cancel-fixed-price-listing",
            [
              Cl.uint(0),
              Cl.contractPrincipal(
                "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", "sip009-nft"
              ),
            ],
            WALLET_2
        );

        expect(cancelPriceListingResult.result).toBeErr(Cl.uint(2001));
    })
});