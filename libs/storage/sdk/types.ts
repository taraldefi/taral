import { TaralStorageContract } from "taral-contracts";

export interface IStorageFileRegister {
    fileId: string;

    fileHash: string;

    fileName: string;

    privateKey: string;

    contract: TaralStorageContract;
}

export interface IStorageFileWriteInterrogation {
    participant: string;

    fileId: string;

    contract: TaralStorageContract;
}

export interface IStorageFileReadInterrogation {
    participant: string;

    fileId: string;

    contract: TaralStorageContract;
}

export interface IStorageFileAccessGrant {
    contract: TaralStorageContract;

    fileId: string;

    canRead: boolean;

    canWrite: boolean;

    participant: string;
}

export interface IStorageFileAccessUpdate {
    contract: TaralStorageContract;

    fileId: string;

    canRead: boolean;

    canWrite: boolean;

    participant: string;
}

export interface IStorageFileUpdate {
    contract: TaralStorageContract;

    fileId: string;

    privateKey: string;

    fileHash: string;
}

export interface IStorageFileAccessRevoke {
    contract: TaralStorageContract;

    fileId: string;

    participant: string;
}
