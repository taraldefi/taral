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

        if (VERBOSE) {
            console.log("Register Exporter Result:", JSON.stringify(registerExporterResult, null, 2));
        }

        // ERR-GENERIC
        expect(registerExporterResult.result).toBeErr(Cl.uint(100));
    }),

    it("Ensure that exporter can register only once with unique wallet id", () => {
        let exporter_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        let exporter_name = "ALPS Logistics";
        let exporter_category = "Merchant";

        let registerExporterResult = simnet.callPublicFn(
            "taral-exporter",
            "register",
            [
                Cl.standardPrincipal(exporter_wallet),
                Cl.stringUtf8(exporter_name),
                Cl.stringUtf8(exporter_category),
            ],
            DEPLOYER
        );

        registerExporterResult = simnet.callPublicFn(
            "taral-exporter",
            "register",
            [
                Cl.standardPrincipal(exporter_wallet),
                Cl.stringUtf8(exporter_name),
                Cl.stringUtf8(exporter_category),
            ],
            DEPLOYER
        );
        

        if (VERBOSE) {
            console.log("Register Exporter Result:", JSON.stringify(registerExporterResult, null, 2));
        }

        // ERR-EXPORTER-ALREADY-REGISTERED
        expect(registerExporterResult.result).toBeErr(Cl.uint(121));
    }),

    it("Ensure that exporter registration is a success", () => {
        let exporter_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        let exporter_name = "ALPS Logistics";
        let exporter_category = "Merchant";

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

        if (VERBOSE) {
            console.log("Register Exporter Result:", JSON.stringify(registerExporterResult, null, 2));
        }

        // ERR-GENERIC
        expect(registerExporterResult.result).toBeOk(Cl.bool(true));
    }),

    it("Ensure that exporter exists after registration", () => {
        let exporter_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        let exporter_name = "ALPS Logistics";
        let exporter_category = "Merchant";

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

        if (VERBOSE) {
            console.log("Register Exporter Result:", JSON.stringify(registerExporterResult, null, 2));
        }

        // ERR-GENERIC
        expect(registerExporterResult.result).toBeOk(Cl.bool(true));
        
        const getExporterResult = simnet.callReadOnlyFn(
            "taral-exporter",
            "get-exporter-profile",
            [
                Cl.standardPrincipal(exporter_wallet),
            ],
            WALLET_1
        );

        if (VERBOSE) {
            console.log("Get Exporter Result:", JSON.stringify(getExporterResult.result, null, 2));
        }

        const expected = Cl.some(Cl.tuple({
            name: Cl.stringUtf8(exporter_name),
            category: Cl.stringUtf8(exporter_category),
            ordersNextAvailId: Cl.uint(0)
        }));

        expect(getExporterResult.result).toStrictEqual(expected);
        
    })
});