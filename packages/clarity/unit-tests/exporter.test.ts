import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;
const DEPLOYER = accounts.get("deployer")!;

const VERBOSE = false;

describe("Should test exporter flows", () => {
    it("Should ensure that inputs are valid", () => {

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

    it("Should ensure that exporter can register only once with unique wallet id", () => {
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

    it("Should ensure that exporter registration is a success", () => {
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

    it("Should ensure that exporter exists after registration", () => {
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
        
    }),

    it("Should ensure that next exporter id available", () => {
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

        //act
        let receipt = simnet.callReadOnlyFn(
            "taral-exporter",
            "get-next-exporter-id",
            [],
            DEPLOYER
        );
  
        //assert
        expect(receipt.result).toStrictEqual(Cl.uint(10002));
    }),

    it("Should ensure that we can get the exporters profile", () => {
        let exporter1_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        let exporter1_name = "ALPS Logistics";
        let exporter1_category = "Merchant";

        let exporter2_wallet = "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG";
        let exporter2_name = "MX Roadways";
        let exporter2_category = "PROJECT";

        let registerExporterResult = simnet.callPublicFn(
            "taral-exporter",
            "register",
            [
                Cl.standardPrincipal(exporter1_wallet),
                Cl.stringUtf8(exporter1_name),
                Cl.stringUtf8(exporter1_category),
            ],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Register Exporter Result:", JSON.stringify(registerExporterResult, null, 2));
        }

        // ERR-GENERIC
        expect(registerExporterResult.result).toBeOk(Cl.bool(true));


        registerExporterResult = simnet.callPublicFn(
            "taral-exporter",
            "register",
            [
                Cl.standardPrincipal(exporter2_wallet),
                Cl.stringUtf8(exporter2_name),
                Cl.stringUtf8(exporter2_category),
            ],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Register Exporter Result:", JSON.stringify(registerExporterResult, null, 2));
        }

        // ERR-GENERIC
        expect(registerExporterResult.result).toBeOk(Cl.bool(true));

        let exporter3_wallet = "ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC";

        const exporterList = Cl.list([
            Cl.standardPrincipal(exporter1_wallet),
            Cl.standardPrincipal(exporter2_wallet),
            Cl.standardPrincipal(exporter3_wallet),
        ]);

        let receipt = simnet.callReadOnlyFn(
            "taral-exporter",
            "get-exporters",
            [exporterList],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Get Exporters Result:", JSON.stringify(receipt.result, null, 2));
        }

        const expected = Cl.list([
            Cl.some(Cl.tuple({
                name: Cl.stringUtf8(exporter1_name),
                category: Cl.stringUtf8(exporter1_category),
                ordersNextAvailId: Cl.uint(0)
            })),
            Cl.some(Cl.tuple({
                name: Cl.stringUtf8(exporter2_name),
                category: Cl.stringUtf8(exporter2_category),
                ordersNextAvailId: Cl.uint(0)
            })),
            Cl.none() 
        ]);

        expect(receipt.result).toStrictEqual(expected);
    }),

    it("Should ensure that order inputs are valid", () => {
        let exporter_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        let new_order_id = 2001;

        //act
        const appendOrderResult = simnet.callPublicFn(
            "taral-exporter",
            "append-order",
            [Cl.uint(new_order_id), Cl.standardPrincipal(exporter_wallet)],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Append Order Result:", JSON.stringify(appendOrderResult, null, 2));
        }

        expect(appendOrderResult.result).toBeErr(Cl.uint(120)); // ERR-EXPORTER-NOT-REGISTERED
    })

    it("Should ensure that adding order is a success", () => {
        let exporter_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        let exporter_name = "ALPS Logistics";
        let exporter_category = "Merchant";
        let new_order_id = 2001;

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

        const appendOrderResult = simnet.callPublicFn(
            "taral-exporter",
            "append-order",
            [Cl.uint(new_order_id), Cl.standardPrincipal(exporter_wallet)],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Append Order Result:", JSON.stringify(appendOrderResult, null, 2));
        }

        expect(appendOrderResult.result).toBeOk(Cl.bool(true));
    }),

    it("Should ensure that order exists after registration", () => {
        let exporter_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        let exporter_name = "ALPS Logistics";
        let exporter_category = "Merchant";
        let new_order_id = 2001;

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

        const appendOrderResult = simnet.callPublicFn(
            "taral-exporter",
            "append-order",
            [Cl.uint(new_order_id), Cl.standardPrincipal(exporter_wallet)],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Append Order Result:", JSON.stringify(appendOrderResult, null, 2));
        }

        expect(appendOrderResult.result).toBeOk(Cl.bool(true));

        const getExporterOrderResult = simnet.callReadOnlyFn(
            "taral-exporter",
            "get-exporter-order",
            [Cl.uint(0), Cl.standardPrincipal(exporter_wallet)],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Get Exporter Order Result:", JSON.stringify(getExporterOrderResult.result, null, 2));
        }

        const expected = Cl.some(Cl.tuple({
            orderId: Cl.uint(new_order_id),
        }));

        expect(getExporterOrderResult.result).toStrictEqual(expected);
    }),

    it("Should ensure that to get the orders list of specific exporters", () => {
        const exporter1_wallet = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
        const exporter1_name = "ALPS Logistics";
        const exporter1_category = "Merchant";

        const exporter2_wallet = "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG";
        const exporter2_name = "MX Roadways";
        const exporter2_category = "PROJECT";

        const new1_order_id = 2001;
        const new2_order_id = 2002;
        const new3_order_id = 2003;
        const new4_order_id = 2004;

        let exporter3_wallet = "ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC";

        let registerExporterResult = simnet.callPublicFn(
            "taral-exporter",
            "register",
            [
                Cl.standardPrincipal(exporter1_wallet),
                Cl.stringUtf8(exporter1_name),
                Cl.stringUtf8(exporter1_category),
            ],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Register Exporter Result:", JSON.stringify(registerExporterResult, null, 2));
        }

        expect(registerExporterResult.result).toBeOk(Cl.bool(true));

        registerExporterResult = simnet.callPublicFn(
            "taral-exporter",
            "register",
            [
                Cl.standardPrincipal(exporter2_wallet),
                Cl.stringUtf8(exporter2_name),
                Cl.stringUtf8(exporter2_category),
            ],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Register Exporter Result:", JSON.stringify(registerExporterResult, null, 2));
        }

        expect(registerExporterResult.result).toBeOk(Cl.bool(true));

        let appendOrderResult = simnet.callPublicFn(
            "taral-exporter",
            "append-order",
            [Cl.uint(new1_order_id), Cl.standardPrincipal(exporter1_wallet)],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Append Order Result:", JSON.stringify(appendOrderResult, null, 2));
        }

        expect(appendOrderResult.result).toBeOk(Cl.bool(true));

        appendOrderResult = simnet.callPublicFn(
            "taral-exporter",
            "append-order",
            [Cl.uint(new2_order_id), Cl.standardPrincipal(exporter1_wallet)],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Append Order Result:", JSON.stringify(appendOrderResult, null, 2));
        }

        expect(appendOrderResult.result).toBeOk(Cl.bool(true));

        appendOrderResult = simnet.callPublicFn(
            "taral-exporter",
            "append-order",
            [Cl.uint(new3_order_id), Cl.standardPrincipal(exporter2_wallet)],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Append Order Result:", JSON.stringify(appendOrderResult, null, 2));
        }

        expect(appendOrderResult.result).toBeOk(Cl.bool(true));

        appendOrderResult = simnet.callPublicFn(
            "taral-exporter",
            "append-order",
            [Cl.uint(new4_order_id), Cl.standardPrincipal(exporter2_wallet)],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Append Order Result:", JSON.stringify(appendOrderResult, null, 2));
        }

        expect(appendOrderResult.result).toBeOk(Cl.bool(true));

        //act
        const exporterList = Cl.list([
            Cl.standardPrincipal(exporter1_wallet),
            Cl.standardPrincipal(exporter1_wallet),
            Cl.standardPrincipal(exporter2_wallet),
            Cl.standardPrincipal(exporter3_wallet),
        ]);
    
        const orderList = Cl.list([
            Cl.uint(0),
            Cl.uint(1),
            Cl.uint(0),
            Cl.uint(0),
        ]);

        let receipt = simnet.callReadOnlyFn(
            "taral-exporter",
            "get-exporter-orders",
            [orderList, exporterList],
            DEPLOYER
        );

        if (VERBOSE) {
            console.log("Get Exporter Orders Result:", JSON.stringify(receipt.result, null, 2));
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