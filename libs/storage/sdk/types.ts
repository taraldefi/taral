import { TaralStorageContract } from "taral-contracts";

export interface IStorageFileRegister {
  fileBuffer: Buffer;

  fileName: string;

  privateKey: string;

  contract: TaralStorageContract;
}

export interface IStorageFileWriteInterrogation {
  participant: string;

  fileId: bigint;

  contract: TaralStorageContract;
}

export interface IStorageFileReadInterrogation {
  participant: string;

  fileId: bigint;

  contract: TaralStorageContract;
}

export interface IStorageFileAccessGrant {
  contract: TaralStorageContract;

  fileId: bigint;

  canRead: boolean;

  canWrite: boolean;

  participant: string;
}

export interface IStorageFileAccessUpdate {
  contract: TaralStorageContract;

  fileId: bigint;

  canRead: boolean;

  canWrite: boolean;

  participant: string;
}

export interface IStorageFileUpdate {
  contract: TaralStorageContract;

  fileId: bigint;

  privateKey: string;

  fileBuffer: Buffer;
}
