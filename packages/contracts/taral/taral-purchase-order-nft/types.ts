import { ClarityTypes, Transaction } from "lib-shared";

export interface TaralPurchaseOrderNftContract {
    burn: (
        tokenId: number | bigint,
        sender: string
    ) => Transaction<boolean, bigint>;
    mint: (receiver: string) => Transaction<bigint, bigint>;
    setTokenUri: (
        tokenId: number | bigint,
        value: string
    ) => Transaction<boolean, bigint>;
    transfer: (
        tokenId: number | bigint,
        sender: string,
        receiver: string
    ) => Transaction<boolean, bigint>;
    getLastTokenId: () => Promise<ClarityTypes.Response<bigint, null>>;
    getOwner: (
        id: number | bigint
    ) => Promise<ClarityTypes.Response<string | null, null>>;
    getTokenUri: (
        tokenId: number | bigint
    ) => Promise<ClarityTypes.Response<string | null, null>>;
    contractOwner: () => Promise<string>;
    errNotTokenOwner: () => Promise<ClarityTypes.Response<null, bigint>>;
    errOwnerOnly: () => Promise<ClarityTypes.Response<null, bigint>>;
    mintPrice: () => Promise<bigint>;
    lastTokenId: () => Promise<bigint>;
    tokenUris: (key: bigint) => Promise<string | null>;
}
