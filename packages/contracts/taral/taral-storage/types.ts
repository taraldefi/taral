import { ClarityTypes, Transaction } from "lib-shared";

export interface TaralStorageContract {
  registerFile: (
    name: string,
    hash: string,
    owners: {
      address: string;
      "can-read": boolean;
      "can-write": boolean;
    }[]
  ) => Transaction<boolean, null>;
  getFilesByMember: (member: string) => Promise<{
    "file-ids": bigint[];
  }>;
  ERR_NOT_FOUND: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_UNAUTHORIZED: () => Promise<ClarityTypes.Response<null, bigint>>;
  ERR_UNEXPECTED: () => Promise<ClarityTypes.Response<null, bigint>>;
  filesCount: () => Promise<bigint>;
  owner: () => Promise<string>;
  files: (key: { id: bigint }) => Promise<{
    "created-at": bigint | null;
    hash: string;
    "last-modified": bigint | null;
    name: string;
    owners: {
      address: string;
      "can-read": boolean;
      "can-write": boolean;
    }[];
  } | null>;
  filesByMember: (key: { member: string }) => Promise<{
    "file-ids": bigint[];
  } | null>;
}
