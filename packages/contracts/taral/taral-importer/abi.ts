import { ClarityAbi } from "lib-shared";

export const TaralImporterInterface: ClarityAbi = {
  functions: [
    {
      access: "private",
      args: [
        {
          name: "importer",
          type: "principal",
        },
      ],
      name: "get-or-create-importer-id",
      outputs: {
        type: "uint128",
      },
    },
    {
      access: "private",
      args: [
        {
          name: "value",
          type: {
            optional: {
              tuple: [
                {
                  name: "orderId",
                  type: "uint128",
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
          name: "newOrderId",
          type: "uint128",
        },
        {
          name: "importer",
          type: "principal",
        },
      ],
      name: "append-order",
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
          name: "importer",
          type: "principal",
        },
        {
          name: "importerName",
          type: {
            "string-utf8": {
              length: 100,
            },
          },
        },
        {
          name: "importerCategory",
          type: {
            "string-utf8": {
              length: 100,
            },
          },
        },
      ],
      name: "register",
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
          name: "importer",
          type: "principal",
        },
      ],
      name: "get-importer-id",
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
          name: "id",
          type: "uint128",
        },
        {
          name: "importer",
          type: "principal",
        },
      ],
      name: "get-importer-order",
      outputs: {
        type: {
          optional: {
            tuple: [
              {
                name: "orderId",
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
          name: "ids",
          type: {
            list: {
              length: 10,
              type: "uint128",
            },
          },
        },
        {
          name: "principals",
          type: {
            list: {
              length: 10,
              type: "principal",
            },
          },
        },
      ],
      name: "get-importer-orders",
      outputs: {
        type: {
          list: {
            length: 10,
            type: {
              optional: {
                tuple: [
                  {
                    name: "orderId",
                    type: "uint128",
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
          name: "importer",
          type: "principal",
        },
      ],
      name: "get-importer-profile",
      outputs: {
        type: {
          optional: {
            tuple: [
              {
                name: "category",
                type: {
                  "string-utf8": {
                    length: 100,
                  },
                },
              },
              {
                name: "name",
                type: {
                  "string-utf8": {
                    length: 100,
                  },
                },
              },
              {
                name: "ordersNextAvailId",
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
          name: "principals",
          type: {
            list: {
              length: 10,
              type: "principal",
            },
          },
        },
      ],
      name: "get-importers",
      outputs: {
        type: {
          list: {
            length: 10,
            type: {
              optional: {
                tuple: [
                  {
                    name: "category",
                    type: {
                      "string-utf8": {
                        length: 100,
                      },
                    },
                  },
                  {
                    name: "name",
                    type: {
                      "string-utf8": {
                        length: 100,
                      },
                    },
                  },
                  {
                    name: "ordersNextAvailId",
                    type: "uint128",
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
      args: [],
      name: "get-next-importer-id",
      outputs: {
        type: "uint128",
      },
    },
  ],
  fungible_tokens: [],
  maps: [
    {
      key: "principal",
      name: "importerByPrincipal",
      value: "uint128",
    },
    {
      key: {
        tuple: [
          {
            name: "importerId",
            type: "uint128",
          },
        ],
      },
      name: "importerProfile",
      value: {
        tuple: [
          {
            name: "category",
            type: {
              "string-utf8": {
                length: 100,
              },
            },
          },
          {
            name: "name",
            type: {
              "string-utf8": {
                length: 100,
              },
            },
          },
          {
            name: "ordersNextAvailId",
            type: "uint128",
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
          {
            name: "importerId",
            type: "uint128",
          },
        ],
      },
      name: "orders",
      value: {
        tuple: [
          {
            name: "orderId",
            type: "uint128",
          },
        ],
      },
    },
  ],
  non_fungible_tokens: [],
  variables: [
    {
      access: "constant",
      name: "ERR-GENERIC",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "ERR-IMPORTER-ALREADY-REGISTERED",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "ERR-IMPORTER-NOT-REGISTERED",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "ERR-PERMISSION-DENIED",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "variable",
      name: "importerIdNonce",
      type: "uint128",
    },
  ],
};
