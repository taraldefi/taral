
  import { ClarityAbi } from 'lib-shared';

  export const TaralBankInterface: ClarityAbi = {
  "clarity_version": "Clarity2",
  "epoch": "Epoch21",
  "functions": [
    {
      "access": "private",
      "args": [],
      "name": "default-lender-id",
      "outputs": {
        "type": {
          "optional": "principal"
        }
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "current-year",
          "type": "uint128"
        },
        {
          "name": "current-month",
          "type": "uint128"
        },
        {
          "name": "purchase-order-id",
          "type": "uint128"
        },
        {
          "name": "months",
          "type": "uint128"
        },
        {
          "name": "amount-per-month",
          "type": "uint128"
        },
        {
          "name": "borrower",
          "type": "principal"
        },
        {
          "name": "lender",
          "type": "principal"
        }
      ],
      "name": "record-multiple-payments",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "uint128"
          }
        }
      }
    },
    {
      "access": "private",
      "args": [
        {
          "name": "bid-id",
          "type": "uint128"
        }
      ],
      "name": "refund-bid",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "bid-id",
          "type": "uint128"
        }
      ],
      "name": "accept-bid",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "uint128"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "purchase-order-id",
          "type": "uint128"
        },
        {
          "name": "current-year",
          "type": "uint128"
        },
        {
          "name": "current-month",
          "type": "uint128"
        }
      ],
      "name": "check-purchase-order-health",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "uint128"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "total-amount",
          "type": "uint128"
        },
        {
          "name": "downpayment",
          "type": "uint128"
        },
        {
          "name": "seller-id",
          "type": "principal"
        }
      ],
      "name": "create-purchase-order",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": "uint128"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "purchase-order-id",
          "type": "uint128"
        }
      ],
      "name": "end-purchase-order-successfully",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "purchase-order-id",
          "type": "uint128"
        },
        {
          "name": "amount",
          "type": "uint128"
        },
        {
          "name": "current-year",
          "type": "uint128"
        },
        {
          "name": "current-month",
          "type": "uint128"
        }
      ],
      "name": "make-payment",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "uint128"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "purchase-order-id",
          "type": "uint128"
        },
        {
          "name": "bid-amount",
          "type": "uint128"
        },
        {
          "name": "interest-rate",
          "type": "uint128"
        },
        {
          "name": "number-of-downpayments",
          "type": "uint128"
        }
      ],
      "name": "place-bid",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "uint128"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "bid-id",
          "type": "uint128"
        },
        {
          "name": "new-amount",
          "type": {
            "optional": "uint128"
          }
        }
      ],
      "name": "update-bid",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "bid-id",
          "type": "uint128"
        },
        {
          "name": "new-number-of-downpayments",
          "type": "uint128"
        }
      ],
      "name": "update-bid-number-of-downpayments",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "public",
      "args": [
        {
          "name": "id",
          "type": "uint128"
        },
        {
          "name": "new-interest",
          "type": "uint128"
        }
      ],
      "name": "update-interest",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "purchase-order-id",
          "type": "uint128"
        },
        {
          "name": "current-year",
          "type": "uint128"
        },
        {
          "name": "current-month",
          "type": "uint128"
        }
      ],
      "name": "missed-last-three-payments",
      "outputs": {
        "type": {
          "response": {
            "error": "uint128",
            "ok": "bool"
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "first-year",
          "type": "uint128"
        },
        {
          "name": "first-month",
          "type": "uint128"
        },
        {
          "name": "current-year",
          "type": "uint128"
        },
        {
          "name": "current-month",
          "type": "uint128"
        }
      ],
      "name": "months-since-first-payment",
      "outputs": {
        "type": "uint128"
      }
    }
  ],
  "fungible_tokens": [],
  "maps": [
    {
      "key": {
        "tuple": [
          {
            "name": "id",
            "type": "uint128"
          }
        ]
      },
      "name": "bids",
      "value": {
        "tuple": [
          {
            "name": "bid-amount",
            "type": "uint128"
          },
          {
            "name": "duration",
            "type": "uint128"
          },
          {
            "name": "interest-rate",
            "type": "uint128"
          },
          {
            "name": "is-accepted",
            "type": "bool"
          },
          {
            "name": "lender-id",
            "type": {
              "optional": "principal"
            }
          },
          {
            "name": "monthly-payment",
            "type": "uint128"
          },
          {
            "name": "number-of-downpayments",
            "type": "uint128"
          },
          {
            "name": "purchase-order-id",
            "type": "uint128"
          },
          {
            "name": "refunded",
            "type": "bool"
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "id",
            "type": "uint128"
          }
        ]
      },
      "name": "payments",
      "value": {
        "tuple": [
          {
            "name": "amount",
            "type": "uint128"
          },
          {
            "name": "borrower-id",
            "type": "principal"
          },
          {
            "name": "month",
            "type": "uint128"
          },
          {
            "name": "months-covered",
            "type": "uint128"
          },
          {
            "name": "purchase-order-id",
            "type": "uint128"
          },
          {
            "name": "year",
            "type": "uint128"
          }
        ]
      }
    },
    {
      "key": {
        "tuple": [
          {
            "name": "id",
            "type": "uint128"
          }
        ]
      },
      "name": "purchase-orders",
      "value": {
        "tuple": [
          {
            "name": "accepted-bid-id",
            "type": {
              "optional": "uint128"
            }
          },
          {
            "name": "borrower-id",
            "type": "principal"
          },
          {
            "name": "completed-successfully",
            "type": "bool"
          },
          {
            "name": "downpayment",
            "type": "uint128"
          },
          {
            "name": "first-payment-month",
            "type": "uint128"
          },
          {
            "name": "first-payment-year",
            "type": "uint128"
          },
          {
            "name": "is-completed",
            "type": "bool"
          },
          {
            "name": "lender-id",
            "type": {
              "optional": "principal"
            }
          },
          {
            "name": "outstanding-amount",
            "type": "uint128"
          },
          {
            "name": "overpaid-balance",
            "type": "uint128"
          },
          {
            "name": "payments-left",
            "type": "uint128"
          },
          {
            "name": "seller-id",
            "type": "principal"
          },
          {
            "name": "total-amount",
            "type": "uint128"
          }
        ]
      }
    }
  ],
  "non_fungible_tokens": [],
  "variables": [
    {
      "access": "constant",
      "name": "ERR_BID_ALREADY_REFUNDED",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_BID_NOT_FOUND",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_BID_NOT_FOUND_FOR_PURCHASE_ORDER",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_CANNOT_MODIFY_ACCEPTED_BID",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_FAILED_TO_CHECK_MISSED_PAYMENTS",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_FAILED_TO_RECORD_PAYMENTS",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_FAILED_TO_UPDATE_BORROWER_TRACK_RECORD",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_FAILED_TO_UPDATE_LENDER_TRACK_RECORD",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_FAILED_TO_UPDATE_SELLER_TRACK_RECORD",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_INSUFICIENT_AMOUNT_FOR_MONTHLY_PAYMENT",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_NOT_ENOUGH_FUNDS",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_NO_LENDER_ASSOCIATED_WITH_PURCHASE_ORDER",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_NO_LENDER_FOR_BID",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_NO_LENDER_FOR_PURCHASE_ORDER",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_NO_MISSED_PAYMENTS",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_ONLY_BORROWER_CAN_ACCEPT_BID",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_PURCHASE_ORDER_NOT_FOUND",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "ERR_PURCHASE_ORDER_NOT_FULLY_PAID",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "protocol-interest-rate",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "next-bid-id",
      "type": "uint128"
    },
    {
      "access": "variable",
      "name": "next-purchase-order-id",
      "type": "uint128"
    }
  ]
};