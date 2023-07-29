import { ClarityAbi } from "lib-shared";

export const ExporterStorageInterface: ClarityAbi = {
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
                  name: "order-id",
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
          name: "exporter",
          type: "principal",
        },
        {
          name: "exporter-id",
          type: "uint128",
        },
      ],
      name: "add-exporter",
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
          name: "exporter-id",
          type: "uint128",
        },
        {
          name: "exporter-name",
          type: {
            "string-utf8": {
              length: 100,
            },
          },
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
          name: "exporter-category",
          type: {
            "string-utf8": {
              length: 100,
            },
          },
        },
      ],
      name: "add-exporter-profile",
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
          name: "id",
          type: "uint128",
        },
        {
          name: "exporter-id",
          type: "uint128",
        },
        {
          name: "order-id",
          type: "uint128",
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
      args: [],
      name: "increment-exporter-id-nonce",
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
                name: "exporter-id",
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
                name: "category",
                type: {
                  "string-utf8": {
                    length: 100,
                  },
                },
              },
              {
                name: "created",
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
                name: "name",
                type: {
                  "string-utf8": {
                    length: 100,
                  },
                },
              },
              {
                name: "orders-next-avail-id",
                type: "uint128",
              },
            ],
          },
        },
      ],
      name: "update-exporter-profile",
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
          name: "exporter",
          type: "principal",
        },
      ],
      name: "get-exporter-by-principal",
      outputs: {
        type: {
          optional: "uint128",
        },
      },
    },
    {
      access: "read_only",
      args: [],
      name: "get-exporter-id-nonce",
      outputs: {
        type: "uint128",
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
                name: "order-id",
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
                    name: "order-id",
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
                name: "created",
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
                name: "name",
                type: {
                  "string-utf8": {
                    length: 100,
                  },
                },
              },
              {
                name: "orders-next-avail-id",
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
                    name: "created",
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
                    name: "name",
                    type: {
                      "string-utf8": {
                        length: 100,
                      },
                    },
                  },
                  {
                    name: "orders-next-avail-id",
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
          type: {
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
                name: "created",
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
                name: "name",
                type: {
                  "string-utf8": {
                    length: 100,
                  },
                },
              },
              {
                name: "orders-next-avail-id",
                type: "uint128",
              },
            ],
          },
        },
      ],
      name: "get-orders-next-avail-id",
      outputs: {
        type: "uint128",
      },
    },
  ],
  fungible_tokens: [],
  maps: [
    {
      key: "principal",
      name: "exporter-by-principal",
      value: "uint128",
    },
    {
      key: {
        tuple: [
          {
            name: "exporter-id",
            type: "uint128",
          },
        ],
      },
      name: "exporter-profile",
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
            name: "created",
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
            name: "name",
            type: {
              "string-utf8": {
                length: 100,
              },
            },
          },
          {
            name: "orders-next-avail-id",
            type: "uint128",
          },
        ],
      },
    },
    {
      key: {
        tuple: [
          {
            name: "exporter-id",
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
            name: "order-id",
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
      name: "exporter-id-nonce",
      type: "uint128",
    },
  ],
};
