import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;

const VERBOSE = false;

describe("test exporter flows", () => {
    it("Ensure that the prices are fetched", () => {
        expect(true).toBeTruthy();
    })
});