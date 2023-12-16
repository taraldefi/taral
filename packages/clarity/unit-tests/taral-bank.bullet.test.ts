import { Cl } from "@stacks/transactions";
import { expect, it } from "vitest";
import { expectUsdaTransfer } from "./helpers/transfer";
import { fastForwardDays, fastForwardMonths } from "./helpers/time";
import { describeConditional } from "./describe.skip";
import { RUN_TARAL_BANK_BULLET_TESTS } from "./constants";
// import { hashStacksMessage, utf8ToBytes } from "lib-stacks";

const describeOrSkip = describeConditional(RUN_TARAL_BANK_BULLET_TESTS);


describeOrSkip("Taral bank test flows", () => {
    const borrow = 1100;
    const downPayment = 100;
    const purchaseOrderId = 1;
    const financingId = 1;

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

    it("Should be able to create and cancel a purchase order", () => {
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
            "lender-id": Cl.none(),
            "is-canceled": Cl.bool(false),
            "is-completed": Cl.bool(false),
            "has-active-financing": Cl.bool(false),
            "outstanding-amount": Cl.uint(borrow - downPayment),
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
            "seller-id": Cl.standardPrincipal(WALLET_2),
            "accepted-financing-id": Cl.none(),
            "total-amount": Cl.uint(borrow),
            "lender-id": Cl.none(),
            "is-canceled": Cl.bool(true),
            "is-completed": Cl.bool(false),
            "has-active-financing": Cl.bool(false),
            "outstanding-amount": Cl.uint(borrow - downPayment),
            "updated-at": Cl.uint(blockHeight),
            downpayment: Cl.uint(downPayment),
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

    it ("Should not be able to place a financing offer after another one has been placed", () => {
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

        expect(placeFinancingResult.result).toBeOk(Cl.uint(financingId)); // financing id is 1
        expectUsdaTransfer(placeFinancingResult.events[0].data, WALLET_3, DEPLOYER, borrow - downPayment);

        placeFinancingResult = simnet.callPublicFn(
            "taral-bank",
            "finance",
            [
                Cl.uint(purchaseOrderId),
            ], WALLET_4
        );

        expect(placeFinancingResult.result).toBeErr(Cl.uint(122));
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

    it("Should be able to check if the loan has defaulted", () => {

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

        fastForwardDays(6);

        hasPoDefaulted = simnet.callReadOnlyFn(
            "taral-bank",
            "is-po-defaulted",
            [
                Cl.uint(purchaseOrderId),
            ], WALLET_1
        );

        expect(hasPoDefaulted.result).toBeOk(Cl.bool(true));
    }), 

    it("Should be able to pay back the loan", () => {
        ensureRegistrationOfParties();
        checkTrackRecord(0, 0);

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

        // pay back the loan 

        const makePaymentResult = simnet.callPublicFn(
            "taral-bank",
            "make-payment",
            [
                Cl.uint(purchaseOrderId),
            ], WALLET_1
        );

        expect(makePaymentResult.result).toBeOk(Cl.bool(true));
        const transferEvents = makePaymentResult.events.filter((event: any) => event.event === 'ft_transfer_event');
        const interestTransferEvent = transferEvents[0].data as any;

        expect(interestTransferEvent.asset_identifier).toStrictEqual(
            `${DEPLOYER}.usda-token::usda`,
        );
    
        expect(interestTransferEvent.sender).toStrictEqual(WALLET_1);
        expect(interestTransferEvent.recipient).toStrictEqual(`${DEPLOYER}`);
        expect(interestTransferEvent.amount).toStrictEqual(`${(borrow - downPayment) * 3 / 100}`);

        const principalTransferEvent = transferEvents[1].data as any;
        expect(principalTransferEvent.asset_identifier).toStrictEqual(
            `${DEPLOYER}.usda-token::usda`,
        );
    
        expect(principalTransferEvent.sender).toStrictEqual(WALLET_1);
        expect(principalTransferEvent.recipient).toStrictEqual(`${WALLET_3}`);
        expect(principalTransferEvent.amount).toStrictEqual(`${(borrow - downPayment)}`);

        const getPaymentDetails = simnet.callReadOnlyFn(
            "taral-bank",
            "get-payment-details",
            [
                Cl.uint(purchaseOrderId),
            ], WALLET_1
        );

        expect(getPaymentDetails.result).toBeOk(Cl.tuple({
            "payment-left": Cl.uint(0),
        }));

        const getPurchaseOrder = simnet.callReadOnlyFn(
            "taral-bank",
            "get-po-details",
            [Cl.uint(purchaseOrderId)],
            WALLET_1,
        );

        expect(getPurchaseOrder.result).toBeOk(Cl.tuple({
            "total-amount": Cl.uint(borrow),
            "downpayment": Cl.uint(downPayment),
            "outstanding-amount": Cl.uint(0),
            "is-completed": Cl.bool(true),
            "accepted-financing-id": Cl.some(Cl.uint(1)),
            "is-canceled": Cl.bool(false),
            "created-at": Cl.uint(7),

            "completed-successfully": Cl.bool(true),
            "has-active-financing": Cl.bool(true),
            "updated-at": Cl.uint(13402),
            "is-defaulted": Cl.bool(false)
        }));

        const checkPurchaseOrderHealth = simnet.callPublicFn(
            "taral-bank",
            "check-purchase-order-health",
            [
                Cl.uint(purchaseOrderId),
            ], WALLET_1
        );

        expect(checkPurchaseOrderHealth.result).toBeOk(Cl.tuple({
            "is-completed": Cl.bool(true),
            "is-defaulted": Cl.bool(false)
        }));

        checkTrackRecord(1, 0);
    }),

    it("Should produce meaningful errors if not able to pay back the loan", () => {
        ensureRegistrationOfParties();
        checkTrackRecord(0, 0);

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

        expect(placeFinancingResult.result).toBeOk(Cl.uint(financingId)); // financing id is 1
        expectUsdaTransfer(placeFinancingResult.events[0].data, WALLET_3, DEPLOYER, borrow - downPayment);

        const acceptFinancingResult = simnet.callPublicFn(
            "taral-bank",
            "accept-financing",
            [
                Cl.uint(1),
            ], WALLET_1
        );

        console.log(JSON.stringify(acceptFinancingResult, null, 2));
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

        let assetsMap = simnet.getAssetsMap();
        let balanceUsda = assetsMap.get('.usda-token.usda')!;
        let balanceUsdaWallet1 = balanceUsda.get(WALLET_1)!;
        
        // transfer the money out so we can't pay back the loan
        const transferResult = simnet.callPublicFn(
            "usda-token",
            "transfer",
            [
                Cl.uint(balanceUsdaWallet1 - 1000n), // leave a little bit of money in the account
                Cl.standardPrincipal(WALLET_1),
                Cl.standardPrincipal(WALLET_3),
                Cl.none()
            ], WALLET_1
        );

        expect(transferResult.result).toBeOk(Cl.bool(true));

        assetsMap = simnet.getAssetsMap();
        balanceUsda = assetsMap.get('.usda-token.usda')!;
        balanceUsdaWallet1 = balanceUsda.get(WALLET_1)!;
        expect(balanceUsdaWallet1).toBe(1000n);

        let makePaymentResult = simnet.callPublicFn(
            "taral-bank",
            "make-payment",
            [
                Cl.uint(purchaseOrderId),
            ], WALLET_1
        );

        expect(makePaymentResult.result).toBeErr(Cl.uint(1));

        // check purchase order health

        fastForwardDays(6);

        const checkPurchaseOrderHealth = simnet.callPublicFn(
            "taral-bank",
            "check-purchase-order-health",
            [
                Cl.uint(purchaseOrderId),
            ], WALLET_1
        );

        expect(checkPurchaseOrderHealth.result).toBeOk(Cl.tuple({
            "is-completed": Cl.bool(true),
            "is-defaulted": Cl.bool(true)
        }));
        
        makePaymentResult = simnet.callPublicFn(
            "taral-bank",
            "make-payment",
            [
                Cl.uint(purchaseOrderId),
            ], WALLET_1
        );

        expect(makePaymentResult.result).toBeErr(Cl.uint(130)); // cannot make payments anymore, po is defaulted

        checkTrackRecord(0, 1);

        hasPoDefaulted = simnet.callReadOnlyFn(
            "taral-bank",
            "is-po-defaulted",
            [
                Cl.uint(purchaseOrderId),
            ], WALLET_1
        );

        expect(hasPoDefaulted.result).toBeOk(Cl.bool(true));


        const getPurchaseOrder = simnet.callReadOnlyFn(
            "taral-bank",
            "get-po-details",
            [Cl.uint(purchaseOrderId)],
            WALLET_1,
        );

        expect(getPurchaseOrder.result).toBeOk(Cl.tuple({
            "total-amount": Cl.uint(borrow),
            "downpayment": Cl.uint(downPayment),
            "outstanding-amount": Cl.uint(1000),
            "is-completed": Cl.bool(true),
            "accepted-financing-id": Cl.some(Cl.uint(1)),
            "is-canceled": Cl.bool(false),
            "created-at": Cl.uint(7),

            "completed-successfully": Cl.bool(false),
            "has-active-financing": Cl.bool(true),
            "updated-at": Cl.uint(14268),
            "is-defaulted": Cl.bool(true)
        }));
    })

    function ensureRegistrationOfParties() {
        // register the importer
        const registerImporterResult = simnet.callPublicFn(
            "taral-importer",
            "register",
            [
                Cl.standardPrincipal(WALLET_1), // the importer
                Cl.stringUtf8("Importer"),
                Cl.buffer(Buffer.from("Stacks Signed Message: 1")),
                Cl.stringUtf8("Importer")
            ], WALLET_1
        );

        expect(registerImporterResult.result).toBeOk(Cl.uint(1));

        // register the exporter
        const registerExporterResult = simnet.callPublicFn(
            "taral-exporter",
            "register",
            [
                Cl.standardPrincipal(WALLET_2), // the exporter
                Cl.stringUtf8("Exporter"),
                Cl.buffer(Buffer.from("Stacks Signed Message: 1")),
                Cl.stringUtf8("Exporter")
            ], WALLET_2
        );

        expect(registerExporterResult.result).toBeOk(Cl.uint(1));

        // register the lender
        const registerLenderResult = simnet.callPublicFn(
            "taral-lender",
            "register-lender",
            [
                Cl.stringUtf8("Lender"),
                Cl.stringUtf8("Lender"),
                Cl.stringUtf8("Germany")
            ], WALLET_3
        );

        expect(registerLenderResult.result).toBeOk(Cl.bool(true));
    }


    function checkTrackRecord(success: number, failed: number) {
         // get lender track record 
         const getLenderTrackRecord = simnet.callReadOnlyFn(
            "taral-lender",
            "get-track-record",
            [
                Cl.standardPrincipal(WALLET_3),
            ], WALLET_3
        );

        expect(getLenderTrackRecord.result).toBeOk(Cl.tuple({
            "successful-transactions": Cl.uint(success),
            "failed-transactions": Cl.uint(failed),
        }));

        // get exporter track record
        const getExporterTrackRecord = simnet.callReadOnlyFn(
            "taral-exporter",
            "get-track-record",
            [
                Cl.standardPrincipal(WALLET_2),
            ], WALLET_2
        );

        expect(getExporterTrackRecord.result).toBeOk(Cl.tuple({
            "successful-transactions": Cl.uint(success),
            "failed-transactions": Cl.uint(failed),
        }));

        // get importer track record
        const getImporterTrackRecord = simnet.callReadOnlyFn(
            "taral-importer",
            "get-track-record",
            [
                Cl.standardPrincipal(WALLET_1),
            ], WALLET_1
        );

        expect(getImporterTrackRecord.result).toBeOk(Cl.tuple({
            "successful-transactions": Cl.uint(success),
            "failed-transactions": Cl.uint(failed),
        }));
    }
});
