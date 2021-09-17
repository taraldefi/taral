import { Transaction } from "../../../../../transaction";
import { ClarityTypes } from "../../../../../types";

export interface BnsContract {
  nameImport: (
    namespace: Buffer,
    name: Buffer,
    beneficiary: string,
    zonefileHash: Buffer
  ) => Transaction<boolean, bigint>;
  namePreorder: (
    hashedSaltedFqn: Buffer,
    stxToBurn: number | bigint
  ) => Transaction<bigint, bigint>;
  nameRegister: (
    namespace: Buffer,
    name: Buffer,
    salt: Buffer,
    zonefileHash: Buffer
  ) => Transaction<boolean, bigint>;
  nameRenewal: (
    namespace: Buffer,
    name: Buffer,
    stxToBurn: number | bigint,
    newOwner: string | null,
    zonefileHash: Buffer | null
  ) => Transaction<boolean, bigint>;
  nameRevoke: (namespace: Buffer, name: Buffer) => Transaction<boolean, bigint>;
  nameTransfer: (
    namespace: Buffer,
    name: Buffer,
    newOwner: string,
    zonefileHash: Buffer | null
  ) => Transaction<boolean, bigint>;
  nameUpdate: (
    namespace: Buffer,
    name: Buffer,
    zonefileHash: Buffer
  ) => Transaction<boolean, bigint>;
  namespacePreorder: (
    hashedSaltedNamespace: Buffer,
    stxToBurn: number | bigint
  ) => Transaction<bigint, bigint>;
  namespaceReady: (namespace: Buffer) => Transaction<boolean, bigint>;
  namespaceReveal: (
    namespace: Buffer,
    namespaceSalt: Buffer,
    pFuncBase: number | bigint,
    pFuncCoeff: number | bigint,
    pFuncB1: number | bigint,
    pFuncB2: number | bigint,
    pFuncB3: number | bigint,
    pFuncB4: number | bigint,
    pFuncB5: number | bigint,
    pFuncB6: number | bigint,
    pFuncB7: number | bigint,
    pFuncB8: number | bigint,
    pFuncB9: number | bigint,
    pFuncB10: number | bigint,
    pFuncB11: number | bigint,
    pFuncB12: number | bigint,
    pFuncB13: number | bigint,
    pFuncB14: number | bigint,
    pFuncB15: number | bigint,
    pFuncB16: number | bigint,
    pFuncNonAlphaDiscount: number | bigint,
    pFuncNoVowelDiscount: number | bigint,
    lifetime: number | bigint,
    namespaceImport: string
  ) => Transaction<boolean, bigint>;
  namespaceRevokeFunctionPriceEdition: (
    namespace: Buffer
  ) => Transaction<boolean, bigint>;
  namespaceUpdateFunctionPrice: (
    namespace: Buffer,
    pFuncBase: number | bigint,
    pFuncCoeff: number | bigint,
    pFuncB1: number | bigint,
    pFuncB2: number | bigint,
    pFuncB3: number | bigint,
    pFuncB4: number | bigint,
    pFuncB5: number | bigint,
    pFuncB6: number | bigint,
    pFuncB7: number | bigint,
    pFuncB8: number | bigint,
    pFuncB9: number | bigint,
    pFuncB10: number | bigint,
    pFuncB11: number | bigint,
    pFuncB12: number | bigint,
    pFuncB13: number | bigint,
    pFuncB14: number | bigint,
    pFuncB15: number | bigint,
    pFuncB16: number | bigint,
    pFuncNonAlphaDiscount: number | bigint,
    pFuncNoVowelDiscount: number | bigint
  ) => Transaction<boolean, bigint>;
  canNameBeRegistered: (
    namespace: Buffer,
    name: Buffer
  ) => Promise<ClarityTypes.Response<boolean, bigint>>;
  canNamespaceBeRegistered: (
    namespace: Buffer
  ) => Promise<ClarityTypes.Response<boolean, null>>;
  canReceiveName: (
    owner: string
  ) => Promise<ClarityTypes.Response<boolean, bigint>>;
  checkNameOpsPreconditions: (
    namespace: Buffer,
    name: Buffer
  ) => Promise<
    ClarityTypes.Response<
      {
        "name-props": {
          "imported-at": bigint | null;
          "registered-at": bigint | null;
          "revoked-at": bigint | null;
          "zonefile-hash": Buffer;
        };
        "namespace-props": {
          "can-update-price-function": boolean;
          "launched-at": bigint | null;
          lifetime: bigint;
          "namespace-import": string;
          "price-function": {
            base: bigint;
            buckets: bigint[];
            coeff: bigint;
            "no-vowel-discount": bigint;
            "nonalpha-discount": bigint;
          };
          "revealed-at": bigint;
        };
        owner: string;
      },
      bigint
    >
  >;
  getNamePrice: (
    namespace: Buffer,
    name: Buffer
  ) => Promise<ClarityTypes.Response<bigint, bigint>>;
  getNamespacePrice: (
    namespace: Buffer
  ) => Promise<ClarityTypes.Response<bigint, bigint>>;
  getNamespaceProperties: (namespace: Buffer) => Promise<
    ClarityTypes.Response<
      {
        namespace: Buffer;
        properties: {
          "can-update-price-function": boolean;
          "launched-at": bigint | null;
          lifetime: bigint;
          "namespace-import": string;
          "price-function": {
            base: bigint;
            buckets: bigint[];
            coeff: bigint;
            "no-vowel-discount": bigint;
            "nonalpha-discount": bigint;
          };
          "revealed-at": bigint;
        };
      },
      bigint
    >
  >;
  isNameInGracePeriod: (
    namespace: Buffer,
    name: Buffer
  ) => Promise<ClarityTypes.Response<boolean, bigint>>;
  isNameLeaseExpired: (
    namespace: Buffer,
    name: Buffer
  ) => Promise<ClarityTypes.Response<boolean, bigint>>;
  nameResolve: (
    namespace: Buffer,
    name: Buffer
  ) => Promise<
    ClarityTypes.Response<
      {
        "lease-ending-at": bigint | null;
        "lease-started-at": bigint;
        owner: string;
        "zonefile-hash": Buffer;
      },
      bigint
    >
  >;
  resolvePrincipal: (owner: string) => Promise<
    ClarityTypes.Response<
      {
        name: Buffer;
        namespace: Buffer;
      },
      {
        code: bigint;
        name: {
          name: Buffer;
          namespace: Buffer;
        } | null;
      }
    >
  >;
  ERR_INSUFFICIENT_FUNDS: () => Promise<bigint>;
  ERR_NAMESPACE_ALREADY_EXISTS: () => Promise<bigint>;
  ERR_NAMESPACE_ALREADY_LAUNCHED: () => Promise<bigint>;
  ERR_NAMESPACE_BLANK: () => Promise<bigint>;
  ERR_NAMESPACE_CHARSET_INVALID: () => Promise<bigint>;
  ERR_NAMESPACE_HASH_MALFORMED: () => Promise<bigint>;
  ERR_NAMESPACE_NOT_FOUND: () => Promise<bigint>;
  ERR_NAMESPACE_NOT_LAUNCHED: () => Promise<bigint>;
  ERR_NAMESPACE_OPERATION_UNAUTHORIZED: () => Promise<bigint>;
  ERR_NAMESPACE_PREORDER_ALREADY_EXISTS: () => Promise<bigint>;
  ERR_NAMESPACE_PREORDER_CLAIMABILITY_EXPIRED: () => Promise<bigint>;
  ERR_NAMESPACE_PREORDER_EXPIRED: () => Promise<bigint>;
  ERR_NAMESPACE_PREORDER_LAUNCHABILITY_EXPIRED: () => Promise<bigint>;
  ERR_NAMESPACE_PREORDER_NOT_FOUND: () => Promise<bigint>;
  ERR_NAMESPACE_PRICE_FUNCTION_INVALID: () => Promise<bigint>;
  ERR_NAMESPACE_STX_BURNT_INSUFFICIENT: () => Promise<bigint>;
  ERR_NAMESPACE_UNAVAILABLE: () => Promise<bigint>;
  ERR_NAME_ALREADY_CLAIMED: () => Promise<bigint>;
  ERR_NAME_BLANK: () => Promise<bigint>;
  ERR_NAME_CHARSET_INVALID: () => Promise<bigint>;
  ERR_NAME_CLAIMABILITY_EXPIRED: () => Promise<bigint>;
  ERR_NAME_COULD_NOT_BE_MINTED: () => Promise<bigint>;
  ERR_NAME_COULD_NOT_BE_TRANSFERED: () => Promise<bigint>;
  ERR_NAME_EXPIRED: () => Promise<bigint>;
  ERR_NAME_GRACE_PERIOD: () => Promise<bigint>;
  ERR_NAME_HASH_MALFORMED: () => Promise<bigint>;
  ERR_NAME_NOT_FOUND: () => Promise<bigint>;
  ERR_NAME_NOT_RESOLVABLE: () => Promise<bigint>;
  ERR_NAME_OPERATION_UNAUTHORIZED: () => Promise<bigint>;
  ERR_NAME_PREORDERED_BEFORE_NAMESPACE_LAUNCH: () => Promise<bigint>;
  ERR_NAME_PREORDER_ALREADY_EXISTS: () => Promise<bigint>;
  ERR_NAME_PREORDER_EXPIRED: () => Promise<bigint>;
  ERR_NAME_PREORDER_FUNDS_INSUFFICIENT: () => Promise<bigint>;
  ERR_NAME_PREORDER_NOT_FOUND: () => Promise<bigint>;
  ERR_NAME_REVOKED: () => Promise<bigint>;
  ERR_NAME_STX_BURNT_INSUFFICIENT: () => Promise<bigint>;
  ERR_NAME_TRANSFER_FAILED: () => Promise<bigint>;
  ERR_NAME_UNAVAILABLE: () => Promise<bigint>;
  ERR_PANIC: () => Promise<bigint>;
  ERR_PRINCIPAL_ALREADY_ASSOCIATED: () => Promise<bigint>;
  NAMESPACE_LAUNCHABILITY_TTL: () => Promise<bigint>;
  NAMESPACE_PREORDER_CLAIMABILITY_TTL: () => Promise<bigint>;
  NAMESPACE_PRICE_TIERS: () => Promise<bigint[]>;
  NAME_GRACE_PERIOD_DURATION: () => Promise<bigint>;
  NAME_PREORDER_CLAIMABILITY_TTL: () => Promise<bigint>;
  attachmentIndex: () => Promise<bigint>;
  namePreorders: (key: {
    buyer: string;
    "hashed-salted-fqn": Buffer;
  }) => Promise<{
    claimed: boolean;
    "created-at": bigint;
    "stx-burned": bigint;
  } | null>;
  nameProperties: (key: { name: Buffer; namespace: Buffer }) => Promise<{
    "imported-at": bigint | null;
    "registered-at": bigint | null;
    "revoked-at": bigint | null;
    "zonefile-hash": Buffer;
  } | null>;
  namespacePreorders: (key: {
    buyer: string;
    "hashed-salted-namespace": Buffer;
  }) => Promise<{
    claimed: boolean;
    "created-at": bigint;
    "stx-burned": bigint;
  } | null>;
  namespaces: (key: Buffer) => Promise<{
    "can-update-price-function": boolean;
    "launched-at": bigint | null;
    lifetime: bigint;
    "namespace-import": string;
    "price-function": {
      base: bigint;
      buckets: bigint[];
      coeff: bigint;
      "no-vowel-discount": bigint;
      "nonalpha-discount": bigint;
    };
    "revealed-at": bigint;
  } | null>;
  ownerName: (key: string) => Promise<{
    name: Buffer;
    namespace: Buffer;
  } | null>;
}
