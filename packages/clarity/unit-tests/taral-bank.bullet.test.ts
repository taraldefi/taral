import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";
import { expectUsdaTransfer } from "./helpers/transfer";
import { fastForwardMonths } from "./helpers/time";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;
const WALLET_2 = accounts.get("wallet_2")!;
const WALLET_3 = accounts.get("wallet_3")!;
const WALLET_4 = accounts.get("wallet_4")!;
const DEPLOYER = accounts.get("deployer")!;

console.log('=========================');
console.log('====== INFORMATION ======');
console.log('=========================');
console.log('Balances', simnet.getAssetsMap());
console.log('WALLET_1', WALLET_1);
console.log('WALLET_2', WALLET_2);
console.log('WALLET_3', WALLET_3);
console.log('DEPLOYER', DEPLOYER);
console.log('=========================');
console.log('=========================');

describe("Taral bank test flows", () => {
    const borrow = 1100;
    const downPayment = 100;
    const purchaseOrderId = 1;

    it("Should not be able to place a financing offer after another one has been accepted", () => {
        const financingId = 1;

        const purchaseOrderResult = simnet.callPublicFn(
            "taral-bank",
            "create-purchase-order",
            [
                Cl.uint(borrow),
                Cl.uint(downPayment),
                Cl.standardPrincipal(WALLET_2) // the seller
            ], WALLET_1
        );

        expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));
        expectUsdaTransfer(purchaseOrderResult.events[0].data, WALLET_1, DEPLOYER, downPayment);

        // place a financing offer
        let placeFinancingResult = simnet.callPublicFn(
            "taral-bank",
            "finance",
            [
                Cl.uint(purchaseOrderId),
                Cl.bool(true)
            ], WALLET_3
        );

        // console.log(JSON.stringify(placeFinancingResult, null, 2));
        expect(placeFinancingResult.result).toBeOk(Cl.uint(financingId)); // financing id is 1
        expectUsdaTransfer(placeFinancingResult.events[0].data, WALLET_3, DEPLOYER, borrow - downPayment);

        const acceptFinancingResult = simnet.callPublicFn(
            "taral-bank",
            "accept-financing",
            [
                Cl.uint(1),
            ], WALLET_1
        );

        expect(acceptFinancingResult.result).toBeOk(Cl.uint(financingId));
        const events = acceptFinancingResult.events.filter((event: any) => event.event === 'ft_transfer_event');
        expectUsdaTransfer(events[0].data, DEPLOYER, WALLET_2, borrow - downPayment);
        expectUsdaTransfer(events[1].data, DEPLOYER, WALLET_2, downPayment);

        // place a financing offer
        placeFinancingResult = simnet.callPublicFn(
            "taral-bank",
            "finance",
            [
                Cl.uint(purchaseOrderId),
                Cl.bool(true)
            ], WALLET_3
        );

        expect(placeFinancingResult.result).toBeErr(Cl.uint(122));
    }),

    it("Should be able to check if the loan has defaulted", () => {
        const financingId = 1;

        const purchaseOrderResult = simnet.callPublicFn(
            "taral-bank",
            "create-purchase-order",
            [
                Cl.uint(borrow),
                Cl.uint(downPayment),
                Cl.standardPrincipal(WALLET_2) // the seller
            ], WALLET_1
        );

        expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));
        expectUsdaTransfer(purchaseOrderResult.events[0].data, WALLET_1, DEPLOYER, downPayment);

        // place a financing offer
        let placeFinancingResult = simnet.callPublicFn(
            "taral-bank",
            "finance",
            [
                Cl.uint(purchaseOrderId),
                Cl.bool(true)
            ], WALLET_3
        );

        // console.log(JSON.stringify(placeFinancingResult, null, 2));
        expect(placeFinancingResult.result).toBeOk(Cl.uint(financingId)); // financing id is 1
        expectUsdaTransfer(placeFinancingResult.events[0].data, WALLET_3, DEPLOYER, borrow - downPayment);

        const acceptFinancingResult = simnet.callPublicFn(
            "taral-bank",
            "accept-financing",
            [
                Cl.uint(1),
            ], WALLET_1
        );

        expect(acceptFinancingResult.result).toBeOk(Cl.uint(financingId));
        const events = acceptFinancingResult.events.filter((event: any) => event.event === 'ft_transfer_event');
        expectUsdaTransfer(events[0].data, DEPLOYER, WALLET_2, borrow - downPayment);
        expectUsdaTransfer(events[1].data, DEPLOYER, WALLET_2, downPayment);

        let hasPoDefaulted = simnet.callReadOnlyFn(
            "taral-bank",
            "is-po-defaulted",
            [
                Cl.uint(purchaseOrderId),
            ], WALLET_1
        );

        expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

        fastForwardMonths(1);

        hasPoDefaulted = simnet.callReadOnlyFn(
            "taral-bank",
            "is-po-defaulted",
            [
                Cl.uint(purchaseOrderId),
            ], WALLET_1
        );

        expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

        fastForwardMonths(1);

        hasPoDefaulted = simnet.callReadOnlyFn(
            "taral-bank",
            "is-po-defaulted",
            [
                Cl.uint(purchaseOrderId),
            ], WALLET_1
        );

        expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

        fastForwardMonths(1);

        hasPoDefaulted = simnet.callReadOnlyFn(
            "taral-bank",
            "is-po-defaulted",
            [
                Cl.uint(purchaseOrderId),
            ], WALLET_1
        );

        expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

        fastForwardMonths(1);

        hasPoDefaulted = simnet.callReadOnlyFn(
            "taral-bank",
            "is-po-defaulted",
            [
                Cl.uint(purchaseOrderId),
            ], WALLET_1
        );

        expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

    })
});
