import { ClarityAbi } from "lib-shared";

export const MarketplaceStorageInterface: ClarityAbi = {
  clarity_version: "Clarity2",
  epoch: "Epoch21",
  functions: [
    {
      access: "public",
      args: [
        {
          name: "auction-id",
          type: "uint128",
        },
        {
          name: "auction",
          type: {
            tuple: [
              {
                name: "end-block",
                type: "uint128",
              },
              {
                name: "highest-bid",
                type: "uint128",
              },
              {
                name: "highest-bidder",
                type: {
                  optional: "principal",
                },
              },
              {
                name: "maker",
                type: "principal",
              },
              {
                name: "nft-asset-contract",
                type: "principal",
              },
              {
                name: "reserve-price",
                type: "uint128",
              },
              {
                name: "start-bid",
                type: "uint128",
              },
              {
                name: "start-block",
                type: "uint128",
              },
              {
                name: "token-id",
                type: "uint128",
              },
            ],
          },
        },
      ],
      name: "add-auction",
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
      access: "public",
      args: [
        {
          name: "key",
          type: {
            tuple: [
              {
                name: "auction-id",
                type: "uint128",
              },
              {
                name: "bidder",
                type: "principal",
              },
            ],
          },
        },
        {
          name: "amount",
          type: "uint128",
        },
      ],
      name: "add-bid",
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
      access: "public",
      args: [
        {
          name: "auction-id",
          type: "uint128",
        },
        {
          name: "auction",
          type: {
            tuple: [
              {
                name: "end-block",
                type: "uint128",
              },
              {
                name: "highest-bid",
                type: "uint128",
              },
              {
                name: "highest-bidder",
                type: {
                  optional: "principal",
                },
              },
              {
                name: "maker",
                type: "principal",
              },
              {
                name: "nft-asset-contract",
                type: "principal",
              },
              {
                name: "reserve-price",
                type: "uint128",
              },
              {
                name: "start-bid",
                type: "uint128",
              },
              {
                name: "start-block",
                type: "uint128",
              },
              {
                name: "token-id",
                type: "uint128",
              },
            ],
          },
        },
      ],
      name: "add-cancelled-auction",
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
      access: "public",
      args: [
        {
          name: "listing-id",
          type: "uint128",
        },
        {
          name: "listing",
          type: {
            tuple: [
              {
                name: "maker",
                type: "principal",
              },
              {
                name: "nft-asset-contract",
                type: "principal",
              },
              {
                name: "price",
                type: "uint128",
              },
              {
                name: "token-id",
                type: "uint128",
              },
            ],
          },
        },
      ],
      name: "add-cancelled-fixed-price-listing",
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
      access: "public",
      args: [
        {
          name: "auction-id",
          type: "uint128",
        },
        {
          name: "auction",
          type: {
            tuple: [
              {
                name: "end-block",
                type: "uint128",
              },
              {
                name: "highest-bid",
                type: "uint128",
              },
              {
                name: "highest-bidder",
                type: {
                  optional: "principal",
                },
              },
              {
                name: "maker",
                type: "principal",
              },
              {
                name: "nft-asset-contract",
                type: "principal",
              },
              {
                name: "reserve-price",
                type: "uint128",
              },
              {
                name: "start-bid",
                type: "uint128",
              },
              {
                name: "start-block",
                type: "uint128",
              },
              {
                name: "token-id",
                type: "uint128",
              },
            ],
          },
        },
      ],
      name: "add-completed-auction",
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
      access: "public",
      args: [
        {
          name: "listing-id",
          type: "uint128",
        },
        {
          name: "listing",
          type: {
            tuple: [
              {
                name: "maker",
                type: "principal",
              },
              {
                name: "nft-asset-contract",
                type: "principal",
              },
              {
                name: "price",
                type: "uint128",
              },
              {
                name: "token-id",
                type: "uint128",
              },
            ],
          },
        },
      ],
      name: "add-completed-fixed-price-listing",
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
      access: "public",
      args: [
        {
          name: "listing-id",
          type: "uint128",
        },
        {
          name: "listing",
          type: {
            tuple: [
              {
                name: "maker",
                type: "principal",
              },
              {
                name: "nft-asset-contract",
                type: "principal",
              },
              {
                name: "price",
                type: "uint128",
              },
              {
                name: "token-id",
                type: "uint128",
              },
            ],
          },
        },
      ],
      name: "add-fixed-price-listing",
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
      access: "public",
      args: [
        {
          name: "key",
          type: {
            tuple: [
              {
                name: "auction-id",
                type: "uint128",
              },
              {
                name: "bidder",
                type: "principal",
              },
            ],
          },
        },
        {
          name: "amount",
          type: "uint128",
        },
      ],
      name: "add-withdrawn-bid",
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
      access: "public",
      args: [
        {
          name: "auction-id",
          type: "uint128",
        },
      ],
      name: "delete-auction",
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
      access: "public",
      args: [
        {
          name: "key",
          type: {
            tuple: [
              {
                name: "auction-id",
                type: "uint128",
              },
              {
                name: "bidder",
                type: "principal",
              },
            ],
          },
        },
      ],
      name: "delete-bid",
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
      access: "public",
      args: [],
      name: "increment-auction-nonce",
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
      access: "public",
      args: [],
      name: "increment-fixed-price-nonce",
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
      access: "public",
      args: [
        {
          name: "listing-id",
          type: "uint128",
        },
      ],
      name: "remove-fixed-price-listing",
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
      access: "public",
      args: [
        {
          name: "new-owner",
          type: "principal",
        },
      ],
      name: "set-owner",
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
      access: "public",
      args: [
        {
          name: "asset-contract",
          type: "principal",
        },
        {
          name: "whitelisted",
          type: "bool",
        },
      ],
      name: "set-whitelisted",
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
      access: "public",
      args: [
        {
          name: "auction-id",
          type: "uint128",
        },
        {
          name: "auction",
          type: {
            tuple: [
              {
                name: "end-block",
                type: "uint128",
              },
              {
                name: "highest-bid",
                type: "uint128",
              },
              {
                name: "highest-bidder",
                type: {
                  optional: "principal",
                },
              },
              {
                name: "maker",
                type: "principal",
              },
              {
                name: "nft-asset-contract",
                type: "principal",
              },
              {
                name: "reserve-price",
                type: "uint128",
              },
              {
                name: "start-bid",
                type: "uint128",
              },
              {
                name: "start-block",
                type: "uint128",
              },
              {
                name: "token-id",
                type: "uint128",
              },
            ],
          },
        },
      ],
      name: "update-auction",
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
      args: [
        {
          name: "auction-id",
          type: "uint128",
        },
      ],
      name: "get-auction",
      outputs: {
        type: {
          optional: {
            tuple: [
              {
                name: "end-block",
                type: "uint128",
              },
              {
                name: "highest-bid",
                type: "uint128",
              },
              {
                name: "highest-bidder",
                type: {
                  optional: "principal",
                },
              },
              {
                name: "maker",
                type: "principal",
              },
              {
                name: "nft-asset-contract",
                type: "principal",
              },
              {
                name: "reserve-price",
                type: "uint128",
              },
              {
                name: "start-bid",
                type: "uint128",
              },
              {
                name: "start-block",
                type: "uint128",
              },
              {
                name: "token-id",
                type: "uint128",
              },
            ],
          },
        },
      },
    },
    {
      access: "read_only",
      args: [],
      name: "get-auction-nonce",
      outputs: {
        type: "uint128",
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
      name: "get-completed-auction",
      outputs: {
        type: {
          optional: {
            tuple: [
              {
                name: "end-block",
                type: "uint128",
              },
              {
                name: "highest-bid",
                type: "uint128",
              },
              {
                name: "highest-bidder",
                type: {
                  optional: "principal",
                },
              },
              {
                name: "maker",
                type: "principal",
              },
              {
                name: "nft-asset-contract",
                type: "principal",
              },
              {
                name: "reserve-price",
                type: "uint128",
              },
              {
                name: "start-bid",
                type: "uint128",
              },
              {
                name: "start-block",
                type: "uint128",
              },
              {
                name: "token-id",
                type: "uint128",
              },
            ],
          },
        },
      },
    },
    {
      access: "read_only",
      args: [
        {
          name: "listing-id",
          type: "uint128",
        },
      ],
      name: "get-fixed-price-listing",
      outputs: {
        type: {
          optional: {
            tuple: [
              {
                name: "maker",
                type: "principal",
              },
              {
                name: "nft-asset-contract",
                type: "principal",
              },
              {
                name: "price",
                type: "uint128",
              },
              {
                name: "token-id",
                type: "uint128",
              },
            ],
          },
        },
      },
    },
    {
      access: "read_only",
      args: [],
      name: "get-fixed-price-listing-nonce",
      outputs: {
        type: "uint128",
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
          name: "bidder",
          type: "principal",
        },
      ],
      name: "get-previous-bid",
      outputs: {
        type: "uint128",
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
          name: "bidder",
          type: "principal",
        },
      ],
      name: "get-withdrawn-bid",
      outputs: {
        type: {
          optional: "uint128",
        },
      },
    },
    {
      access: "read_only",
      args: [
        {
          name: "asset-contract",
          type: "principal",
        },
      ],
      name: "is-whitelisted",
      outputs: {
        type: "bool",
      },
    },
  ],
  fungible_tokens: [],
  maps: [
    {
      key: "uint128",
      name: "auctions",
      value: {
        tuple: [
          {
            name: "end-block",
            type: "uint128",
          },
          {
            name: "highest-bid",
            type: "uint128",
          },
          {
            name: "highest-bidder",
            type: {
              optional: "principal",
            },
          },
          {
            name: "maker",
            type: "principal",
          },
          {
            name: "nft-asset-contract",
            type: "principal",
          },
          {
            name: "reserve-price",
            type: "uint128",
          },
          {
            name: "start-bid",
            type: "uint128",
          },
          {
            name: "start-block",
            type: "uint128",
          },
          {
            name: "token-id",
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
            name: "bidder",
            type: "principal",
          },
        ],
      },
      name: "bids",
      value: "uint128",
    },
    {
      key: "uint128",
      name: "cancelled-auctions",
      value: {
        tuple: [
          {
            name: "end-block",
            type: "uint128",
          },
          {
            name: "highest-bid",
            type: "uint128",
          },
          {
            name: "highest-bidder",
            type: {
              optional: "principal",
            },
          },
          {
            name: "maker",
            type: "principal",
          },
          {
            name: "nft-asset-contract",
            type: "principal",
          },
          {
            name: "reserve-price",
            type: "uint128",
          },
          {
            name: "start-bid",
            type: "uint128",
          },
          {
            name: "start-block",
            type: "uint128",
          },
          {
            name: "token-id",
            type: "uint128",
          },
        ],
      },
    },
    {
      key: "uint128",
      name: "cancelled-fixed-price-listings",
      value: {
        tuple: [
          {
            name: "maker",
            type: "principal",
          },
          {
            name: "nft-asset-contract",
            type: "principal",
          },
          {
            name: "price",
            type: "uint128",
          },
          {
            name: "token-id",
            type: "uint128",
          },
        ],
      },
    },
    {
      key: "uint128",
      name: "completed-auctions",
      value: {
        tuple: [
          {
            name: "end-block",
            type: "uint128",
          },
          {
            name: "highest-bid",
            type: "uint128",
          },
          {
            name: "highest-bidder",
            type: {
              optional: "principal",
            },
          },
          {
            name: "maker",
            type: "principal",
          },
          {
            name: "nft-asset-contract",
            type: "principal",
          },
          {
            name: "reserve-price",
            type: "uint128",
          },
          {
            name: "start-bid",
            type: "uint128",
          },
          {
            name: "start-block",
            type: "uint128",
          },
          {
            name: "token-id",
            type: "uint128",
          },
        ],
      },
    },
    {
      key: "uint128",
      name: "completed-fixed-price-listings",
      value: {
        tuple: [
          {
            name: "maker",
            type: "principal",
          },
          {
            name: "nft-asset-contract",
            type: "principal",
          },
          {
            name: "price",
            type: "uint128",
          },
          {
            name: "token-id",
            type: "uint128",
          },
        ],
      },
    },
    {
      key: "uint128",
      name: "fixed-price-listings",
      value: {
        tuple: [
          {
            name: "maker",
            type: "principal",
          },
          {
            name: "nft-asset-contract",
            type: "principal",
          },
          {
            name: "price",
            type: "uint128",
          },
          {
            name: "token-id",
            type: "uint128",
          },
        ],
      },
    },
    {
      key: "principal",
      name: "whitelisted-asset-contracts",
      value: "bool",
    },
    {
      key: {
        tuple: [
          {
            name: "auction-id",
            type: "uint128",
          },
          {
            name: "bidder",
            type: "principal",
          },
        ],
      },
      name: "withdrawn-bids",
      value: "uint128",
    },
  ],
  non_fungible_tokens: [],
  variables: [
    {
      access: "variable",
      name: "auction-nonce",
      type: "uint128",
    },
    {
      access: "variable",
      name: "contract-owner",
      type: "principal",
    },
    {
      access: "variable",
      name: "fixed-price-nonce",
      type: "uint128",
    },
  ],
};
