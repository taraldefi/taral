import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

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

      it("Should be able to create a purchase order", () => {
        const purchaseOrderResult = simnet.callPublicFn(
            "taral-bank",
            "create-purchase-order",
            [
                Cl.uint(borrow),
                Cl.uint(downPayment),
                Cl.standardPrincipal(WALLET_2)
            ], WALLET_1
        );

        let initialBlockHeight = simnet.blockHeight;
        let blockHeight = initialBlockHeight;

        expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));

        expectUsdaTransfer(purchaseOrderResult.events[0].data, WALLET_1, DEPLOYER, downPayment);

        const getPurchaseOrder = simnet.callReadOnlyFn(
            "taral-bank",
            "get-purchase-order-by-id",
            [Cl.uint(purchaseOrderId)],
            WALLET_1,
        );

        expect(getPurchaseOrder.result).toStrictEqual(Cl.some(Cl.tuple({
            "borrower-id": Cl.standardPrincipal(WALLET_1),
            "completed-successfully": Cl.bool(false),
            "created-at": Cl.uint(blockHeight),
            "seller-id": Cl.standardPrincipal(WALLET_2),
            "accepted-financing-id": Cl.none(),
            "total-amount": Cl.uint(borrow),
            "payments-left": Cl.uint(0),
            "lender-id": Cl.none(),
            "is-canceled": Cl.bool(false),
            "is-completed": Cl.bool(false),
            "has-active-financing": Cl.bool(false),
            "outstanding-amount": Cl.uint(borrow - downPayment),
            "overpaid-balance": Cl.uint(0),
            "updated-at": Cl.uint(blockHeight),
            downpayment: Cl.uint(downPayment),
            "payments-made": Cl.uint(0),
            "first-payment-block-height": Cl.uint(0)
        })));

        // check if the PO has active financing

        const checkHasActiveFinancingResult = simnet.callReadOnlyFn(
            "taral-bank",
            "has-active-financing",
            [
                Cl.uint(purchaseOrderId),
            ], 
            WALLET_1
        );

        expect(checkHasActiveFinancingResult.result).toStrictEqual(Cl.bool(false));

        const cancelPurchaseOrderResult = simnet.callPublicFn(
            "taral-bank",
            "cancel-purchase-order",
            [
                Cl.uint(purchaseOrderId),
            ], 
            WALLET_1
        );

        expect(cancelPurchaseOrderResult.result).toBeOk(Cl.bool(true));

        expectUsdaTransfer(cancelPurchaseOrderResult.events[0].data, DEPLOYER, WALLET_1, downPayment);

        blockHeight++;

        const getPurchaseOrderAfterCancel = simnet.callReadOnlyFn(
            "taral-bank",
            "get-purchase-order-by-id",
            [Cl.uint(purchaseOrderId)],
            WALLET_1,
        );

        expect(getPurchaseOrderAfterCancel.result).toStrictEqual(Cl.some(Cl.tuple({
            "borrower-id": Cl.standardPrincipal(WALLET_1),
            "completed-successfully": Cl.bool(false),
            "created-at": Cl.uint(initialBlockHeight),
            "seller-id": Cl.standardPrincipal(WALLET_2),
            "accepted-financing-id": Cl.none(),
            "total-amount": Cl.uint(borrow),
            "payments-left": Cl.uint(0),
            "lender-id": Cl.none(),
            "is-canceled": Cl.bool(true),
            "is-completed": Cl.bool(false),
            "has-active-financing": Cl.bool(false),
            "outstanding-amount": Cl.uint(borrow - downPayment),
            "overpaid-balance": Cl.uint(0),
            "updated-at": Cl.uint(blockHeight),
            downpayment: Cl.uint(downPayment),
            "payments-made": Cl.uint(0),
            "first-payment-block-height": Cl.uint(0)
        })));
      }),

      it("Should be able to place and cancel a financing offer", () => {
        const purchaseOrderResult = simnet.callPublicFn(
            "taral-bank",
            "create-purchase-order",
            [
                Cl.uint(borrow),
                Cl.uint(downPayment),
                Cl.standardPrincipal(WALLET_2)
            ], WALLET_1
        );

        let initialBlockHeight = simnet.blockHeight;
        let blockHeight = initialBlockHeight;

        expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));

        expectUsdaTransfer(purchaseOrderResult.events[0].data, WALLET_1, DEPLOYER, downPayment);

        // place a financing offer
        const placeFinancingResult = simnet.callPublicFn(
            "taral-bank",
            "finance",
            [
                Cl.uint(purchaseOrderId),
            ], WALLET_3
        );

        expect(placeFinancingResult.result).toBeOk(Cl.uint(1)); // financing id is 1
        expectUsdaTransfer(placeFinancingResult.events[0].data, WALLET_3, DEPLOYER, borrow - downPayment);

        blockHeight++;

        const cancelFinancingResult = simnet.callPublicFn(
            "taral-bank",
            "cancel-financing",
            [
                Cl.uint(1),
            ], WALLET_3
        );

        expect(cancelFinancingResult.result).toBeOk(Cl.bool(true));
        expectUsdaTransfer(cancelFinancingResult.events[0].data, DEPLOYER, WALLET_3, borrow - downPayment);
      }),

      it("Should be able to place a financing offer and accept it", () => {
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
        const placeFinancingResult = simnet.callPublicFn(
            "taral-bank",
            "finance",
            [
                Cl.uint(purchaseOrderId),
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
      }),

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
            ], WALLET_3
        );

        expect(placeFinancingResult.result).toBeErr(Cl.uint(122));
    }),

    it("Should be able to default the loan", () => {
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

        fastForwardMonths(0);

        let missedLastPayments = simnet.callReadOnlyFn(
            "taral-bank",
            "missed-last-three-payments",
            [
                Cl.uint(purchaseOrderId),
            ], WALLET_1
        );

        expect(missedLastPayments.result).toBeOk(Cl.bool(false));

        fastForwardMonths(1);

        missedLastPayments = simnet.callReadOnlyFn(
            "taral-bank",
            "missed-last-three-payments",
            [
                Cl.uint(purchaseOrderId),
            ], WALLET_1
        );

        expect(missedLastPayments.result).toBeOk(Cl.bool(true));
    })

    function fastForwardMonths(months: number) {
        const blocksPerMonth = 6 * 24 * 31; // 6 blocks per hour, 24 hours per day, 31 days per month
        const blocksToFastForward = months * blocksPerMonth;

        for (let i = 0; i < blocksToFastForward; i++) {
            simnet.mineEmptyBlock();
        }
    }

    /*
     * Helper function to assert that a transfer event is a USDa transfer 
    */
    function expectUsdaTransfer(transferEvent: any, sender: string, recipient: string, amount: any) {

        let senderAddress = sender;
        if (sender === DEPLOYER) {
            senderAddress = `${sender}.taral-bank`;
        }

        let recipientAddress = recipient;
        if (recipient === DEPLOYER) {
            recipientAddress = `${recipient}.taral-bank`;
        }


        expect(transferEvent.asset_identifier).toStrictEqual(
            `${DEPLOYER}.usda-token::usda`,
        );

        expect(transferEvent.sender).toStrictEqual(senderAddress);
        expect(transferEvent.recipient).toStrictEqual(recipientAddress);
        expect(transferEvent.amount).toStrictEqual(`${amount}`);
    }
});
