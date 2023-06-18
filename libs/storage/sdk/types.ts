import { StorageServiceContract } from "taral-contracts";

export interface IStorageFileRegister {
    fileId: string;

    fileHash: string;

    fileName: string;

    privateKey: string;

    contract: StorageServiceContract;
}

export interface IStorageFileWriteInterrogation {
    participant: string;

    fileId: string;

    contract: StorageServiceContract;
}

export interface IStorageFileReadInterrogation {
    participant: string;

    fileId: string;

    contract: StorageServiceContract;
}

export interface IStorageFileAccessGrant {
    contract: StorageServiceContract;

    fileId: string;

    canRead: boolean;

    canWrite: boolean;

    participant: string;
}

export interface IStorageFileAccessUpdate {
    contract: StorageServiceContract;

    fileId: string;

    canRead: boolean;

    canWrite: boolean;

    participant: string;
}

export interface IStorageFileUpdate {
    contract: StorageServiceContract;

    fileId: string;

    privateKey: string;

    fileHash: string;
}

export interface IStorageFileAccessRevoke {
    contract: StorageServiceContract;

    fileId: string;

    participant: string;
}
