import { ClarityAbi } from "lib-shared";

export const PurchaseOrderStorageInterface: ClarityAbi = {
  clarity_version: "Clarity2",
  epoch: "Epoch21",
  functions: [
    {
      access: "private",
      args: [
        {
          name: "value",
          type: {
            optional: {
              tuple: [
                {
                  name: "amount",
                  type: "uint128",
                },
                {
                  name: "delivery-term",
                  type: {
                    "string-utf8": {
                      length: 10,
                    },
                  },
                },
                {
                  name: "exporter-id",
                  type: "uint128",
                },
                {
                  name: "hash",
                  type: {
                    buffer: {
                      length: 256,
                    },
                  },
                },
                {
                  name: "importer-id",
                  type: "uint128",
                },
                {
                  name: "payment-term",
                  type: {
                    "string-utf8": {
                      length: 200,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
      name: "is-valid-value",
      outputs: {
        type: "bool",
      },
    },
    {
      access: "public",
      args: [
        {
          name: "exporter-id",
          type: "uint128",
        },
        {
          name: "importer-id",
          type: "uint128",
        },
        {
          name: "order-hash",
          type: {
            buffer: {
              length: 256,
            },
          },
        },
        {
          name: "payment-term",
          type: {
            "string-utf8": {
              length: 200,
            },
          },
        },
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "delivery-term",
          type: {
            "string-utf8": {
              length: 10,
            },
          },
        },
      ],
      name: "add-order",
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
          name: "order-detail-hash",
          type: {
            buffer: {
              length: 256,
            },
          },
        },
      ],
      name: "add-order-details",
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
          name: "vault-id",
          type: "uint128",
        },
      ],
      name: "delete-vault",
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
      name: "increment-order-id-nonce",
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
          name: "key-tuple",
          type: {
            tuple: [
              {
                name: "vault-id",
                type: "uint128",
              },
            ],
          },
        },
        {
          name: "value-tuple",
          type: {
            tuple: [
              {
                name: "borrower",
                type: "principal",
              },
              {
                name: "collateral-btc",
                type: "uint128",
              },
              {
                name: "collateral-stx",
                type: "uint128",
              },
              {
                name: "debt",
                type: "uint128",
              },
              {
                name: "last-repayment-date",
                type: "uint128",
              },
              {
                name: "nft-id",
                type: "uint128",
              },
            ],
          },
        },
      ],
      name: "update-vault",
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
      name: "get-next-vault-id",
      outputs: {
        type: "uint128",
      },
    },
    {
      access: "read_only",
      args: [],
      name: "get-order-id-nonce",
      outputs: {
        type: "uint128",
      },
    },
    {
      access: "read_only",
      args: [
        {
          name: "order-id",
          type: "uint128",
        },
      ],
      name: "get-purchase-order",
      outputs: {
        type: {
          optional: {
            tuple: [
              {
                name: "amount",
                type: "uint128",
              },
              {
                name: "delivery-term",
                type: {
                  "string-utf8": {
                    length: 10,
                  },
                },
              },
              {
                name: "exporter-id",
                type: "uint128",
              },
              {
                name: "hash",
                type: {
                  buffer: {
                    length: 256,
                  },
                },
              },
              {
                name: "importer-id",
                type: "uint128",
              },
              {
                name: "payment-term",
                type: {
                  "string-utf8": {
                    length: 200,
                  },
                },
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
          name: "order-id",
          type: "uint128",
        },
      ],
      name: "get-purchase-order-detail",
      outputs: {
        type: {
          optional: {
            tuple: [
              {
                name: "hash",
                type: {
                  buffer: {
                    length: 256,
                  },
                },
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
          name: "order-ids",
          type: {
            list: {
              length: 100,
              type: "uint128",
            },
          },
        },
      ],
      name: "get-purchase-orders",
      outputs: {
        type: {
          list: {
            length: 100,
            type: {
              optional: {
                tuple: [
                  {
                    name: "amount",
                    type: "uint128",
                  },
                  {
                    name: "delivery-term",
                    type: {
                      "string-utf8": {
                        length: 10,
                      },
                    },
                  },
                  {
                    name: "exporter-id",
                    type: "uint128",
                  },
                  {
                    name: "hash",
                    type: {
                      buffer: {
                        length: 256,
                      },
                    },
                  },
                  {
                    name: "importer-id",
                    type: "uint128",
                  },
                  {
                    name: "payment-term",
                    type: {
                      "string-utf8": {
                        length: 200,
                      },
                    },
                  },
                ],
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
          name: "vault-id",
          type: "uint128",
        },
      ],
      name: "get-vault-by-id",
      outputs: {
        type: {
          optional: {
            tuple: [
              {
                name: "borrower",
                type: "principal",
              },
              {
                name: "collateral-btc",
                type: "uint128",
              },
              {
                name: "collateral-stx",
                type: "uint128",
              },
              {
                name: "debt",
                type: "uint128",
              },
              {
                name: "last-repayment-date",
                type: "uint128",
              },
              {
                name: "nft-id",
                type: "uint128",
              },
            ],
          },
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
      name: "order",
      value: {
        tuple: [
          {
            name: "amount",
            type: "uint128",
          },
          {
            name: "delivery-term",
            type: {
              "string-utf8": {
                length: 10,
              },
            },
          },
          {
            name: "exporter-id",
            type: "uint128",
          },
          {
            name: "hash",
            type: {
              buffer: {
                length: 256,
              },
            },
          },
          {
            name: "importer-id",
            type: "uint128",
          },
          {
            name: "payment-term",
            type: {
              "string-utf8": {
                length: 200,
              },
            },
          },
        ],
      },
    },
    {
      key: {
        tuple: [
          {
            name: "id",
            type: "uint128",
          },
        ],
      },
      name: "order-detail",
      value: {
        tuple: [
          {
            name: "hash",
            type: {
              buffer: {
                length: 256,
              },
            },
          },
        ],
      },
    },
    {
      key: {
        tuple: [
          {
            name: "vault-id",
            type: "uint128",
          },
        ],
      },
      name: "vaults",
      value: {
        tuple: [
          {
            name: "borrower",
            type: "principal",
          },
          {
            name: "collateral-btc",
            type: "uint128",
          },
          {
            name: "collateral-stx",
            type: "uint128",
          },
          {
            name: "debt",
            type: "uint128",
          },
          {
            name: "last-repayment-date",
            type: "uint128",
          },
          {
            name: "nft-id",
            type: "uint128",
          },
        ],
      },
    },
  ],
  non_fungible_tokens: [],
  variables: [
    {
      access: "variable",
      name: "last-vault-id",
      type: "uint128",
    },
    {
      access: "variable",
      name: "order-id-nonce",
      type: "uint128",
    },
  ],
};
