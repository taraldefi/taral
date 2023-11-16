import { Transaction } from "lib-shared";
import { ClarityTypes } from "lib-shared";

export interface TaralFileStorageContract {
  deleteFileAuthorizations: (
    fileId: string,
    participant: string,
  ) => Transaction<boolean, null>;
  deleteFilesByName: (
    filename: string,
    participant: string,
    hash: Buffer,
  ) => Transaction<boolean, null>;
  setFileAuthorizations: (
    fileId: string,
    participant: string,
    owns: boolean,
    canWrite: boolean,
    canRead: boolean,
  ) => Transaction<boolean, null>;
  setFileHash: (
    fileId: string,
    hash: Buffer,
    filename: string,
  ) => Transaction<boolean, null>;
  setFileVersions: (
    fileId: string,
    hash: Buffer,
    changedBy: string,
  ) => Transaction<boolean, null>;
  setFiles: (
    fileId: string,
    filename: string,
    hash: Buffer,
  ) => Transaction<boolean, null>;
  setFilesByName: (
    filename: string,
    participant: string,
    hash: Buffer,
    fileId: string,
  ) => Transaction<boolean, null>;
  updateFileAuthorizations: (
    keyTuple: {
      id: string;
      participant: string;
    },
    valueTuple: {
      "can-read": boolean;
      "can-write": boolean;
      owns: boolean;
    },
  ) => Transaction<boolean, null>;
  updateFileHash: (
    keyTuple: {
      id: string;
    },
    valueTuple: {
      hash: Buffer;
      name: string;
    },
  ) => Transaction<boolean, null>;
  getFileAuthorizations: (
    fileId: string,
    participant: string,
  ) => Promise<{
    "can-read": boolean;
    "can-write": boolean;
    owns: boolean;
  } | null>;
  getFileHash: (fileId: string) => Promise<{
    hash: Buffer;
    name: string;
  } | null>;
  getFiles: (fileId: string) => Promise<{
    created: bigint;
    hash: Buffer;
    "last-updated": bigint;
    name: string;
  } | null>;
  getFilesByName: (
    filename: string,
    participant: string,
    hash: Buffer,
  ) => Promise<{
    id: string;
  } | null>;
  fileAuthorizations: (key: { id: string; participant: string }) => Promise<{
    "can-read": boolean;
    "can-write": boolean;
    owns: boolean;
  } | null>;
  fileHash: (key: { id: string }) => Promise<{
    hash: Buffer;
    name: string;
  } | null>;
  fileVersions: (key: { hash: Buffer; id: string }) => Promise<{
    "changed-by": string;
  } | null>;
  files: (key: { id: string }) => Promise<{
    created: bigint;
    hash: Buffer;
    "last-updated": bigint;
    name: string;
  } | null>;
  filesByName: (key: {
    hash: Buffer;
    name: string;
    participant: string;
  }) => Promise<{
    id: string;
  } | null>;
}
