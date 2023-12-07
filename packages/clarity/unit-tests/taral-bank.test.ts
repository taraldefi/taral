import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const WALLET_1 = accounts.get("wallet_1")!;
const WALLET_2 = accounts.get("wallet_2")!;
const DEPLOYER = accounts.get("deployer")!;

describe("Taral bank test flows", () => {
  it("Should be able to create a purchase order", () => {
    const borrow = 1100;
    const downPayment = 100;
    const purchaseOrderId = 1;

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

    console.log('Initial block height', initialBlockHeight);

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
        "first-payment-month": Cl.uint(0),
        "first-payment-year": Cl.uint(0),
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
        "first-payment-month": Cl.uint(0),
        "first-payment-year": Cl.uint(0),
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
    })));
  }),

  it("Should be able to place a financing offer", () => {
  })

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
