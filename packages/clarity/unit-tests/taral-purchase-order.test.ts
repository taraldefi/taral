import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const EXPORTER_WALLET = accounts.get("wallet_8")!;
const EXPORTER_2_WALLET = accounts.get("wallet_9")!;
const DEPLOYER = accounts.get("deployer")!;

describe("test taral purchase order flows", () => {

    it("Should check if a user holds TAL tokens", () => {

        const mintTalResult = simnet.callPublicFn(
            "taral-coin",
            "mint",
            [
                Cl.standardPrincipal(EXPORTER_WALLET), 
                Cl.uint(10)
            ],
            DEPLOYER
        );

        expect(mintTalResult.result).toBeOk(Cl.bool(true));

        const ftMintEvent = mintTalResult.events[0].data as any;

        expect(ftMintEvent.recipient, `${EXPORTER_WALLET}`);
        expect(ftMintEvent.asset_identifier, `${DEPLOYER}.taral-coin::taral-coin`);
        expect(ftMintEvent.amount, 10 as any);

        let checkIfUserHoldsTalToken = simnet.callPublicFn(
            "taral-purchase-order-v1",
            "check-if-user-holds-tal-token",
            [
                Cl.standardPrincipal(EXPORTER_WALLET)
            ],
            DEPLOYER
        );

        expect(checkIfUserHoldsTalToken.result).toBeOk(Cl.bool(true)); 

        checkIfUserHoldsTalToken = simnet.callPublicFn(
            "taral-purchase-order-v1",
            "check-if-user-holds-tal-token",
            [
                Cl.standardPrincipal(EXPORTER_2_WALLET)
            ],
            DEPLOYER
        );

        expect(checkIfUserHoldsTalToken.result).toBeOk(Cl.bool(false)); 
    })
});