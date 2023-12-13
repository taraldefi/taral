import { Cl } from "@stacks/transactions";
import { expect, it } from "vitest";
import { describeConditional } from "./describe.skip";
import { RUN_DUMMY_ORACLE_TESTS } from "./constants";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;
const VERBOSE = false;

const describeOrSkip = describeConditional(RUN_DUMMY_ORACLE_TESTS);

describeOrSkip("Should test dummy oracle", () => {
  it("Should ensure that the prices are fetched", () => {
    const btcPriceResult = simnet.callReadOnlyFn(
      "dummy-oracle",
      "get-btc-price",
      [],
      WALLET_1,
    );

    if (VERBOSE) {
      console.log("BTC Price Result:", JSON.stringify(btcPriceResult, null, 2));
    }

    expect(btcPriceResult.result).toBeOk(Cl.uint(50000));

    const stxPriceResult = simnet.callReadOnlyFn(
      "dummy-oracle",
      "get-stx-price",
      [],
      WALLET_1,
    );

    if (VERBOSE) {
      console.log("STX Price Result:", JSON.stringify(stxPriceResult, null, 2));
    }

    expect(stxPriceResult.result).toBeOk(Cl.uint(2));
  });
});
