import { Cl } from '@stacks/transactions';
import { expect, it } from 'vitest';
import { expectSUSDTTransfer } from './helpers/transfer';
import { fastForwardDays, fastForwardMonths } from './helpers/time';
import { describeConditional } from './describe.skip';
import { RUN_TARAL_BANK_BULLET_TESTS } from './constants';
import { MICRO_MULTIPLIER } from './helpers/currency';
import { wrappedCallPublicFn } from './helpers/wrapped-call-public-fn';
// import { hashStacksMessage, utf8ToBytes } from "lib-stacks";

const describeOrSkip = describeConditional(RUN_TARAL_BANK_BULLET_TESTS);

describeOrSkip('Taral bank test flows', () => {
	const borrow = 1100;
	const downPayment = 100;
	const purchaseOrderId = 1;
	const financingId = 1;

	const accounts = simnet.getAccounts();
	const WALLET_1 = accounts.get('wallet_1')!;
	const WALLET_2 = accounts.get('wallet_2')!;
	const WALLET_3 = accounts.get('wallet_3')!;
	const WALLET_4 = accounts.get('wallet_4')!;
	const DEPLOYER = accounts.get('deployer')!;

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

	it('Should not be able to cancel a purchase order if not the borrower', () => {
		const { parsedTransactionResult: purchaseOrderResult } =
			wrappedCallPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2),
				],
				WALLET_1,
			);

		expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));
		expectSUSDTTransfer(
			purchaseOrderResult.events[0].data,
			WALLET_1,
			DEPLOYER,
			downPayment,
		);

		const { parsedTransactionResult: cancelPurchaseOrderResult } =
			wrappedCallPublicFn(
				'taral-bank',
				'cancel-purchase-order',
				[Cl.uint(purchaseOrderId)],
				WALLET_2,
			);

		expect(cancelPurchaseOrderResult.result).toBeErr(Cl.uint(401));
	}),
		it('Should be able to create and cancel a purchase order', () => {
			const {
				parsedTransactionResult: purchaseOrderResult,
				blockHeight: createdAtBlockHeight,
			} = wrappedCallPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2),
				],
				WALLET_1,
			);

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));

			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			const getPurchaseOrder = simnet.callReadOnlyFn(
				'taral-bank',
				'get-purchase-order-by-id',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(getPurchaseOrder.result).toStrictEqual(
				Cl.some(
					Cl.tuple({
						'borrower-id': Cl.standardPrincipal(WALLET_1),
						'completed-successfully': Cl.bool(false),
						'created-at': Cl.uint(createdAtBlockHeight),
						'seller-id': Cl.standardPrincipal(WALLET_2),
						'accepted-financing-id': Cl.none(),
						'proposed-financing-id': Cl.none(),
						'total-amount': Cl.uint(borrow * MICRO_MULTIPLIER),
						'lender-id': Cl.none(),
						'is-canceled': Cl.bool(false),
						'is-completed': Cl.bool(false),
						'has-active-financing': Cl.bool(false),
						'outstanding-amount': Cl.uint(
							(borrow - downPayment) * MICRO_MULTIPLIER,
						),
						'updated-at': Cl.uint(createdAtBlockHeight),
						downpayment: Cl.uint(downPayment * MICRO_MULTIPLIER),
					}),
				),
			);

			// check if the PO has active financing

			const checkHasActiveFinancingResult = simnet.callReadOnlyFn(
				'taral-bank',
				'has-active-financing',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(checkHasActiveFinancingResult.result).toStrictEqual(
				Cl.bool(false),
			);

			const {
				parsedTransactionResult: cancelPurchaseOrderResult,
				blockHeight: updatedAtBlockHeight,
			} = wrappedCallPublicFn(
				'taral-bank',
				'cancel-purchase-order',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(cancelPurchaseOrderResult.result).toBeOk(Cl.bool(true));

			expectSUSDTTransfer(
				cancelPurchaseOrderResult.events[0].data,
				DEPLOYER,
				WALLET_1,
				downPayment,
			);

			const getPurchaseOrderAfterCancel = simnet.callReadOnlyFn(
				'taral-bank',
				'get-purchase-order-by-id',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(getPurchaseOrderAfterCancel.result).toStrictEqual(
				Cl.some(
					Cl.tuple({
						'borrower-id': Cl.standardPrincipal(WALLET_1),
						'completed-successfully': Cl.bool(false),
						'created-at': Cl.uint(createdAtBlockHeight),
						'seller-id': Cl.standardPrincipal(WALLET_2),
						'accepted-financing-id': Cl.none(),
						'proposed-financing-id': Cl.none(),
						'total-amount': Cl.uint(borrow * MICRO_MULTIPLIER),
						'lender-id': Cl.none(),
						'is-canceled': Cl.bool(true),
						'is-completed': Cl.bool(false),
						'has-active-financing': Cl.bool(false),
						'outstanding-amount': Cl.uint(
							(borrow - downPayment) * MICRO_MULTIPLIER,
						),
						'updated-at': Cl.uint(updatedAtBlockHeight),
						downpayment: Cl.uint(downPayment * MICRO_MULTIPLIER),
					}),
				),
			);
		}),
		it('Should be able to call readonly po details methods', () => {
			let hasPurchaesOrderResult = simnet.callReadOnlyFn(
				'taral-bank',
				'has-active-purchase-order',
				[],
				WALLET_1,
			);

			expect(hasPurchaesOrderResult.result).toBeOk(Cl.bool(false));

			const purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2),
				],
				WALLET_1,
			);

			let initialBlockHeight = simnet.blockHeight;
			let blockHeight = initialBlockHeight;

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));

			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			hasPurchaesOrderResult = simnet.callReadOnlyFn(
				'taral-bank',
				'has-active-purchase-order',
				[],
				WALLET_1,
			);

			expect(hasPurchaesOrderResult.result).toBeOk(Cl.bool(true));

			const getPurchaseOrder = simnet.callReadOnlyFn(
				'taral-bank',
				'get-active-po-details',
				[],
				WALLET_1,
			);

			expect(getPurchaseOrder.result).toBeOk(
				Cl.tuple({
					'total-amount': Cl.uint(borrow * MICRO_MULTIPLIER),
					downpayment: Cl.uint(downPayment * MICRO_MULTIPLIER),
					'outstanding-amount': Cl.uint(
						(borrow - downPayment) * MICRO_MULTIPLIER,
					),
					'is-completed': Cl.bool(false),
					'completed-successfully': Cl.bool(false),
					'accepted-financing-id': Cl.none(),
					'is-canceled': Cl.bool(false),
					'has-active-financing': Cl.bool(false),
					'created-at': Cl.uint(blockHeight),
					'updated-at': Cl.uint(blockHeight),
					'is-defaulted': Cl.bool(false),
				}),
			);
		}),
		it('Should be able to create a purchase order again after canceling', () => {
			let purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2),
				],
				WALLET_1,
			);

			let initialBlockHeight = simnet.blockHeight;
			let blockHeight = initialBlockHeight;

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));

			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			const getPurchaseOrder = simnet.callReadOnlyFn(
				'taral-bank',
				'get-purchase-order-by-id',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(getPurchaseOrder.result).toStrictEqual(
				Cl.some(
					Cl.tuple({
						'borrower-id': Cl.standardPrincipal(WALLET_1),
						'completed-successfully': Cl.bool(false),
						'created-at': Cl.uint(blockHeight),
						'seller-id': Cl.standardPrincipal(WALLET_2),
						'accepted-financing-id': Cl.none(),
						'proposed-financing-id': Cl.none(),
						'total-amount': Cl.uint(borrow * MICRO_MULTIPLIER),
						'lender-id': Cl.none(),
						'is-canceled': Cl.bool(false),
						'is-completed': Cl.bool(false),
						'has-active-financing': Cl.bool(false),
						'outstanding-amount': Cl.uint(
							(borrow - downPayment) * MICRO_MULTIPLIER,
						),
						'updated-at': Cl.uint(blockHeight),
						downpayment: Cl.uint(downPayment * MICRO_MULTIPLIER),
					}),
				),
			);

			// check if the PO has active financing

			const checkHasActiveFinancingResult = simnet.callReadOnlyFn(
				'taral-bank',
				'has-active-financing',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(checkHasActiveFinancingResult.result).toStrictEqual(
				Cl.bool(false),
			);

			const cancelPurchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'cancel-purchase-order',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(cancelPurchaseOrderResult.result).toBeOk(Cl.bool(true));

			expectSUSDTTransfer(
				cancelPurchaseOrderResult.events[0].data,
				DEPLOYER,
				WALLET_1,
				downPayment,
			);

			blockHeight++;

			const getPurchaseOrderAfterCancel = simnet.callReadOnlyFn(
				'taral-bank',
				'get-purchase-order-by-id',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(getPurchaseOrderAfterCancel.result).toStrictEqual(
				Cl.some(
					Cl.tuple({
						'borrower-id': Cl.standardPrincipal(WALLET_1),
						'completed-successfully': Cl.bool(false),
						'created-at': Cl.uint(initialBlockHeight),
						'seller-id': Cl.standardPrincipal(WALLET_2),
						'accepted-financing-id': Cl.none(),
						'proposed-financing-id': Cl.none(),
						'total-amount': Cl.uint(borrow * MICRO_MULTIPLIER),
						'lender-id': Cl.none(),
						'is-canceled': Cl.bool(true),
						'is-completed': Cl.bool(false),
						'has-active-financing': Cl.bool(false),
						'outstanding-amount': Cl.uint(
							(borrow - downPayment) * MICRO_MULTIPLIER,
						),
						'updated-at': Cl.uint(blockHeight),
						downpayment: Cl.uint(downPayment * MICRO_MULTIPLIER),
					}),
				),
			);

			purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2),
				],
				WALLET_1,
			);

			expect(purchaseOrderResult.result).toBeOk(
				Cl.uint(purchaseOrderId + 1),
			);

			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);
		}),
		it('Should not be able to create a purchase order if another one is active', () => {
			let purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2),
				],
				WALLET_1,
			);

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));

			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2),
				],
				WALLET_1,
			);

			expect(purchaseOrderResult.result).toBeErr(Cl.uint(135));
		}),
		it("Should not be able to finance if it's the po borrower", () => {
			const purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2),
				],
				WALLET_1,
			);

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));

			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			// place a financing offer
			const placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(placeFinancingResult.result).toBeErr(Cl.uint(127)); // financing id is 1
		}),
		it("Should not be able to finance if it's the po seller", () => {
			const purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2),
				],
				WALLET_1,
			);

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));

			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			// place a financing offer
			const placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_2,
			);

			expect(placeFinancingResult.result).toBeErr(Cl.uint(129)); // financing id is 1
		}),
		it('Should not be able to place a financing if the po is canceled', () => {
			const purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2),
				],
				WALLET_1,
			);

			let initialBlockHeight = simnet.blockHeight;
			let blockHeight = initialBlockHeight;

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));

			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			const cancelPurchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'cancel-purchase-order',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(cancelPurchaseOrderResult.result).toBeOk(Cl.bool(true));

			// place a financing offer
			const placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_3,
			);

			expect(placeFinancingResult.result).toBeErr(Cl.uint(123)); // financing id is 1
		}),
		it('Should not be able to place a financing if the po has active financing', () => {
			const purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2),
				],
				WALLET_1,
			);

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));

			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			// place a financing offer
			let placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_3,
			);

			expect(placeFinancingResult.result).toBeOk(Cl.uint(financingId)); // financing id is 1

			// place a financing offer
			placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_3,
			);

			expect(placeFinancingResult.result).toBeErr(Cl.uint(122)); // financing id is 1
		}),
		it('Should not be able to cancel a financing offer if already accepted', () => {
			const purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2),
				],
				WALLET_1,
			);

			let initialBlockHeight = simnet.blockHeight;
			let blockHeight = initialBlockHeight;

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));

			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			// place a financing offer
			const placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_3,
			);

			expect(placeFinancingResult.result).toBeOk(Cl.uint(1)); // financing id is 1
			expectSUSDTTransfer(
				placeFinancingResult.events[0].data,
				WALLET_3,
				DEPLOYER,
				borrow - downPayment,
			);

			blockHeight++;

			const acceptFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'accept-financing',
				[],
				WALLET_1,
			);

			expect(acceptFinancingResult.result).toBeOk(Cl.uint(financingId));
			const events = acceptFinancingResult.events.filter(
				(event: any) => event.event === 'ft_transfer_event',
			);
			expectSUSDTTransfer(
				events[0].data,
				DEPLOYER,
				WALLET_2,
				borrow - downPayment,
			);
			expectSUSDTTransfer(
				events[1].data,
				DEPLOYER,
				WALLET_2,
				downPayment,
			);

			const cancelFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'cancel-financing',
				[Cl.uint(1)],
				WALLET_3,
			);

			expect(cancelFinancingResult.result).toBeErr(Cl.uint(124));
		}),
		it('Should be able to place and cancel a financing offer', () => {
			const purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2),
				],
				WALLET_1,
			);

			let initialBlockHeight = simnet.blockHeight;
			let blockHeight = initialBlockHeight;

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));

			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			// place a financing offer
			const placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_3,
			);

			expect(placeFinancingResult.result).toBeOk(Cl.uint(1)); // financing id is 1
			expectSUSDTTransfer(
				placeFinancingResult.events[0].data,
				WALLET_3,
				DEPLOYER,
				borrow - downPayment,
			);

			blockHeight++;

			const cancelFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'cancel-financing',
				[Cl.uint(1)],
				WALLET_3,
			);

			expect(cancelFinancingResult.result).toBeOk(Cl.bool(true));
			expectSUSDTTransfer(
				cancelFinancingResult.events[0].data,
				DEPLOYER,
				WALLET_3,
				borrow - downPayment,
			);
		}),
		it('Should not be able to cancel a financing offer if already refunded', () => {
			const purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2),
				],
				WALLET_1,
			);

			let initialBlockHeight = simnet.blockHeight;
			let blockHeight = initialBlockHeight;

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));

			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			// place a financing offer
			const placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_3,
			);

			expect(placeFinancingResult.result).toBeOk(Cl.uint(1)); // financing id is 1
			expectSUSDTTransfer(
				placeFinancingResult.events[0].data,
				WALLET_3,
				DEPLOYER,
				borrow - downPayment,
			);

			blockHeight++;

			let cancelFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'cancel-financing',
				[Cl.uint(1)],
				WALLET_3,
			);

			expect(cancelFinancingResult.result).toBeOk(Cl.bool(true));
			expectSUSDTTransfer(
				cancelFinancingResult.events[0].data,
				DEPLOYER,
				WALLET_3,
				borrow - downPayment,
			);

			cancelFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'cancel-financing',
				[Cl.uint(1)],
				WALLET_3,
			);

			expect(cancelFinancingResult.result).toBeErr(Cl.uint(116));
		}),
		it('Should not be able to place and cancel a financing offer if not the borrower', () => {
			const purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2),
				],
				WALLET_1,
			);

			let initialBlockHeight = simnet.blockHeight;
			let blockHeight = initialBlockHeight;

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));

			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			// place a financing offer
			const placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_3,
			);

			expect(placeFinancingResult.result).toBeOk(Cl.uint(1)); // financing id is 1
			expectSUSDTTransfer(
				placeFinancingResult.events[0].data,
				WALLET_3,
				DEPLOYER,
				borrow - downPayment,
			);

			blockHeight++;

			const cancelFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'cancel-financing',
				[Cl.uint(1)],
				WALLET_3,
			);

			expect(cancelFinancingResult.result).toBeOk(Cl.bool(true));
			expectSUSDTTransfer(
				cancelFinancingResult.events[0].data,
				DEPLOYER,
				WALLET_3,
				borrow - downPayment,
			);
		}),
		it('Should be able to place a financing offer and accept it', () => {
			const financingId = 1;

			const purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2), // the seller
				],
				WALLET_1,
			);

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));
			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			// place a financing offer
			const placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_3,
			);

			// console.log(JSON.stringify(placeFinancingResult, null, 2));
			expect(placeFinancingResult.result).toBeOk(Cl.uint(financingId)); // financing id is 1
			expectSUSDTTransfer(
				placeFinancingResult.events[0].data,
				WALLET_3,
				DEPLOYER,
				borrow - downPayment,
			);

			const acceptFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'accept-financing',
				[],
				WALLET_1,
			);

			expect(acceptFinancingResult.result).toBeOk(Cl.uint(financingId));
			const events = acceptFinancingResult.events.filter(
				(event: any) => event.event === 'ft_transfer_event',
			);
			expectSUSDTTransfer(
				events[0].data,
				DEPLOYER,
				WALLET_2,
				borrow - downPayment,
			);
			expectSUSDTTransfer(
				events[1].data,
				DEPLOYER,
				WALLET_2,
				downPayment,
			);
		}),
		it('Should not be able to create a purchase order if downpayment is larger than borrow', () => {
			const financingId = 1;

			const purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment + borrow),
					Cl.standardPrincipal(WALLET_2), // the seller
				],
				WALLET_1,
			);

			expect(purchaseOrderResult.result).toBeErr(Cl.uint(125));
		}),
		it('Should not be able to place a financing offer after another one has been placed', () => {
			const financingId = 1;

			const purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2), // the seller
				],
				WALLET_1,
			);

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));
			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			// place a financing offer
			let placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_3,
			);

			expect(placeFinancingResult.result).toBeOk(Cl.uint(financingId)); // financing id is 1
			expectSUSDTTransfer(
				placeFinancingResult.events[0].data,
				WALLET_3,
				DEPLOYER,
				borrow - downPayment,
			);

			placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_4,
			);

			expect(placeFinancingResult.result).toBeErr(Cl.uint(122));
		}),
		it('Should not be able to place a financing offer after another one has been accepted', () => {
			const financingId = 1;

			const purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2), // the seller
				],
				WALLET_1,
			);

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));
			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			// place a financing offer
			let placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_3,
			);

			expect(placeFinancingResult.result).toBeOk(Cl.uint(financingId)); // financing id is 1
			expectSUSDTTransfer(
				placeFinancingResult.events[0].data,
				WALLET_3,
				DEPLOYER,
				borrow - downPayment,
			);

			const acceptFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'accept-financing',
				[],
				WALLET_1,
			);

			expect(acceptFinancingResult.result).toBeOk(Cl.uint(financingId));
			const events = acceptFinancingResult.events.filter(
				(event: any) => event.event === 'ft_transfer_event',
			);
			expectSUSDTTransfer(
				events[0].data,
				DEPLOYER,
				WALLET_2,
				borrow - downPayment,
			);
			expectSUSDTTransfer(
				events[1].data,
				DEPLOYER,
				WALLET_2,
				downPayment,
			);

			// place a financing offer
			placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_3,
			);

			expect(placeFinancingResult.result).toBeErr(Cl.uint(122));
		}),
		it('Should be able to check if the loan has defaulted', () => {
			const purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2), // the seller
				],
				WALLET_1,
			);

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));
			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			// place a financing offer
			let placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_3,
			);

			expect(placeFinancingResult.result).toBeOk(Cl.uint(financingId)); // financing id is 1
			expectSUSDTTransfer(
				placeFinancingResult.events[0].data,
				WALLET_3,
				DEPLOYER,
				borrow - downPayment,
			);

			const acceptFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'accept-financing',
				[],
				WALLET_1,
			);

			expect(acceptFinancingResult.result).toBeOk(Cl.uint(financingId));
			const events = acceptFinancingResult.events.filter(
				(event: any) => event.event === 'ft_transfer_event',
			);
			expectSUSDTTransfer(
				events[0].data,
				DEPLOYER,
				WALLET_2,
				borrow - downPayment,
			);
			expectSUSDTTransfer(
				events[1].data,
				DEPLOYER,
				WALLET_2,
				downPayment,
			);

			let hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			fastForwardMonths(1);

			hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			fastForwardMonths(1);

			hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			fastForwardMonths(1);

			hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			fastForwardDays(6);

			hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(true));
		}),
		it('Should be able to pay back the loan', () => {
			ensureRegistrationOfParties();
			checkTrackRecord(0, 0);

			const {
				parsedTransactionResult: purchaseOrderResult,
				blockHeight: createdAtBlockHeight,
			} = wrappedCallPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2), // the seller
				],
				WALLET_1,
			);

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));
			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			// place a financing offer
			let { parsedTransactionResult: placeFinancingResult } =
				wrappedCallPublicFn(
					'taral-bank',
					'finance',
					[Cl.uint(purchaseOrderId)],
					WALLET_3,
				);

			expect(placeFinancingResult.result).toBeOk(Cl.uint(financingId)); // financing id is 1
			expectSUSDTTransfer(
				placeFinancingResult.events[0].data,
				WALLET_3,
				DEPLOYER,
				borrow - downPayment,
			);

			const { parsedTransactionResult: acceptFinancingResult } =
				wrappedCallPublicFn(
					'taral-bank',
					'accept-financing',
					[],
					WALLET_1,
				);

			expect(acceptFinancingResult.result).toBeOk(Cl.uint(financingId));
			const events = acceptFinancingResult.events.filter(
				(event: any) => event.event === 'ft_transfer_event',
			);
			expectSUSDTTransfer(
				events[0].data,
				DEPLOYER,
				WALLET_2,
				borrow - downPayment,
			);
			expectSUSDTTransfer(
				events[1].data,
				DEPLOYER,
				WALLET_2,
				downPayment,
			);

			let hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			fastForwardMonths(1);

			hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			fastForwardMonths(1);

			hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			fastForwardMonths(1);

			hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			// pay back the loan

			const {
				parsedTransactionResult: makePaymentResult,
				blockHeight: updatedAtHeight,
			} = wrappedCallPublicFn('taral-bank', 'make-payment', [], WALLET_1);

			expect(makePaymentResult.result).toBeOk(Cl.bool(true));
			const transferEvents = makePaymentResult.events.filter(
				(event: any) => event.event === 'ft_transfer_event',
			);
			const interestTransferEvent = transferEvents[0].data as any;

			expect(interestTransferEvent.asset_identifier).toStrictEqual(
				`${DEPLOYER}.token-susdt::bridged-usdt`,
			);

			expect(interestTransferEvent.sender).toStrictEqual(WALLET_1);
			expect(interestTransferEvent.recipient).toStrictEqual(
				`${DEPLOYER}`,
			);
			expect(interestTransferEvent.amount).toStrictEqual(
				`${((borrow - downPayment) * MICRO_MULTIPLIER * 3) / 100}`,
			);

			const principalTransferEvent = transferEvents[1].data as any;
			expect(principalTransferEvent.asset_identifier).toStrictEqual(
				`${DEPLOYER}.token-susdt::bridged-usdt`,
			);

			expect(principalTransferEvent.sender).toStrictEqual(WALLET_1);
			expect(principalTransferEvent.recipient).toStrictEqual(
				`${WALLET_3}`,
			);
			expect(principalTransferEvent.amount).toStrictEqual(
				`${(borrow - downPayment) * MICRO_MULTIPLIER}`,
			);

			const getPaymentDetails = simnet.callReadOnlyFn(
				'taral-bank',
				'get-payment-details',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(getPaymentDetails.result).toBeOk(
				Cl.tuple({
					'payment-left': Cl.uint(0),
				}),
			);

			const getPurchaseOrder = simnet.callReadOnlyFn(
				'taral-bank',
				'get-po-details',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(getPurchaseOrder.result).toBeOk(
				Cl.tuple({
					'total-amount': Cl.uint(borrow * MICRO_MULTIPLIER),
					downpayment: Cl.uint(downPayment * MICRO_MULTIPLIER),
					'outstanding-amount': Cl.uint(0),
					'is-completed': Cl.bool(true),
					'accepted-financing-id': Cl.some(Cl.uint(1)),
					'is-canceled': Cl.bool(false),
					'created-at': Cl.uint(createdAtBlockHeight),

					'completed-successfully': Cl.bool(true),
					'has-active-financing': Cl.bool(true),
					'updated-at': Cl.uint(updatedAtHeight),
					'is-defaulted': Cl.bool(false),
				}),
			);

			const checkPurchaseOrderHealth = simnet.callPublicFn(
				'taral-bank',
				'check-purchase-order-health',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(checkPurchaseOrderHealth.result).toBeOk(
				Cl.tuple({
					'is-completed': Cl.bool(true),
					'is-defaulted': Cl.bool(false),
				}),
			);

			checkTrackRecord(1, 0);
		}),
		it('Should be able to create another purchase order after successfully paying the old one', () => {
			ensureRegistrationOfParties();
			checkTrackRecord(0, 0);

			let {
				parsedTransactionResult: purchaseOrderResult,
				blockHeight: createdAtBlockHeight,
			} = wrappedCallPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2), // the seller
				],
				WALLET_1,
			);

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));
			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			// place a financing offer
			let placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_3,
			);

			expect(placeFinancingResult.result).toBeOk(Cl.uint(financingId)); // financing id is 1
			expectSUSDTTransfer(
				placeFinancingResult.events[0].data,
				WALLET_3,
				DEPLOYER,
				borrow - downPayment,
			);

			const acceptFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'accept-financing',
				[],
				WALLET_1,
			);

			expect(acceptFinancingResult.result).toBeOk(Cl.uint(financingId));
			const events = acceptFinancingResult.events.filter(
				(event: any) => event.event === 'ft_transfer_event',
			);
			expectSUSDTTransfer(
				events[0].data,
				DEPLOYER,
				WALLET_2,
				borrow - downPayment,
			);
			expectSUSDTTransfer(
				events[1].data,
				DEPLOYER,
				WALLET_2,
				downPayment,
			);

			let hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			fastForwardMonths(1);

			hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			fastForwardMonths(1);

			hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			fastForwardMonths(1);

			hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			// pay back the loan

			const {
				parsedTransactionResult: makePaymentResult,
				blockHeight: updatedAtBlockHeight,
			} = wrappedCallPublicFn('taral-bank', 'make-payment', [], WALLET_1);

			expect(makePaymentResult.result).toBeOk(Cl.bool(true));
			const transferEvents = makePaymentResult.events.filter(
				(event: any) => event.event === 'ft_transfer_event',
			);
			const interestTransferEvent = transferEvents[0].data as any;

			expect(interestTransferEvent.asset_identifier).toStrictEqual(
				`${DEPLOYER}.token-susdt::bridged-usdt`,
			);

			expect(interestTransferEvent.sender).toStrictEqual(WALLET_1);
			expect(interestTransferEvent.recipient).toStrictEqual(
				`${DEPLOYER}`,
			);
			expect(interestTransferEvent.amount).toStrictEqual(
				`${((borrow - downPayment) * MICRO_MULTIPLIER * 3) / 100}`,
			);

			const principalTransferEvent = transferEvents[1].data as any;
			expect(principalTransferEvent.asset_identifier).toStrictEqual(
				`${DEPLOYER}.token-susdt::bridged-usdt`,
			);

			expect(principalTransferEvent.sender).toStrictEqual(WALLET_1);
			expect(principalTransferEvent.recipient).toStrictEqual(
				`${WALLET_3}`,
			);
			expect(principalTransferEvent.amount).toStrictEqual(
				`${(borrow - downPayment) * MICRO_MULTIPLIER}`,
			);

			const getPaymentDetails = simnet.callReadOnlyFn(
				'taral-bank',
				'get-payment-details',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(getPaymentDetails.result).toBeOk(
				Cl.tuple({
					'payment-left': Cl.uint(0),
				}),
			);

			const getPurchaseOrder = simnet.callReadOnlyFn(
				'taral-bank',
				'get-po-details',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(getPurchaseOrder.result).toBeOk(
				Cl.tuple({
					'total-amount': Cl.uint(borrow * MICRO_MULTIPLIER),
					downpayment: Cl.uint(downPayment * MICRO_MULTIPLIER),
					'outstanding-amount': Cl.uint(0),
					'is-completed': Cl.bool(true),
					'accepted-financing-id': Cl.some(Cl.uint(1)),
					'is-canceled': Cl.bool(false),
					'created-at': Cl.uint(createdAtBlockHeight),

					'completed-successfully': Cl.bool(true),
					'has-active-financing': Cl.bool(true),
					'updated-at': Cl.uint(updatedAtBlockHeight),
					'is-defaulted': Cl.bool(false),
				}),
			);

			const checkPurchaseOrderHealth = simnet.callPublicFn(
				'taral-bank',
				'check-purchase-order-health',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(checkPurchaseOrderHealth.result).toBeOk(
				Cl.tuple({
					'is-completed': Cl.bool(true),
					'is-defaulted': Cl.bool(false),
				}),
			);

			checkTrackRecord(1, 0);

			purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2), // the seller
				],
				WALLET_1,
			);

			expect(purchaseOrderResult.result).toBeOk(
				Cl.uint(purchaseOrderId + 1),
			);
			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);
		}),
		it('Cannot make payment if already paid back', () => {
			ensureRegistrationOfParties();
			checkTrackRecord(0, 0);

			const purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2), // the seller
				],
				WALLET_1,
			);

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));
			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			// place a financing offer
			let placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_3,
			);

			expect(placeFinancingResult.result).toBeOk(Cl.uint(financingId)); // financing id is 1
			expectSUSDTTransfer(
				placeFinancingResult.events[0].data,
				WALLET_3,
				DEPLOYER,
				borrow - downPayment,
			);

			const acceptFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'accept-financing',
				[],
				WALLET_1,
			);

			expect(acceptFinancingResult.result).toBeOk(Cl.uint(financingId));
			const events = acceptFinancingResult.events.filter(
				(event: any) => event.event === 'ft_transfer_event',
			);
			expectSUSDTTransfer(
				events[0].data,
				DEPLOYER,
				WALLET_2,
				borrow - downPayment,
			);
			expectSUSDTTransfer(
				events[1].data,
				DEPLOYER,
				WALLET_2,
				downPayment,
			);

			let hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			fastForwardMonths(1);

			hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			fastForwardMonths(1);

			hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			fastForwardMonths(1);

			hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			// pay back the loan

			let makePaymentResult = simnet.callPublicFn(
				'taral-bank',
				'make-payment',
				[],
				WALLET_1,
			);

			expect(makePaymentResult.result).toBeOk(Cl.bool(true));
			const transferEvents = makePaymentResult.events.filter(
				(event: any) => event.event === 'ft_transfer_event',
			);
			const interestTransferEvent = transferEvents[0].data as any;

			expect(interestTransferEvent.asset_identifier).toStrictEqual(
				`${DEPLOYER}.token-susdt::bridged-usdt`,
			);

			expect(interestTransferEvent.sender).toStrictEqual(WALLET_1);
			expect(interestTransferEvent.recipient).toStrictEqual(
				`${DEPLOYER}`,
			);
			expect(interestTransferEvent.amount).toStrictEqual(
				`${((borrow - downPayment) * MICRO_MULTIPLIER * 3) / 100}`,
			);

			const principalTransferEvent = transferEvents[1].data as any;
			expect(principalTransferEvent.asset_identifier).toStrictEqual(
				`${DEPLOYER}.token-susdt::bridged-usdt`,
			);

			expect(principalTransferEvent.sender).toStrictEqual(WALLET_1);
			expect(principalTransferEvent.recipient).toStrictEqual(
				`${WALLET_3}`,
			);
			expect(principalTransferEvent.amount).toStrictEqual(
				`${(borrow - downPayment) * MICRO_MULTIPLIER}`,
			);

			const getPaymentDetails = simnet.callReadOnlyFn(
				'taral-bank',
				'get-payment-details',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(getPaymentDetails.result).toBeOk(
				Cl.tuple({
					'payment-left': Cl.uint(0),
				}),
			);

			makePaymentResult = simnet.callPublicFn(
				'taral-bank',
				'make-payment',
				[],
				WALLET_1,
			);

			expect(makePaymentResult.result).toBeErr(Cl.uint(134));
		}),
		it('Should not be able to reject financing if already accepted', () => {
			ensureRegistrationOfParties();
			checkTrackRecord(0, 0);

			const purchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2), // the seller
				],
				WALLET_1,
			);

			expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));
			expectSUSDTTransfer(
				purchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			// place a financing offer
			let placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_3,
			);

			expect(placeFinancingResult.result).toBeOk(Cl.uint(financingId)); // financing id is 1
			expectSUSDTTransfer(
				placeFinancingResult.events[0].data,
				WALLET_3,
				DEPLOYER,
				borrow - downPayment,
			);

			const acceptFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'accept-financing',
				[],
				WALLET_1,
			);

			expect(acceptFinancingResult.result).toBeOk(Cl.uint(financingId));
			const events = acceptFinancingResult.events.filter(
				(event: any) => event.event === 'ft_transfer_event',
			);
			expectSUSDTTransfer(
				events[0].data,
				DEPLOYER,
				WALLET_2,
				borrow - downPayment,
			);
			expectSUSDTTransfer(
				events[1].data,
				DEPLOYER,
				WALLET_2,
				downPayment,
			);

			const rejectFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'reject-financing',
				[],
				WALLET_1,
			);

			expect(rejectFinancingResult.result).toBeErr(Cl.uint(124));
		});

	it('Should produce meaningful errors if not able to pay back the loan', () => {
		ensureRegistrationOfParties();
		checkTrackRecord(0, 0);

		const {
			parsedTransactionResult: purchaseOrderResult,
			blockHeight: createdAtBlockHeight,
		} = wrappedCallPublicFn(
			'taral-bank',
			'create-purchase-order',
			[
				Cl.uint(borrow),
				Cl.uint(downPayment),
				Cl.standardPrincipal(WALLET_2), // the seller
			],
			WALLET_1,
		);

		expect(purchaseOrderResult.result).toBeOk(Cl.uint(purchaseOrderId));
		expectSUSDTTransfer(
			purchaseOrderResult.events[0].data,
			WALLET_1,
			DEPLOYER,
			downPayment,
		);

		// place a financing offer
		let placeFinancingResult = simnet.callPublicFn(
			'taral-bank',
			'finance',
			[Cl.uint(purchaseOrderId)],
			WALLET_3,
		);

		expect(placeFinancingResult.result).toBeOk(Cl.uint(financingId)); // financing id is 1
		expectSUSDTTransfer(
			placeFinancingResult.events[0].data,
			WALLET_3,
			DEPLOYER,
			borrow - downPayment,
		);

		const { parsedTransactionResult: acceptFinancingResult } =
			wrappedCallPublicFn('taral-bank', 'accept-financing', [], WALLET_1);

		expect(acceptFinancingResult.result).toBeOk(Cl.uint(financingId));
		const events = acceptFinancingResult.events.filter(
			(event: any) => event.event === 'ft_transfer_event',
		);
		expectSUSDTTransfer(
			events[0].data,
			DEPLOYER,
			WALLET_2,
			borrow - downPayment,
		);
		expectSUSDTTransfer(events[1].data, DEPLOYER, WALLET_2, downPayment);

		let hasPoDefaulted = simnet.callReadOnlyFn(
			'taral-bank',
			'is-po-defaulted',
			[Cl.uint(purchaseOrderId)],
			WALLET_1,
		);

		expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

		fastForwardMonths(1);

		hasPoDefaulted = simnet.callReadOnlyFn(
			'taral-bank',
			'is-po-defaulted',
			[Cl.uint(purchaseOrderId)],
			WALLET_1,
		);

		expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

		fastForwardMonths(1);

		hasPoDefaulted = simnet.callReadOnlyFn(
			'taral-bank',
			'is-po-defaulted',
			[Cl.uint(purchaseOrderId)],
			WALLET_1,
		);

		expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

		fastForwardMonths(1);

		hasPoDefaulted = simnet.callReadOnlyFn(
			'taral-bank',
			'is-po-defaulted',
			[Cl.uint(purchaseOrderId)],
			WALLET_1,
		);

		expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

		let assetsMap = simnet.getAssetsMap();

		console.log(JSON.stringify(assetsMap, null, 2));

		let balanceSUSDT = assetsMap.get('.token-susdt.bridged-usdt')!;
		let balanceSUSDTWallet1 = balanceSUSDT.get(WALLET_1)!;

		// transfer the money out so we can't pay back the loan
		const transferResult = simnet.callPublicFn(
			'token-susdt',
			'transfer',
			[
				Cl.uint(balanceSUSDTWallet1 - 1000n), // leave a little bit of money in the account
				Cl.standardPrincipal(WALLET_1),
				Cl.standardPrincipal(WALLET_3),
				Cl.none(),
			],
			WALLET_1,
		);

		expect(transferResult.result).toBeOk(Cl.bool(true));

		assetsMap = simnet.getAssetsMap();
		balanceSUSDT = assetsMap.get('.token-susdt.bridged-usdt')!;
		balanceSUSDTWallet1 = balanceSUSDT.get(WALLET_1)!;
		expect(balanceSUSDTWallet1).toBe(1000n);

		const { parsedTransactionResult: makeFirstPaymentResult } =
			wrappedCallPublicFn('taral-bank', 'make-payment', [], WALLET_1);

		expect(makeFirstPaymentResult.result).toBeErr(Cl.uint(1));

		// check purchase order health

		fastForwardDays(6);

		const {
			parsedTransactionResult: checkPurchaseOrderHealth,
			blockHeight: updatedAtBlockHeight,
		} = wrappedCallPublicFn(
			'taral-bank',
			'check-purchase-order-health',
			[Cl.uint(purchaseOrderId)],
			WALLET_1,
		);

		expect(checkPurchaseOrderHealth.result).toBeOk(
			Cl.tuple({
				'is-completed': Cl.bool(true),
				'is-defaulted': Cl.bool(true),
			}),
		);

		const { parsedTransactionResult: makeSecondPaymentResult } =
			wrappedCallPublicFn('taral-bank', 'make-payment', [], WALLET_1);

		expect(makeSecondPaymentResult.result).toBeErr(Cl.uint(130)); // cannot make payments anymore, po is defaulted

		checkTrackRecord(0, 1);

		hasPoDefaulted = simnet.callReadOnlyFn(
			'taral-bank',
			'is-po-defaulted',
			[Cl.uint(purchaseOrderId)],
			WALLET_1,
		);

		expect(hasPoDefaulted.result).toBeOk(Cl.bool(true));

		const getPurchaseOrder = simnet.callReadOnlyFn(
			'taral-bank',
			'get-po-details',
			[Cl.uint(purchaseOrderId)],
			WALLET_1,
		);

		expect(getPurchaseOrder.result).toBeOk(
			Cl.tuple({
				'total-amount': Cl.uint(borrow * MICRO_MULTIPLIER),
				downpayment: Cl.uint(downPayment * MICRO_MULTIPLIER),
				'outstanding-amount': Cl.uint(1000 * MICRO_MULTIPLIER),
				'is-completed': Cl.bool(true),
				'accepted-financing-id': Cl.some(Cl.uint(1)),
				'is-canceled': Cl.bool(false),
				'created-at': Cl.uint(createdAtBlockHeight),

				'completed-successfully': Cl.bool(false),
				'has-active-financing': Cl.bool(true),
				'updated-at': Cl.uint(updatedAtBlockHeight),
				'is-defaulted': Cl.bool(true),
			}),
		);
	}),
		it('Should not be able to create a new purchase order if the previous one has defaulted', () => {
			ensureRegistrationOfParties();
			checkTrackRecord(0, 0);

			const {
				parsedTransactionResult: firstPurchaseOrderResult,
				blockHeight: createdAtBlockHeight,
			} = wrappedCallPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2), // the seller
				],
				WALLET_1,
			);

			expect(firstPurchaseOrderResult.result).toBeOk(
				Cl.uint(purchaseOrderId),
			);
			expectSUSDTTransfer(
				firstPurchaseOrderResult.events[0].data,
				WALLET_1,
				DEPLOYER,
				downPayment,
			);

			// place a financing offer
			let placeFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'finance',
				[Cl.uint(purchaseOrderId)],
				WALLET_3,
			);

			expect(placeFinancingResult.result).toBeOk(Cl.uint(financingId)); // financing id is 1
			expectSUSDTTransfer(
				placeFinancingResult.events[0].data,
				WALLET_3,
				DEPLOYER,
				borrow - downPayment,
			);

			const acceptFinancingResult = simnet.callPublicFn(
				'taral-bank',
				'accept-financing',
				[],
				WALLET_1,
			);

			expect(acceptFinancingResult.result).toBeOk(Cl.uint(financingId));
			const events = acceptFinancingResult.events.filter(
				(event: any) => event.event === 'ft_transfer_event',
			);
			expectSUSDTTransfer(
				events[0].data,
				DEPLOYER,
				WALLET_2,
				borrow - downPayment,
			);
			expectSUSDTTransfer(
				events[1].data,
				DEPLOYER,
				WALLET_2,
				downPayment,
			);

			let hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			fastForwardMonths(1);

			hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			fastForwardMonths(1);

			hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			fastForwardMonths(1);

			hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(false));

			let assetsMap = simnet.getAssetsMap();

			console.log(JSON.stringify(assetsMap, null, 2));

			let balanceSUSDT = assetsMap.get('.token-susdt.bridged-usdt')!;
			let balanceSUSDTWallet1 = balanceSUSDT.get(WALLET_1)!;

			// transfer the money out so we can't pay back the loan
			const transferResult = simnet.callPublicFn(
				'token-susdt',
				'transfer',
				[
					Cl.uint(balanceSUSDTWallet1 - 1000n), // leave a little bit of money in the account
					Cl.standardPrincipal(WALLET_1),
					Cl.standardPrincipal(WALLET_3),
					Cl.none(),
				],
				WALLET_1,
			);

			expect(transferResult.result).toBeOk(Cl.bool(true));

			assetsMap = simnet.getAssetsMap();
			balanceSUSDT = assetsMap.get('.token-susdt.bridged-usdt')!;
			balanceSUSDTWallet1 = balanceSUSDT.get(WALLET_1)!;
			expect(balanceSUSDTWallet1).toBe(1000n);

			let makePaymentResult = simnet.callPublicFn(
				'taral-bank',
				'make-payment',
				[],
				WALLET_1,
			);

			expect(makePaymentResult.result).toBeErr(Cl.uint(1));

			// check purchase order health

			fastForwardDays(6);

			const {
				parsedTransactionResult: checkPurchaseOrderHealth,
				blockHeight: updatedAtBlockHeight,
			} = wrappedCallPublicFn(
				'taral-bank',
				'check-purchase-order-health',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(checkPurchaseOrderHealth.result).toBeOk(
				Cl.tuple({
					'is-completed': Cl.bool(true),
					'is-defaulted': Cl.bool(true),
				}),
			);

			makePaymentResult = simnet.callPublicFn(
				'taral-bank',
				'make-payment',
				[],
				WALLET_1,
			);

			expect(makePaymentResult.result).toBeErr(Cl.uint(130)); // cannot make payments anymore, po is defaulted

			checkTrackRecord(0, 1);

			hasPoDefaulted = simnet.callReadOnlyFn(
				'taral-bank',
				'is-po-defaulted',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(hasPoDefaulted.result).toBeOk(Cl.bool(true));

			const getPurchaseOrder = simnet.callReadOnlyFn(
				'taral-bank',
				'get-po-details',
				[Cl.uint(purchaseOrderId)],
				WALLET_1,
			);

			expect(getPurchaseOrder.result).toBeOk(
				Cl.tuple({
					'total-amount': Cl.uint(borrow * MICRO_MULTIPLIER),
					downpayment: Cl.uint(downPayment * MICRO_MULTIPLIER),
					'outstanding-amount': Cl.uint(1000 * MICRO_MULTIPLIER),
					'is-completed': Cl.bool(true),
					'accepted-financing-id': Cl.some(Cl.uint(1)),
					'is-canceled': Cl.bool(false),
					'created-at': Cl.uint(createdAtBlockHeight),

					'completed-successfully': Cl.bool(false),
					'has-active-financing': Cl.bool(true),
					'updated-at': Cl.uint(updatedAtBlockHeight),
					'is-defaulted': Cl.bool(true),
				}),
			);

			const secondPurchaseOrderResult = simnet.callPublicFn(
				'taral-bank',
				'create-purchase-order',
				[
					Cl.uint(borrow),
					Cl.uint(downPayment),
					Cl.standardPrincipal(WALLET_2), // the seller
				],
				WALLET_1,
			);

			expect(secondPurchaseOrderResult.result).toBeErr(Cl.uint(135));
		});

	function ensureRegistrationOfParties() {
		// register the importer
		const registerImporterResult = simnet.callPublicFn(
			'taral-importer',
			'register',
			[
				Cl.standardPrincipal(WALLET_1), // the importer
				Cl.stringUtf8('Importer'),
				Cl.buffer(Buffer.from('Stacks Signed Message: 1')),
				Cl.stringUtf8('Importer'),
			],
			WALLET_1,
		);

		expect(registerImporterResult.result).toBeOk(Cl.uint(1));

		// register the exporter
		const registerExporterResult = simnet.callPublicFn(
			'taral-exporter',
			'register',
			[
				Cl.standardPrincipal(WALLET_2), // the exporter
				Cl.stringUtf8('Exporter'),
				Cl.buffer(Buffer.from('Stacks Signed Message: 1')),
				Cl.stringUtf8('Exporter'),
			],
			WALLET_2,
		);

		expect(registerExporterResult.result).toBeOk(Cl.uint(1));

		// register the lender
		const registerLenderResult = simnet.callPublicFn(
			'taral-lender',
			'register-lender',
			[
				Cl.stringUtf8('Lender'),
				Cl.stringUtf8('Lender'),
				Cl.stringUtf8('Germany'),
			],
			WALLET_3,
		);

		expect(registerLenderResult.result).toBeOk(Cl.bool(true));
	}

	function checkTrackRecord(success: number, failed: number) {
		// get lender track record
		const getLenderTrackRecord = simnet.callReadOnlyFn(
			'taral-lender',
			'get-track-record',
			[Cl.standardPrincipal(WALLET_3)],
			WALLET_3,
		);

		expect(getLenderTrackRecord.result).toBeOk(
			Cl.tuple({
				'successful-transactions': Cl.uint(success),
				'failed-transactions': Cl.uint(failed),
			}),
		);

		// get exporter track record
		const getExporterTrackRecord = simnet.callReadOnlyFn(
			'taral-exporter',
			'get-track-record',
			[Cl.standardPrincipal(WALLET_2)],
			WALLET_2,
		);

		expect(getExporterTrackRecord.result).toBeOk(
			Cl.tuple({
				'successful-transactions': Cl.uint(success),
				'failed-transactions': Cl.uint(failed),
			}),
		);

		// get importer track record
		const getImporterTrackRecord = simnet.callReadOnlyFn(
			'taral-importer',
			'get-track-record',
			[Cl.standardPrincipal(WALLET_1)],
			WALLET_1,
		);

		expect(getImporterTrackRecord.result).toBeOk(
			Cl.tuple({
				'successful-transactions': Cl.uint(success),
				'failed-transactions': Cl.uint(failed),
			}),
		);
	}
});
