import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;
const DEPLOYER = accounts.get("deployer")!;

const VERBOSE = false;

describe("test exporter flows", () => {
    it("Ensure that inputs are valid", () => {

        let exporter_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        let exporter_name = "ALPS Logistics";
        let exporter_category = "";


        const registerExporterResult = simnet.callPublicFn(
            "taral-exporter",
            "register",
            [
                Cl.standardPrincipal(exporter_wallet),
                Cl.stringUtf8(exporter_name),
                Cl.stringUtf8(exporter_category),
            ],
            DEPLOYER
        );

        console.log("Register Exporter Result:", JSON.stringify(registerExporterResult, null, 2));
        expect(registerExporterResult.result).toBeErr(Cl.uint(100));
    })
});