import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;
const WALLET_2 = accounts.get("wallet_2")!;
const DEPLOYER = accounts.get("deployer")!;

describe("test marketplace rbac flows", () => {

    it("Ensure blacklister cannot start an auction", () => {
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
    })
});