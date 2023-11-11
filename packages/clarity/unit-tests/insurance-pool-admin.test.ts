import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;

describe("test insurance pool", () => {
    it("Sanity check", () => {
        const payInResult = simnet.callPublicFn(
            "insurance-pool-admin",
            "payin",
            [Cl.uint(1000000), Cl.uint(1)],
            WALLET_1
        );

        expect(payInResult.result).toBeOk(Cl.bool(true));
    })
});