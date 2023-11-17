
  import { ClarityAbi } from 'lib-shared';

  export const Sip009NftInterface: ClarityAbi = {
  "clarity_version": "Clarity2",
  "epoch": "Epoch21",
  "functions": [
    {
      "access": "public",
      "args": [
        {
          "name": "recipient",
          "type": "principal"
        }
      ],
      "name": "mint",
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
          "name": "id",
          "type": "uint128"
        },
        {
          "name": "sender",
          "type": "principal"
        },
        {
          "name": "recipient",
          "type": "principal"
        }
      ],
      "name": "transfer",
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
      "args": [],
      "name": "get-last-token-id",
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
      "access": "read_only",
      "args": [
        {
          "name": "id",
          "type": "uint128"
        }
      ],
      "name": "get-owner",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "optional": "principal"
            }
          }
        }
      }
    },
    {
      "access": "read_only",
      "args": [
        {
          "name": "id",
          "type": "uint128"
        }
      ],
      "name": "get-token-uri",
      "outputs": {
        "type": {
          "response": {
            "error": "none",
            "ok": {
              "optional": "none"
            }
          }
        }
      }
    }
  ],
  "fungible_tokens": [],
  "maps": [],
  "non_fungible_tokens": [
    {
      "name": "sip009-nft",
      "type": "uint128"
    }
  ],
  "variables": [
    {
      "access": "constant",
      "name": "CONTRACT_OWNER",
      "type": "principal"
    },
    {
      "access": "constant",
      "name": "MINT",
      "type": "uint128"
    },
    {
      "access": "constant",
      "name": "err-not-token-owner",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-owner-only",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "constant",
      "name": "err-token-id-failure",
      "type": {
        "response": {
          "error": "uint128",
          "ok": "none"
        }
      }
    },
    {
      "access": "variable",
      "name": "last-token-id",
      "type": "uint128"
    }
  ]
};