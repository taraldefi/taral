export interface ICoinbaseSignatureGenerationRequest {
    coinbaseSecret: string;
    path: string;
    method: string;
    body: string;
}

export interface ICoinbaseSignRequest {
    key: string;
    signature: string;
    timestamp: number;
    passphrase: string;
}
