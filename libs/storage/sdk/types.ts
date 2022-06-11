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
}
