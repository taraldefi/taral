import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;
const WALLET_2 = accounts.get("wallet_2")!;
const DEPLOYER = accounts.get("deployer")!;

describe("test purchase order nft flows", () => {
    it("Should be able to MINT and get last token ID", () => {
        const mintResult = simnet.callPublicFn(
            "taral-purchase-order-nft",
            "mint",
            [
                Cl.uint(1), 
                Cl.standardPrincipal(WALLET_1)
            ],
            DEPLOYER
        );

        expect(mintResult.result).toBeOk(Cl.bool(true));

        const tokenIdResult = simnet.callReadOnlyFn(
                "taral-purchase-order-nft",
                "get-last-token-id",
                [],
                DEPLOYER
        );

        expect(tokenIdResult.result).toBeOk(Cl.uint(1));
    }),

    it("should be able to SET and GET token URIs", () => {
        const mintResult = simnet.callPublicFn(
            "taral-purchase-order-nft",
            "mint",
            [
                Cl.uint(1), 
                Cl.standardPrincipal(WALLET_1)
            ],
            DEPLOYER
        );

        expect(mintResult.result).toBeOk(Cl.bool(true));

        const uri = "ipfs://bafybeidntmydwppanpzvvz4clnp5ngbsyd6vd2aheppbnsuogh442s3kyu/";

        const setTokenUriResult = simnet.callPublicFn(
            "taral-purchase-order-nft",
            "set-token-uri",
            [
                Cl.uint(1), 
                Cl.stringAscii(uri)
            ],
            DEPLOYER
        );

        expect(setTokenUriResult.result).toBeOk(Cl.bool(true));

        const getTokenUriResult = simnet.callReadOnlyFn(
            "taral-purchase-order-nft",
            "get-token-uri",
            [
                Cl.uint(1)
            ],
            DEPLOYER
        );

        expect(getTokenUriResult.result).toBeOk(Cl.some(Cl.stringAscii(uri)));
    }),

    it("should be able to transfer NFT from one account to another", () => {
        const mintResult = simnet.callPublicFn(
            "taral-purchase-order-nft",
            "mint",
            [
                Cl.uint(1), 
                Cl.standardPrincipal(WALLET_1)
            ],
            DEPLOYER
        );

        expect(mintResult.result).toBeOk(Cl.bool(true));

        const transferNftResult = simnet.callPublicFn(
            "taral-purchase-order-nft",
            "transfer",
            [
              Cl.uint(1),
              Cl.standardPrincipal(WALLET_1),
              Cl.standardPrincipal(WALLET_2),
            ],
            WALLET_1
        );

        expect(transferNftResult.result).toBeOk(Cl.bool(true));

        var nftTransferEvent = transferNftResult.events[0].data as any;

        expect(nftTransferEvent.asset_identifier).toStrictEqual(`${DEPLOYER}.taral-purchase-order-nft::purchase-order-nft`);

        expect(nftTransferEvent.sender, `${WALLET_1}`);
        expect(nftTransferEvent.recipient, `${WALLET_2}`);
        expect(nftTransferEvent.value, 1 as any);

        const getNewOwnerResult = simnet.callReadOnlyFn(
            "taral-purchase-order-nft",
            "get-owner",
            [Cl.uint(1)],
            DEPLOYER
        );

        expect(getNewOwnerResult.result).toBeOk(Cl.some(Cl.standardPrincipal(WALLET_2)));
    }),

    it("should be able to burn NFT by providing the token ID", () => {
        const mintResult = simnet.callPublicFn(
            "taral-purchase-order-nft",
            "mint",
            [
                Cl.uint(1), 
                Cl.standardPrincipal(WALLET_1)
            ],
            DEPLOYER
        );

        expect(mintResult.result).toBeOk(Cl.bool(true));

        const burnResult = simnet.callPublicFn(
            "taral-purchase-order-nft",
            "burn",
            [
                Cl.uint(1), 
                Cl.standardPrincipal(WALLET_1)
            ],
            DEPLOYER
        );

        expect(burnResult.result).toBeOk(Cl.bool(true));

        const nftBurnEvent = burnResult.events[0].data as any;

        expect(nftBurnEvent.asset_identifier).toStrictEqual(`${DEPLOYER}.taral-purchase-order-nft::purchase-order-nft`);

        expect(nftBurnEvent.sender, `${DEPLOYER}`);
        expect(nftBurnEvent.value, 1 as any);
    }),

    it("should not be able to burn NFT if not admin", () => {
        const mintResult = simnet.callPublicFn(
            "taral-purchase-order-nft",
            "mint",
            [
                Cl.uint(1), 
                Cl.standardPrincipal(WALLET_1)
            ],
            DEPLOYER
        );

        expect(mintResult.result).toBeOk(Cl.bool(true));

        const burnResult = simnet.callPublicFn(
            "taral-purchase-order-nft",
            "burn",
            [
                Cl.uint(1), 
                Cl.standardPrincipal(WALLET_1)
            ],
            WALLET_2
        );

        expect(burnResult.result).toBeErr(Cl.uint(100));
    })
});