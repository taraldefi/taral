import { Transaction } from "lib-shared";
import { ClarityTypes } from "lib-shared";

export interface Sip009NftContract {
  mint: (recipient: string) => Transaction<bigint, bigint>;
  transfer: (
    id: number | bigint,
    sender: string,
    recipient: string,
  ) => Transaction<boolean, bigint>;
  getLastTokenId: () => Promise<ClarityTypes.Response<bigint, null>>;
  getOwner: (
    id: number | bigint,
  ) => Promise<ClarityTypes.Response<string | null, null>>;
  getTokenUri: (
    id: number | bigint,
  ) => Promise<ClarityTypes.Response<null | null, null>>;
  CONTRACT_OWNER: () => Promise<string>;
  MINT: () => Promise<bigint>;
  errNotTokenOwner: () => Promise<ClarityTypes.Response<null, bigint>>;
  errOwnerOnly: () => Promise<ClarityTypes.Response<null, bigint>>;
  errTokenIdFailure: () => Promise<ClarityTypes.Response<null, bigint>>;
  lastTokenId: () => Promise<bigint>;
}
