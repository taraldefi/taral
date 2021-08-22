import { ClarityTypes } from "../../../lib/clarity/types";
import { IMetadata } from "../../../lib/providers/types";
import { Transaction } from "../../../lib/transaction";

// prettier-ignore

export interface BnsContract {
    nameImport: (namespace: Buffer, name: Buffer, beneficiary: string, zonefileHash: Buffer, metadata: IMetadata) => Transaction<boolean, number>;
    namePreorder: (hashedSaltedFqn: Buffer, stxToBurn: number, metadata: IMetadata) => Transaction<number, number>;
    nameRegister: (namespace: Buffer, name: Buffer, salt: Buffer, zonefileHash: Buffer, metadata: IMetadata) => Transaction<boolean, number>;
    nameRenewal: (namespace: Buffer, name: Buffer, stxToBurn: number, newOwner: string | null, zonefileHash: Buffer | null, metadata: IMetadata) => Transaction<boolean, number>;
    nameRevoke: (namespace: Buffer, name: Buffer, metadata: IMetadata) => Transaction<boolean, number>;
    nameTransfer: (namespace: Buffer, name: Buffer, newOwner: string, zonefileHash: Buffer | null, metadata: IMetadata) => Transaction<boolean, number>;
    nameUpdate: (namespace: Buffer, name: Buffer, zonefileHash: Buffer, metadata: IMetadata) => Transaction<boolean, number>;
    namespacePreorder: (hashedSaltedNamespace: Buffer, stxToBurn: number, metadata: IMetadata) => Transaction<number, number>;
    namespaceReady: (namespace: Buffer, metadata: IMetadata) => Transaction<boolean, number>;
    namespaceReveal: (namespace: Buffer, namespaceSalt: Buffer, pFuncBase: number, pFuncCoeff: number, pFuncB1: number, pFuncB2: number, pFuncB3: number, pFuncB4: number, pFuncB5: number, pFuncB6: number, pFuncB7: number, pFuncB8: number, pFuncB9: number, pFuncB10: number, pFuncB11: number, pFuncB12: number, pFuncB13: number, pFuncB14: number, pFuncB15: number, pFuncB16: number, pFuncNonAlphaDiscount: number, pFuncNoVowelDiscount: number, lifetime: number, namespaceImport: string, metadata: IMetadata) => Transaction<boolean, number>;
    namespaceRevokeFunctionPriceEdition: (namespace: Buffer, metadata: IMetadata) => Transaction<boolean, number>;
    namespaceUpdateFunctionPrice: (namespace: Buffer, pFuncBase: number, pFuncCoeff: number, pFuncB1: number, pFuncB2: number, pFuncB3: number, pFuncB4: number, pFuncB5: number, pFuncB6: number, pFuncB7: number, pFuncB8: number, pFuncB9: number, pFuncB10: number, pFuncB11: number, pFuncB12: number, pFuncB13: number, pFuncB14: number, pFuncB15: number, pFuncB16: number, pFuncNonAlphaDiscount: number, pFuncNoVowelDiscount: number, metadata: IMetadata) => Transaction<boolean, number>;
    canNameBeRegistered: (namespace: Buffer, name: Buffer, metadata: IMetadata) => Promise<ClarityTypes.Response<boolean, number>>;
    canNamespaceBeRegistered: (namespace: Buffer, metadata: IMetadata) => Promise<ClarityTypes.Response<boolean, null>>;
    canReceiveName: (owner: string, metadata: IMetadata) => Promise<ClarityTypes.Response<boolean, number>>;
    checkNameOpsPreconditions: (namespace: Buffer, name: Buffer, metadata: IMetadata) => Promise<ClarityTypes.Response<{
        "name-props": {
            "imported-at": number | null;
            "registered-at": number | null;
            "revoked-at": number | null;
            "zonefile-hash": Buffer
        };
        "namespace-props": {
            "can-update-price-function": boolean;
            "launched-at": number | null;
            "lifetime": number;
            "namespace-import": string;
            "price-function": {
                "base": number;
                "buckets": number[];
                "coeff": number;
                "no-vowel-discount": number;
                "nonalpha-discount": number
            };
            "revealed-at": number
        };
        "owner": string
    }, number>>;
    getNamePrice: (namespace: Buffer, name: Buffer, metadata: IMetadata) => Promise<ClarityTypes.Response<number, number>>;
    getNamespacePrice: (namespace: Buffer, metadata: IMetadata) => Promise<ClarityTypes.Response<number, number>>;
    getNamespaceProperties: (namespace: Buffer, metadata: IMetadata) => Promise<ClarityTypes.Response<{
        "namespace": Buffer;
        "properties": {
            "can-update-price-function": boolean;
            "launched-at": number | null;
            "lifetime": number;
            "namespace-import": string;
            "price-function": {
                "base": number;
                "buckets": number[];
                "coeff": number;
                "no-vowel-discount": number;
                "nonalpha-discount": number
            };
            "revealed-at": number
        }
    }, number>>;
    isNameInGracePeriod: (namespace: Buffer, name: Buffer, metadata: IMetadata) => Promise<ClarityTypes.Response<boolean, number>>;
    isNameLeaseExpired: (namespace: Buffer, name: Buffer, metadata: IMetadata) => Promise<ClarityTypes.Response<boolean, number>>;
    nameResolve: (namespace: Buffer, name: Buffer, metadata: IMetadata) => Promise<ClarityTypes.Response<{
        "lease-ending-at": number | null;
        "lease-started-at": number;
        "owner": string;
        "zonefile-hash": Buffer
    }, number>>;
    resolvePrincipal: (owner: string, metadata: IMetadata) => Promise<ClarityTypes.Response<{
        "name": Buffer;
        "namespace": Buffer
    }, {
        "code": number;
        "name": {
            "name": Buffer;
            "namespace": Buffer
        } | null
    }>>;
    ERR_INSUFFICIENT_FUNDS: () => Promise<number>;
    ERR_NAMESPACE_ALREADY_EXISTS: () => Promise<number>;
    ERR_NAMESPACE_ALREADY_LAUNCHED: () => Promise<number>;
    ERR_NAMESPACE_BLANK: () => Promise<number>;
    ERR_NAMESPACE_CHARSET_INVALID: () => Promise<number>;
    ERR_NAMESPACE_HASH_MALFORMED: () => Promise<number>;
    ERR_NAMESPACE_NOT_FOUND: () => Promise<number>;
    ERR_NAMESPACE_NOT_LAUNCHED: () => Promise<number>;
    ERR_NAMESPACE_OPERATION_UNAUTHORIZED: () => Promise<number>;
    ERR_NAMESPACE_PREORDER_ALREADY_EXISTS: () => Promise<number>;
    ERR_NAMESPACE_PREORDER_CLAIMABILITY_EXPIRED: () => Promise<number>;
    ERR_NAMESPACE_PREORDER_EXPIRED: () => Promise<number>;
    ERR_NAMESPACE_PREORDER_LAUNCHABILITY_EXPIRED: () => Promise<number>;
    ERR_NAMESPACE_PREORDER_NOT_FOUND: () => Promise<number>;
    ERR_NAMESPACE_PRICE_FUNCTION_INVALID: () => Promise<number>;
    ERR_NAMESPACE_STX_BURNT_INSUFFICIENT: () => Promise<number>;
    ERR_NAMESPACE_UNAVAILABLE: () => Promise<number>;
    ERR_NAME_ALREADY_CLAIMED: () => Promise<number>;
    ERR_NAME_BLANK: () => Promise<number>;
    ERR_NAME_CHARSET_INVALID: () => Promise<number>;
    ERR_NAME_CLAIMABILITY_EXPIRED: () => Promise<number>;
    ERR_NAME_COULD_NOT_BE_MINTED: () => Promise<number>;
    ERR_NAME_COULD_NOT_BE_TRANSFERED: () => Promise<number>;
    ERR_NAME_EXPIRED: () => Promise<number>;
    ERR_NAME_GRACE_PERIOD: () => Promise<number>;
    ERR_NAME_HASH_MALFORMED: () => Promise<number>;
    ERR_NAME_NOT_FOUND: () => Promise<number>;
    ERR_NAME_NOT_RESOLVABLE: () => Promise<number>;
    ERR_NAME_OPERATION_UNAUTHORIZED: () => Promise<number>;
    ERR_NAME_PREORDERED_BEFORE_NAMESPACE_LAUNCH: () => Promise<number>;
    ERR_NAME_PREORDER_ALREADY_EXISTS: () => Promise<number>;
    ERR_NAME_PREORDER_EXPIRED: () => Promise<number>;
    ERR_NAME_PREORDER_FUNDS_INSUFFICIENT: () => Promise<number>;
    ERR_NAME_PREORDER_NOT_FOUND: () => Promise<number>;
    ERR_NAME_REVOKED: () => Promise<number>;
    ERR_NAME_STX_BURNT_INSUFFICIENT: () => Promise<number>;
    ERR_NAME_TRANSFER_FAILED: () => Promise<number>;
    ERR_NAME_UNAVAILABLE: () => Promise<number>;
    ERR_PANIC: () => Promise<number>;
    ERR_PRINCIPAL_ALREADY_ASSOCIATED: () => Promise<number>;
    NAMESPACE_LAUNCHABILITY_TTL: () => Promise<number>;
    NAMESPACE_PREORDER_CLAIMABILITY_TTL: () => Promise<number>;
    NAMESPACE_PRICE_TIERS: () => Promise<number[]>;
    NAME_GRACE_PERIOD_DURATION: () => Promise<number>;
    NAME_PREORDER_CLAIMABILITY_TTL: () => Promise<number>;
    attachmentIndex: () => Promise<number>;
    namePreorders: (key: {
        "buyer": string;
        "hashed-salted-fqn": Buffer
    }) => Promise<{
        "claimed": boolean;
        "created-at": number;
        "stx-burned": number
    } | null>;
    nameProperties: (key: {
        "name": Buffer;
        "namespace": Buffer
    }) => Promise<{
        "imported-at": number | null;
        "registered-at": number | null;
        "revoked-at": number | null;
        "zonefile-hash": Buffer
    } | null>;
    namespacePreorders: (key: {
        "buyer": string;
        "hashed-salted-namespace": Buffer
    }) => Promise<{
        "claimed": boolean;
        "created-at": number;
        "stx-burned": number
    } | null>;
    namespaces: (key: Buffer) => Promise<{
        "can-update-price-function": boolean;
        "launched-at": number | null;
        "lifetime": number;
        "namespace-import": string;
        "price-function": {
            "base": number;
            "buckets": number[];
            "coeff": number;
            "no-vowel-discount": number;
            "nonalpha-discount": number
        };
        "revealed-at": number
    } | null>;
    ownerName: (key: string) => Promise<{
        "name": Buffer;
        "namespace": Buffer
    } | null>;
}
