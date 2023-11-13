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
            console.log("Register importer Result:", JSON.stringify(registerImporterResult, null, 2));
        }

        // ERR-GENERIC
        expect(registerImporterResult.result).toBeErr(Cl.uint(100));
    }),

    it("Ensure that importer can register only once with unique wallet id", () => {
        let importer_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        let importer_name = "ALPS Logistics";
        let importer_category = "Merchant";

        let registerImporterResult = simnet.callPublicFn(
            "taral-importer",
            "register",
            [
                Cl.standardPrincipal(importer_wallet),
                Cl.stringUtf8(importer_name),
                Cl.stringUtf8(importer_category),
            ],
            DEPLOYER
        );

        registerImporterResult = simnet.callPublicFn(
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
            console.log("Register Importer Result:", JSON.stringify(registerImporterResult, null, 2));
        }

        // ERR-IMPORTER-ALREADY-REGISTERED
        expect(registerImporterResult.result).toBeErr(Cl.uint(102));
    }),

    it("Ensure that importer registration is a success", () => {
        let importer_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        let importer_name = "ALPS Logistics";
        let importer_category = "Merchant";

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
            console.log("Register Importer Result:", JSON.stringify(registerImporterResult, null, 2));
        }

        expect(registerImporterResult.result).toBeOk(Cl.bool(true));
    }),

    it("Ensure that importer exists after registration", () => {
        let importer_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        let importer_name = "ALPS Logistics";
        let importer_category = "Merchant";

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
            console.log("Register Importer Result:", JSON.stringify(registerImporterResult, null, 2));
        }

        expect(registerImporterResult.result).toBeOk(Cl.bool(true));

        const getImporterResult = simnet.callReadOnlyFn(
            "taral-importer",
            "get-importer-profile",
            [
                Cl.standardPrincipal(importer_wallet),
            ],
            WALLET_1
        );

        if (VERBOSE) {
            console.log("Get Importer Result:", JSON.stringify(getImporterResult.result, null, 2));
        }

        const expected = Cl.some(Cl.tuple({
            name: Cl.stringUtf8(importer_name),
            category: Cl.stringUtf8(importer_category),
            ordersNextAvailId: Cl.uint(0)
        }));

        expect(getImporterResult.result).toStrictEqual(expected);
    }),

    it("Ensure that next importer id available", () => {
        let importer_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        let importer_name = "ALPS Logistics";
        let importer_category = "Merchant";

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
            console.log("Register Importer Result:", JSON.stringify(registerImporterResult, null, 2));
        }

        // ERR-GENERIC
        expect(registerImporterResult.result).toBeOk(Cl.bool(true));

        //act
        let receipt = simnet.callReadOnlyFn(
            "taral-importer",
            "get-next-importer-id",
            [],
            DEPLOYER
        );
  
        //assert
        expect(receipt.result).toStrictEqual(Cl.uint(10002));
    }),

    it("Ensure order cannot be appended for an unregistered importer", () => {
        let deployer = accounts.get("deployer")!;
        let importer_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        let new_order_id = 2001;

        //act
        const appendOrderResult = simnet.callPublicFn(
            "taral-importer",
            "append-order",
            [Cl.uint(new_order_id), Cl.standardPrincipal(importer_wallet)],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Append Order Result:", JSON.stringify(appendOrderResult, null, 2));
        }

        // ERR-GENERIC
        expect(appendOrderResult.result).toBeErr(Cl.uint(121)); // ERR-IMPORTER-NOT-REGISTERED
    }),

    it("Ensure that adding order is a success", () => {
        let importer_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        let importer_name = "ALPS Logistics";
        let importer_category = "Merchant";
        let new_order_id = 2001;

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
            console.log("Register Importer Result:", JSON.stringify(registerImporterResult, null, 2));
        }

        // ERR-GENERIC
        expect(registerImporterResult.result).toBeOk(Cl.bool(true));

        const appendOrderResult = simnet.callPublicFn(
            "taral-importer",
            "append-order",
            [Cl.uint(new_order_id), Cl.standardPrincipal(importer_wallet)],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Append Order Result:", JSON.stringify(appendOrderResult, null, 2));
        }

        expect(appendOrderResult.result).toBeOk(Cl.bool(true));
    }),

    it("Ensure that order exists after registration", () => {
        let importer_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        let importer_name = "ALPS Logistics";
        let importer_category = "Merchant";
        let new_order_id = 2001;

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
            console.log("Register Importer Result:", JSON.stringify(registerImporterResult, null, 2));
        }

        // ERR-GENERIC
        expect(registerImporterResult.result).toBeOk(Cl.bool(true));

        const appendOrderResult = simnet.callPublicFn(
            "taral-importer",
            "append-order",
            [Cl.uint(new_order_id), Cl.standardPrincipal(importer_wallet)],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Append Order Result:", JSON.stringify(appendOrderResult, null, 2));
        }

        expect(appendOrderResult.result).toBeOk(Cl.bool(true));

        const getimporterOrderResult = simnet.callReadOnlyFn(
            "taral-importer",
            "get-importer-order",
            [Cl.uint(0), Cl.standardPrincipal(importer_wallet)],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Get importer Order Result:", JSON.stringify(getimporterOrderResult.result, null, 2));
        }

        const expected = Cl.some(Cl.tuple({
            orderId: Cl.uint(new_order_id),
        }));

        expect(getimporterOrderResult.result).toStrictEqual(expected);
    }),

    it("Ensure that to get the orders list of specific importers", () => {
        const importer1_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        const importer1_name = "ALPS Logistics";
        const importer1_category = "Merchant";

        const importer2_wallet = "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG";
        const importer2_name = "MX Roadways";
        const importer2_category = "PROJECT";

        const new1_order_id = 2001;
        const new2_order_id = 2002;
        const new3_order_id = 2003;
        const new4_order_id = 2004;

        let importer3_wallet = "ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC";

        let registerimporterResult = simnet.callPublicFn(
            "taral-importer",
            "register",
            [
                Cl.standardPrincipal(importer1_wallet),
                Cl.stringUtf8(importer1_name),
                Cl.stringUtf8(importer1_category),
            ],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Register Importer Result:", JSON.stringify(registerimporterResult, null, 2));
        }

        expect(registerimporterResult.result).toBeOk(Cl.bool(true));

        registerimporterResult = simnet.callPublicFn(
            "taral-importer",
            "register",
            [
                Cl.standardPrincipal(importer2_wallet),
                Cl.stringUtf8(importer2_name),
                Cl.stringUtf8(importer2_category),
            ],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Register Importer Result:", JSON.stringify(registerimporterResult, null, 2));
        }

        expect(registerimporterResult.result).toBeOk(Cl.bool(true));

        let appendOrderResult = simnet.callPublicFn(
            "taral-importer",
            "append-order",
            [Cl.uint(new1_order_id), Cl.standardPrincipal(importer1_wallet)],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Append Order Result:", JSON.stringify(appendOrderResult, null, 2));
        }

        expect(appendOrderResult.result).toBeOk(Cl.bool(true));

        appendOrderResult = simnet.callPublicFn(
            "taral-importer",
            "append-order",
            [Cl.uint(new2_order_id), Cl.standardPrincipal(importer1_wallet)],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Append Order Result:", JSON.stringify(appendOrderResult, null, 2));
        }

        expect(appendOrderResult.result).toBeOk(Cl.bool(true));

        appendOrderResult = simnet.callPublicFn(
            "taral-importer",
            "append-order",
            [Cl.uint(new3_order_id), Cl.standardPrincipal(importer2_wallet)],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Append Order Result:", JSON.stringify(appendOrderResult, null, 2));
        }

        expect(appendOrderResult.result).toBeOk(Cl.bool(true));

        appendOrderResult = simnet.callPublicFn(
            "taral-importer",
            "append-order",
            [Cl.uint(new4_order_id), Cl.standardPrincipal(importer2_wallet)],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Append Order Result:", JSON.stringify(appendOrderResult, null, 2));
        }

        expect(appendOrderResult.result).toBeOk(Cl.bool(true));

        //act
        const importerList = Cl.list([
            Cl.standardPrincipal(importer1_wallet),
            Cl.standardPrincipal(importer1_wallet),
            Cl.standardPrincipal(importer2_wallet),
            Cl.standardPrincipal(importer3_wallet),
        ]);
    
        const orderList = Cl.list([
            Cl.uint(0),
            Cl.uint(1),
            Cl.uint(0),
            Cl.uint(0),
        ]);

        let receipt = simnet.callReadOnlyFn(
            "taral-importer",
            "get-importer-orders",
            [orderList, importerList],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Get importer Orders Result:", JSON.stringify(receipt.result, null, 2));
        }

        const expected = Cl.list([
            Cl.some(Cl.tuple({
                orderId: Cl.uint(new1_order_id),
            })),
            Cl.some(Cl.tuple({
                orderId: Cl.uint(new2_order_id),
            })),
            Cl.some(Cl.tuple({
                orderId: Cl.uint(new3_order_id),
            })),
        ]);

        expect(receipt.result).toStrictEqual(expected);
    })
});