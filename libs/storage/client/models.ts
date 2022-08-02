import fs from "fs";

export interface CreateFileResponse {
  hash: string;
  id: string;
  name: string;
  signedHash: string;
}

export interface UpdateFileResponse {
  hash: string;
  id: string;
  name: string;
  signedHash: string;
}


export interface RequestFileResponse {
  encryptedFile: EncryptedFileResponse;
  fileName: string;
}

export interface EncryptedFileResponse {
  iv: string;
  ephemeralPK: string;
  cipherText: string;
  mac: string;
  wasString: boolean;
  cipherTextEncoding: string;
}

export interface File {
  file: fs.ReadStream;
  fileSizeInBytes: number;
}

export interface StorageApiBaseResponse<T> {
  result?: T;
  error?: ErrorResponse;
  hasError: boolean;
}

export interface ErrorObject {
  message: string;
}

export interface ErrorResponse {
  status: number;
  errors: ErrorObject;
}
