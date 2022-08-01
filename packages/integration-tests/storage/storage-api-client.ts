import {
    CreateFileResponse,
    EncryptedFileResponse,
    ErrorResponse,
    RequestFileResponse,
    StorageApiBaseResponse,
} from "./models";

import FormData from "form-data";
import fetch from "node-fetch";
import fs from "fs";

import { createStacksPrivateKey, signMessageHashRsv, StacksPrivateKey } from "lib-stacks";

export class StorageApiClient {
    constructor(private baseUrl: string, private privateKey: string) { }

    public async createFile(fileStream: fs.ReadStream, fileSizeInBytes: number): Promise<StorageApiBaseResponse<CreateFileResponse>> {
        const requestOptions = this.createFormPayload(fileStream, fileSizeInBytes);

        try {
            const response = await fetch(
                this.getCreateFileUrl(),
                requestOptions
            );

            if (response.ok) {
                const result = (await response.json()) as CreateFileResponse;
                return {
                    result,
                    hasError: false
                };
            }

            const errorResult = (await response.json()) as ErrorResponse;
            return {
                hasError: true,
                error: errorResult
            };
        } catch (error) {
            console.log("Error ", error);

            const errorResponse: ErrorResponse = {
                errors: {
                    message: (error as any).message
                },

                status: -1
            };

            return {
                hasError: true,
                error: errorResponse
            };
        }
    }

    public async requestFile(
        id: string
    ): Promise<StorageApiBaseResponse<RequestFileResponse>> {
        const signature = this.sign();

        const body = {
            id: id,
            signedMessage: signature[1],
            signature: signature[0],
        };

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
        };

        try {
            const response = await fetch(
                this.getRequestFileUrl(),
                requestOptions
            );

            if (response.ok) {
                const header = response.headers.get("Content-Disposition");
                const parts = header!.split(";");
                const fileName = parts[1].split("=")[1];

                const encryptedFile = (await response.json()) as EncryptedFileResponse;

                const requestFileResponse: RequestFileResponse = {
                    encryptedFile,
                    fileName: fileName.replace(/['"]+/g, ""),
                };

                return {
                    hasError: false,
                    result: requestFileResponse
                };
            }

            const errorResult = (await response.json()) as ErrorResponse;
            return {
                hasError: true,
                error: errorResult
            };
        } catch (error) {
            console.log("Error ", error);

            const errorResponse: ErrorResponse = {
                errors: {
                    message: (error as any).message
                },

                status: -1
            };

            return {
                hasError: true,
                error: errorResponse
            };
        }
    }

    private getCreateFileUrl(): string {
        return `${this.baseUrl}/api/v1/files/create-file`;
    }

    private getRequestFileUrl(): string {
        return `${this.baseUrl}/api/v1/files/request-file`;
    }

    private createFormPayload(fileStream: fs.ReadStream, fileSizeInBytes: number) {
        const signature = this.sign();

        const form = new FormData();

        form.append("file", fileStream, {
            filename: "dummy.pdf",
            knownLength: fileSizeInBytes,
            contentType: "application/octet-stream",
        });

        form.append("signedMessage", signature[1]);
        form.append("signature", signature[0]);

        const requestOptions = {
            method: "POST",
            body: form,
        };

        return requestOptions;
    }

    private sign(): [string, string] {
        const message = "Hello";
        const stacksPrivateKey: StacksPrivateKey = createStacksPrivateKey(this.privateKey);

        const signature = signMessageHashRsv({
            message: message,
            privateKey: stacksPrivateKey,
        });

        return [signature.data, message];
    }
}