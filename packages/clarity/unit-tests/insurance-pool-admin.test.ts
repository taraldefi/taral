import { Cl } from "@stacks/transactions";
import { expect, it } from "vitest";
import { describeConditional } from "./describe.skip";
import { RUN_INSURANCE_POOL_ADMIN_TESTS } from "./constants";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;
const describeOrSkip = describeConditional(RUN_INSURANCE_POOL_ADMIN_TESTS);

describeOrSkip("Should test insurance pool", () => {
  it("Should ensure sanity checks", () => {
    const payInResult = simnet.callPublicFn(
      "insurance-pool-admin",
      "payin",
      [Cl.uint(1000000), Cl.uint(1)],
      WALLET_1,
    );

    expect(payInResult.result).toBeOk(Cl.bool(true));
  });
});
