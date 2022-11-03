import { ClarityAbi } from "lib-shared";

export const TaralExporterInterface: ClarityAbi = {
  functions: [
    {
      access: "private",
      args: [
        {
          name: "exporter",
          type: "principal",
        },
      ],
      name: "get-or-create-exporter-id",
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
          name: "exporter",
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
          name: "exporter",
          type: "principal",
        },
        {
          name: "exporterName",
          type: {
            "string-utf8": {
              length: 100,
            },
          },
        },
        {
          name: "exporterCategory",
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
          name: "exporter",
          type: "principal",
        },
      ],
      name: "get-exporter-id",
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
          name: "exporter",
          type: "principal",
        },
      ],
      name: "get-exporter-order",
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
      name: "get-exporter-orders",
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
          name: "exporter",
          type: "principal",
        },
      ],
      name: "get-exporter-profile",
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
      name: "get-exporters",
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
      name: "get-next-exporter-id",
      outputs: {
        type: "uint128",
      },
    },
  ],
  fungible_tokens: [],
  maps: [
    {
      key: "principal",
      name: "exporterByPrincipal",
      value: "uint128",
    },
    {
      key: {
        tuple: [
          {
            name: "exporterId",
            type: "uint128",
          },
        ],
      },
      name: "exporterProfile",
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
            name: "exporterId",
            type: "uint128",
          },
          {
            name: "id",
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
      name: "ERR-EXPORTER-ALREADY-REGISTERED",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "ERR-EXPORTER-NOT-REGISTERED",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
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
      name: "exporterIdNonce",
      type: "uint128",
    },
  ],
};
