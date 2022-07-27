export interface CreateFileResponse {
    hash: string;
    id: number;
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
