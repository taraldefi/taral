import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;
const DEPLOYER = accounts.get("deployer")!;

const VERBOSE = false;

describe("test importer flows", () => {
    it("Ensure that inputs are valid", () => {
        let importer_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        let importer_name = "ALPS Logistics";
        let importer_category = "";

        const registerImporterResult = simnet.callPublicFn(
            "taral-importer",
            "register",
            [
                Cl.standardPrincipal(importer_wallet),
                Cl.stringUtf8(importer_name),
                Cl.stringUtf8(importer_category),
            ],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Register Exporter Result:", JSON.stringify(registerImporterResult, null, 2));
        }

        // ERR-GENERIC
        expect(registerImporterResult.result).toBeErr(Cl.uint(100));
    })
});