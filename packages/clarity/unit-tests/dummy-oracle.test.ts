import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;

const VERBOSE = false;

describe("test dummy oracle", () => {
    it("Blank", () => {
        expect(true).toBeTruthy();
    })
    // it("Ensure that the prices are fetched", () => {
    //     const btcPriceResult = simnet.callReadOnlyFn(
    //         "dummy-oracle",
    //         "get-btc-price",
    //         [],
    //         WALLET_1
    //     );

    //     if (VERBOSE) {
    //         console.log("BTC Price Result:", JSON.stringify(btcPriceResult, null, 2));
    //     }

    //     expect(btcPriceResult.result).toBeOk(Cl.uint(50000));

    //     const stxPriceResult = simnet.callReadOnlyFn(
    //         "dummy-oracle",
    //         "get-stx-price",
    //         [],
    //         WALLET_1
    //     );

    //     if (VERBOSE) {
    //         console.log("STX Price Result:", JSON.stringify(stxPriceResult, null, 2));
    //     }

    //     expect(stxPriceResult.result).toBeOk(Cl.uint(2));
    // })
});