import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const EXPORTER_WALLET = accounts.get("wallet_8")!;
const EXPORTER_2_WALLET = accounts.get("wallet_9")!;
const WALLET_1 = accounts.get("wallet_1")!;
const WALLET_2 = accounts.get("wallet_2")!;
const DEPLOYER = accounts.get("deployer")!;

describe("Should test taral purchase order flows", () => {
  it("Should check if a user holds TAL tokens", () => {
    const mintTalResult = simnet.callPublicFn(
      "taral-coin",
      "mint",
      [Cl.standardPrincipal(EXPORTER_WALLET), Cl.uint(10)],
      DEPLOYER,
    );

    expect(mintTalResult.result).toBeOk(Cl.bool(true));

    const ftMintEvent = mintTalResult.events[0].data as any;

    expect(ftMintEvent.recipient, `${EXPORTER_WALLET}`);
    expect(ftMintEvent.asset_identifier, `${DEPLOYER}.taral-coin::taral-coin`);
    expect(ftMintEvent.amount, 10 as any);

    let checkIfUserHoldsTalToken = simnet.callPublicFn(
      "taral-purchase-order",
      "check-if-user-holds-tal-token",
      [Cl.standardPrincipal(EXPORTER_WALLET)],
      DEPLOYER,
    );

    expect(checkIfUserHoldsTalToken.result).toBeOk(Cl.bool(true));

    checkIfUserHoldsTalToken = simnet.callPublicFn(
      "taral-purchase-order",
      "check-if-user-holds-tal-token",
      [Cl.standardPrincipal(EXPORTER_2_WALLET)],
      DEPLOYER,
    );

    expect(checkIfUserHoldsTalToken.result).toBeOk(Cl.bool(false));
  }),
    it("Should ensure one is able to create a vault with sufficient collateral", () => {
      const createVaultResult = simnet.callPublicFn(
        "taral-purchase-order",
        "create-vault",
        [Cl.uint(600), Cl.uint(2500000), Cl.uint(400), Cl.uint(30)],
        WALLET_1,
      );

      expect(createVaultResult.result).toBeOk(Cl.uint(1));
    }),
    it("Should ensure one is not able to create a vault with an invalid loan amount", () => {
      const createVaultResult = simnet.callPublicFn(
        "taral-purchase-order",
        "create-vault",
        [Cl.uint(500), Cl.uint(2500000), Cl.uint(0), Cl.uint(30)],
        WALLET_1,
      );

      expect(createVaultResult.result).toBeErr(Cl.uint(404));
    }),
    it("Should ensure one is not able to create a vault with an invalid duration", () => {
      const createVaultResult = simnet.callPublicFn(
        "taral-purchase-order",
        "create-vault",
        [Cl.uint(500), Cl.uint(2500000), Cl.uint(400), Cl.uint(100)],
        WALLET_1,
      );

      expect(createVaultResult.result).toBeErr(Cl.uint(405));
    }),
    // TODO(Doru): check the validity of this test, not sure we test this properly
    it("Should ensure one is not able to liquidate an overcollateralized vault with", () => {
      const createVaultResult = simnet.callPublicFn(
        "taral-purchase-order",
        "create-vault",
        [Cl.uint(500), Cl.uint(2500000), Cl.uint(400), Cl.uint(30)],
        WALLET_1,
      );

      expect(createVaultResult.result).toBeOk(Cl.uint(1));

      const liquidateResult = simnet.callPublicFn(
        "taral-purchase-order",
        "liquidate",
        [Cl.uint(1)],
        WALLET_2,
      );

      expect(liquidateResult.result).toBeErr(Cl.uint(406));
    });
});
