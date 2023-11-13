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
    })
});