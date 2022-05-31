import { ClarityAbi } from "lib-shared";

export const TaralStorageInterface: ClarityAbi = {
  functions: [
    {
      access: "private",
      args: [],
      name: "is-owner",
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
          name: "name",
          type: {
            "string-utf8": {
              length: 128,
            },
          },
        },
        {
          name: "hash",
          type: {
            "string-utf8": {
              length: 256,
            },
          },
        },
        {
          name: "owners",
          type: {
            list: {
              length: 50,
              type: {
                tuple: [
                  {
                    name: "address",
                    type: "principal",
                  },
                  {
                    name: "can-read",
                    type: "bool",
                  },
                  {
                    name: "can-write",
                    type: "bool",
                  },
                ],
              },
            },
          },
        },
      ],
      name: "register-file",
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
          name: "member",
          type: "principal",
        },
      ],
      name: "get-files-by-member",
      outputs: {
        type: {
          tuple: [
            {
              name: "file-ids",
              type: {
                list: {
                  length: 1000,
                  type: "uint128",
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
      name: "files",
      value: {
        tuple: [
          {
            name: "created-at",
            type: {
              optional: "uint128",
            },
          },
          {
            name: "hash",
            type: {
              "string-utf8": {
                length: 256,
              },
            },
          },
          {
            name: "last-modified",
            type: {
              optional: "uint128",
            },
          },
          {
            name: "name",
            type: {
              "string-utf8": {
                length: 128,
              },
            },
          },
          {
            name: "owners",
            type: {
              list: {
                length: 50,
                type: {
                  tuple: [
                    {
                      name: "address",
                      type: "principal",
                    },
                    {
                      name: "can-read",
                      type: "bool",
                    },
                    {
                      name: "can-write",
                      type: "bool",
                    },
                  ],
                },
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
            name: "member",
            type: "principal",
          },
        ],
      },
      name: "files-by-member",
      value: {
        tuple: [
          {
            name: "file-ids",
            type: {
              list: {
                length: 1000,
                type: "uint128",
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
      name: "ERR_NOT_FOUND",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "ERR_UNAUTHORIZED",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "constant",
      name: "ERR_UNEXPECTED",
      type: {
        response: {
          error: "uint128",
          ok: "none",
        },
      },
    },
    {
      access: "variable",
      name: "files-count",
      type: "uint128",
    },
    {
      access: "variable",
      name: "owner",
      type: "principal",
    },
  ],
};
