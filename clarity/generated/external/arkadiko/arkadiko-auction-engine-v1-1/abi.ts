import { ClarityAbi } from "../../../../lib/clarity/types";

export const ArkadikoAuctionEngineV11Interface: ClarityAbi = {
  functions: [
    {
      access: "private",
      args: [
        {
          name: "token",
          type: {
            "string-ascii": {
              length: 12,
            },
          },
        },
      ],
      name: "collateral-token",
      outputs: {
        type: {
          "string-ascii": {
            length: 12,
          },
        },
      },
    },
    {
      access: "private",
      args: [
        {
          name: "auction-id",
          type: "uint128",
        },
      ],
      name: "extend-auction",
      outputs: {
        type: {
          response: {
            error: "none",
            ok: "bool",
          },
        },
      },
    },
    {
      access: "private",
      args: [
        {
          name: "i1",
          type: "uint128",
        },
        {
          name: "i2",
          type: "uint128",
        },
      ],
      name: "min-of",
      outputs: {
        type: "uint128",
      },
    },
    {
      access: "private",
      args: [
        {
          name: "vault-manager",
          type: "trait_reference",
        },
        {
          name: "oracle",
          type: "trait_reference",
        },
        {
          name: "coll-type",
          type: "trait_reference",
        },
        {
          name: "auction-id",
          type: "uint128",
        },
        {
          name: "lot-index",
          type: "uint128",
        },
        {
          name: "usda",
          type: "uint128",
        },
      ],
      name: "register-bid",
      outputs: {
        type: {
          response: {
            error: "uint128",
            ok: "bool",
          },
        },
      },
    },
    {
      access: "private",
      args: [
        {
          name: "auction-id",
          type: "uint128",
        },
      ],
      name: "remove-auction",
      outputs: {
        type: {
          response: {
            error: "uint128",
            ok: "bool",
          },
        },
      },
    },
    {
      access: "private",
      args: [
        {
          name: "auction-id",
          type: "uint128",
        },
      ],
      name: "remove-closed-auction",
      outputs: {
        type: "bool",
      },
    },
    {
      access: "private",
      args: [
        {
          name: "lot",
          type: {
            tuple: [
              {
                name: "auction-id",
                type: "uint128",
              },
              {
                name: "lot-index",
                type: "uint128",
              },
            ],
          },
        },
      ],
      name: "remove-winning-lot",
      outputs: {
        type: "bool",
      },
    },
    {
      access: "private",
      args: [
        {
          name: "owner",
          type: "principal",
        },
        {
          name: "usda",
          type: "uint128",
        },
        {
          name: "auction-id",
          type: "uint128",
        },
        {
          name: "lot-index",
          type: "uint128",
        },
      ],
      name: "return-usda",
      outputs: {
        type: {
          response: {
            error: "uint128",
            ok: "bool",
          },
        },
      },
    },
    {
      access: "private",
      args: [
        {
          name: "vault-id",
          type: "uint128",
        },
        {
          name: "debt-to-raise",
          type: "uint128",
        },
        {
          name: "discount",
          type: "uint128",
        },
      ],
      name: "start-debt-auction",
      outputs: {
        type: {
          response: {
            error: "uint128",
            ok: "bool",
          },
        },
      },
    },
    {
      access: "public",
      args: [
        {
          name: "vault-manager",
          type: "trait_reference",
        },
        {
          name: "oracle",
          type: "trait_reference",
        },
        {
          name: "coll-type",
          type: "trait_reference",
        },
        {
          name: "auction-id",
          type: "uint128",
        },
        {
          name: "lot-index",
          type: "uint128",
        },
        {
          name: "usda",
          type: "uint128",
        },
      ],
      name: "bid",
      outputs: {
        type: {
          response: {
            error: "uint128",
            ok: "bool",
          },
        },
      },
    },
    {
      access: "public",
      args: [
        {
          name: "vault-manager",
          type: "trait_reference",
        },
        {
          name: "coll-type",
          type: "trait_reference",
        },
        {
          name: "auction-id",
          type: "uint128",
        },
      ],
      name: "close-auction",
      outputs: {
        type: {
          response: {
            error: "uint128",
            ok: "bool",
          },
        },
      },
    },
    {
      access: "public",
      args: [
        {
          name: "oracle",
          type: "trait_reference",
        },
        {
          name: "auction-id",
          type: "uint128",
        },
      ],
      name: "get-minimum-collateral-amount",
      outputs: {
        type: {
          response: {
            error: "uint128",
            ok: "uint128",
          },
        },
      },
    },
    {
      access: "public",
      args: [
        {
          name: "auction-engine",
          type: "trait_reference",
        },
        {
          name: "token",
          type: "trait_reference",
        },
      ],
      name: "migrate-funds",
      outputs: {
        type: {
          response: {
            error: "uint128",
            ok: "bool",
          },
        },
      },
    },
    {
      access: "public",
      args: [
        {
          name: "vault-manager",
          type: "trait_reference",
        },
        {
          name: "ft",
          type: "trait_reference",
        },
        {
          name: "reserve",
          type: "trait_reference",
        },
        {
          name: "coll-type",
          type: "trait_reference",
        },
        {
          name: "auction-id",
          type: "uint128",
        },
        {
          name: "lot-index",
          type: "uint128",
        },
      ],
      name: "redeem-lot-collateral",
      outputs: {
        type: {
          response: {
            error: "uint128",
            ok: "bool",
          },
        },
      },
    },
    {
      access: "public",
      args: [
        {
          name: "usda-amount",
          type: "uint128",
        },
      ],
      name: "redeem-usda",
      outputs: {
        type: {
          response: {
            error: "uint128",
            ok: "bool",
          },
        },
      },
    },
    {
      access: "public",
      args: [
        {
          name: "vault-id",
          type: "uint128",
        },
        {
          name: "uamount",
          type: "uint128",
        },
        {
          name: "extra-debt",
          type: "uint128",
        },
        {
          name: "vault-debt",
          type: "uint128",
        },
        {
          name: "discount",
          type: "uint128",
        },
      ],
      name: "start-auction",
      outputs: {
        type: {
          response: {
            error: "uint128",
            ok: "bool",
          },
        },
      },
    },
    {
      access: "public",
      args: [],
      name: "toggle-auction-engine-shutdown",
      outputs: {
        type: {
          response: {
            error: "uint128",
            ok: "bool",
          },
        },
      },
    },
    {
      access: "read_only",
      args: [
        {
          name: "price-in-cents",
          type: "uint128",
        },
        {
          name: "auction-id",
          type: "uint128",
        },
      ],
      name: "discounted-auction-price",
      outputs: {
        type: {
          response: {
            error: "none",
            ok: "uint128",
          },
        },
      },
    },
    {
      access: "read_only",
      args: [
        {
          name: "id",
          type: "uint128",
        },
      ],
      name: "get-auction-by-id",
      outputs: {
        type: {
          tuple: [
            {
              name: "auction-type",
              type: {
                "string-ascii": {
                  length: 64,
                },
              },
            },
            {
              name: "collateral-amount",
              type: "uint128",
            },
            {
              name: "collateral-token",
              type: {
                "string-ascii": {
                  length: 12,
                },
              },
            },
            {
              name: "debt-to-raise",
              type: "uint128",
            },
            {
              name: "discount",
              type: "uint128",
            },
            {
              name: "ends-at",
              type: "uint128",
            },
            {
              name: "id",
              type: "uint128",
            },
            {
              name: "lot-size",
              type: "uint128",
            },
            {
              name: "lots-sold",
              type: "uint128",
            },
            {
              name: "total-collateral-sold",
              type: "uint128",
            },
            {
              name: "total-debt-burned",
              type: "uint128",
            },
            {
              name: "total-debt-raised",
              type: "uint128",
            },
            {
              name: "vault-id",
              type: "uint128",
            },
          ],
        },
      },
    },
    {
      access: "read_only",
      args: [],
      name: "get-auction-ids",
      outputs: {
        type: {
          response: {
            error: "none",
            ok: {
              list: {
                length: 1500,
                type: "uint128",
              },
            },
          },
        },
      },
    },
    {
      access: "read_only",
      args: [
        {
          name: "auction-id",
          type: "uint128",
        },
      ],
      name: "get-auction-open",
      outputs: {
        type: {
          response: {
            error: "none",
            ok: "bool",
          },
        },
      },
    },
    {
      access: "read_only",
      args: [],
      name: "get-auctions",
      outputs: {
        type: {
          response: {
            error: "none",
            ok: {
              list: {
                length: 1500,
                type: {
                  tuple: [
                    {
                      name: "auction-type",
                      type: {
                        "string-ascii": {
                          length: 64,
                        },
                      },
                    },
                    {
                      name: "collateral-amount",
                      type: "uint128",
                    },
                    {
                      name: "collateral-token",
                      type: {
                        "string-ascii": {
                          length: 12,
                        },
                      },
                    },
                    {
                      name: "debt-to-raise",
                      type: "uint128",
                    },
                    {
                      name: "discount",
                      type: "uint128",
                    },
                    {
                      name: "ends-at",
                      type: "uint128",
                    },
                    {
                      name: "id",
                      type: "uint128",
                    },
                    {
                      name: "lot-size",
                      type: "uint128",
                    },
                    {
                      name: "lots-sold",
                      type: "uint128",
                    },
                    {
                      name: "total-collateral-sold",
                      type: "uint128",
                    },
                    {
                      name: "total-debt-burned",
                      type: "uint128",
                    },
                    {
                      name: "total-debt-raised",
                      type: "uint128",
                    },
                    {
                      name: "vault-id",
                      type: "uint128",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    {
      access: "read_only",
      args: [
        {
          name: "auction-id",
          type: "uint128",
        },
        {
          name: "lot-index",
          type: "uint128",
        },
      ],
      name: "get-last-bid",
      outputs: {
        type: {
          tuple: [
            {
              name: "collateral-amount",
              type: "uint128",
            },
            {
              name: "collateral-token",
              type: {
                "string-ascii": {
                  length: 12,
                },
              },
            },
            {
              name: "owner",
              type: "principal",
            },
            {
              name: "redeemed",
              type: "bool",
            },
            {
              name: "usda",
              type: "uint128",
            },
          ],
        },
      },
    },
    {
      access: "read_only",
      args: [
        {
          name: "owner",
          type: "principal",
        },
      ],
      name: "get-winning-lots",
      outputs: {
        type: {
          tuple: [
            {
              name: "ids",
              type: {
                list: {
                  length: 100,
                  type: {
                    tuple: [
                      {
                        name: "auction-id",
                        type: "uint128",
                      },
                      {
                        name: "lot-index",
                        type: "uint128",
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    },
  ],
  fungible_tokens: [],
  maps: [
    {
      key: {
        tuple: [
          {
            name: "id",
            type: "uint128",
          },
        ],
      },
      name: "auctions",
      value: {
        tuple: [
          {
            name: "auction-type",
            type: {
              "string-ascii": {
                length: 64,
              },
            },
          },
          {
            name: "collateral-amount",
            type: "uint128",
          },
          {
            name: "collateral-token",
            type: {
              "string-ascii": {
                length: 12,
              },
            },
          },
          {
            name: "debt-to-raise",
            type: "uint128",
          },
          {
            name: "discount",
            type: "uint128",
          },
          {
            name: "ends-at",
            type: "uint128",
          },
          {
            name: "id",
            type: "uint128",
          },
          {
            name: "lot-size",
            type: "uint128",
          },
          {
            name: "lots-sold",
            type: "uint128",
          },
          {
            name: "total-collateral-sold",
            type: "uint128",
          },
          {
            name: "total-debt-burned",
            type: "uint128",
          },
          {
            name: "total-debt-raised",
            type: "uint128",
          },
          {
            name: "vault-id",
            type: "uint128",
          },
        ],
      },
    },
    {
      key: {
        tuple: [
          {
            name: "auction-id",
            type: "uint128",
          },
          {
            name: "lot-index",
            type: "uint128",
          },
        ],
      },
      name: "bids",
      value: {
        tuple: [
          {
            name: "collateral-amount",
            type: "uint128",
          },
          {
            name: "collateral-token",
            type: {
              "string-ascii": {
                length: 12,
              },
            },
          },
          {
            name: "owner",
            type: "principal",
          },
          {
            name: "redeemed",
            type: "bool",
          },
          {
            name: "usda",
            type: "uint128",
          },
        ],
      },
    },
    {
      key: {
        tuple: [
          {
            name: "user",
            type: "principal",
          },
        ],
      },
      name: "redeeming-lot",
      value: {
        tuple: [
          {
            name: "auction-id",
            type: "uint128",
          },
          {
            name: "lot-index",
            type: "uint128",
          },
        ],
      },
    },
    {
      key: {
        tuple: [
          {
            name: "user",
            type: "principal",
          },
        ],
      },
      name: "winning-lots",
      value: {
        tuple: [
          {
            name: "ids",
            type: {
              list: {
                length: 100,
                type: {
                  tuple: [
                    {
                      name: "auction-id",
                      type: "uint128",
                    },
                    {
                      name: "lot-index",
                      type: "uint128",
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
  ],
  non_fungible_tokens: [],
  variables: [
    {
      access: "constant",
      name: "ERR-AUCTION-NOT-ALLOWED",
      type: "uint128",
    },
    {
      access: "constant",
      name: "ERR-AUCTION-NOT-CLOSED",
      type: "uint128",
    },
    {
      access: "constant",
      name: "ERR-AUCTION-NOT-OPEN",
      type: "uint128",
    },
    {
      access: "constant",
      name: "ERR-BLOCK-HEIGHT-NOT-REACHED",
      type: "uint128",
    },
    {
      access: "constant",
      name: "ERR-EMERGENCY-SHUTDOWN-ACTIVATED",
      type: "uint128",
    },
    {
      access: "constant",
      name: "ERR-LOT-ALREADY-REDEEMED",
      type: "uint128",
    },
    {
      access: "constant",
      name: "ERR-LOT-NOT-OPEN",
      type: "uint128",
    },
    {
      access: "constant",
      name: "ERR-LOT-SOLD",
      type: "uint128",
    },
    {
      access: "constant",
      name: "ERR-NOT-AUTHORIZED",
      type: "uint128",
    },
    {
      access: "constant",
      name: "ERR-POOR-BID",
      type: "uint128",
    },
    {
      access: "constant",
      name: "ERR-TOKEN-TYPE-MISMATCH",
      type: "uint128",
    },
    {
      access: "constant",
      name: "blocks-per-day",
      type: "uint128",
    },
    {
      access: "variable",
      name: "auction-engine-shutdown-activated",
      type: "bool",
    },
    {
      access: "variable",
      name: "auction-ids",
      type: {
        list: {
          length: 1500,
          type: "uint128",
        },
      },
    },
    {
      access: "variable",
      name: "last-auction-id",
      type: "uint128",
    },
    {
      access: "variable",
      name: "lot-size",
      type: "uint128",
    },
    {
      access: "variable",
      name: "removing-auction-id",
      type: "uint128",
    },
  ],
};
