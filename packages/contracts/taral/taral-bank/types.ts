
  
  import { Transaction } from 'lib-shared';
  import { ClarityTypes } from 'lib-shared'

  export interface TaralBankContract {
      acceptBid: (bidId: number | bigint) => Transaction<bigint, bigint>;
  checkPurchaseOrderHealth: (purchaseOrderId: number | bigint, currentYear: number | bigint, currentMonth: number | bigint) => Transaction<bigint, bigint>;
  createPurchaseOrder: (totalAmount: number | bigint, downpayment: number | bigint, sellerId: string) => Transaction<bigint, null>;
  endPurchaseOrderSuccessfully: (purchaseOrderId: number | bigint) => Transaction<boolean, bigint>;
  makePayment: (purchaseOrderId: number | bigint, amount: number | bigint, currentYear: number | bigint, currentMonth: number | bigint) => Transaction<bigint, bigint>;
  placeBid: (purchaseOrderId: number | bigint, bidAmount: number | bigint, interestRate: number | bigint, numberOfDownpayments: number | bigint) => Transaction<bigint, bigint>;
  updateBid: (bidId: number | bigint, newAmount: bigint | null) => Transaction<boolean, bigint>;
  updateBidNumberOfDownpayments: (bidId: number | bigint, newNumberOfDownpayments: number | bigint) => Transaction<boolean, bigint>;
  updateInterest: (id: number | bigint, newInterest: number | bigint) => Transaction<boolean, bigint>;
  missedLastThreePayments: (purchaseOrderId: number | bigint, currentYear: number | bigint, currentMonth: number | bigint) => Promise<ClarityTypes.Response<boolean, bigint>>;
  monthsSinceFirstPayment: (firstYear: number | bigint, firstMonth: number | bigint, currentYear: number | bigint, currentMonth: number | bigint) => Promise<bigint>;
  ERR_BID_ALREADY_REFUNDED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_BID_NOT_FOUND: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_BID_NOT_FOUND_FOR_PURCHASE_ORDER: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_CANNOT_MODIFY_ACCEPTED_BID: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_FAILED_TO_CHECK_MISSED_PAYMENTS: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_FAILED_TO_RECORD_PAYMENTS: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_FAILED_TO_UPDATE_BORROWER_TRACK_RECORD: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_FAILED_TO_UPDATE_LENDER_TRACK_RECORD: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_FAILED_TO_UPDATE_SELLER_TRACK_RECORD: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_INSUFICIENT_AMOUNT_FOR_MONTHLY_PAYMENT: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_NOT_ENOUGH_FUNDS: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_NO_LENDER_ASSOCIATED_WITH_PURCHASE_ORDER: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_NO_LENDER_FOR_BID: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_NO_LENDER_FOR_PURCHASE_ORDER: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_NO_MISSED_PAYMENTS: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_ONLY_BORROWER_CAN_ACCEPT_BID: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_PURCHASE_ORDER_NOT_FOUND: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_PURCHASE_ORDER_NOT_FULLY_PAID: () => Promise<ClarityTypes.Response<null, bigint>>;
  protocolInterestRate: () => Promise<bigint>;
  nextBidId: () => Promise<bigint>;
  nextPurchaseOrderId: () => Promise<bigint>;
  bids: (key: {
  "id": bigint
    }) => Promise<{
  "bid-amount": bigint;
  "duration": bigint;
  "interest-rate": bigint;
  "is-accepted": boolean;
  "lender-id": string | null;
  "monthly-payment": bigint;
  "number-of-downpayments": bigint;
  "purchase-order-id": bigint;
  "refunded": boolean
    } | null>;
  payments: (key: {
  "id": bigint
    }) => Promise<{
  "amount": bigint;
  "borrower-id": string;
  "month": bigint;
  "months-covered": bigint;
  "purchase-order-id": bigint;
  "year": bigint
    } | null>;
  purchaseOrders: (key: {
  "id": bigint
    }) => Promise<{
  "accepted-bid-id": bigint | null;
  "borrower-id": string;
  "completed-successfully": boolean;
  "downpayment": bigint;
  "first-payment-month": bigint;
  "first-payment-year": bigint;
  "is-completed": boolean;
  "lender-id": string | null;
  "outstanding-amount": bigint;
  "overpaid-balance": bigint;
  "payments-left": bigint;
  "seller-id": string;
  "total-amount": bigint
    } | null>;
  }