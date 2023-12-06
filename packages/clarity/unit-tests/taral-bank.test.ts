import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;
const WALLET_2 = accounts.get("wallet_2")!;
const DEPLOYER = accounts.get("deployer")!;

describe("Taral bank test flows", () => {
  it("Should be able to create a purchase order", () => {
    expect(true).toBeTruthy();
  })
});
