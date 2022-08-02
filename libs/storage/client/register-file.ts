import {
    CreateFileResponse,
    ErrorResponse,
    StorageApiBaseResponse,
} from "./models";

import fetch from "node-fetch";
import fs from "fs";

import { createRegisterFormPayload } from "./utils";

const CREATE_MESSAGE = "CREATE";

export interface ICreateFilePayload {
    baseUrl: string;
    fileName: string;
    fileStream: fs.ReadStream;
    fileSize: number;
    privateKey: string;
}

export async function apiCreateFile(
    request: ICreateFilePayload
): Promise<StorageApiBaseResponse<CreateFileResponse>> {
    const requestOptions = createRegisterFormPayload(request.fileName, request.fileStream, request.fileSize, request.privateKey, CREATE_MESSAGE);

    try {
        const response = await fetch(getCreateFileUrl(request.baseUrl), requestOptions);

        if (response.ok) {
            const result = (await response.json()) as CreateFileResponse;
            return {
                result,
                hasError: false,
            };
        }

        const errorResult = (await response.json()) as ErrorResponse;
        return {
            hasError: true,
            error: errorResult,
        };
    } catch (error) {
        console.log("Error ", error);

        const errorResponse: ErrorResponse = {
            errors: {
                message: (error as any).message,
            },

            status: -1,
        };

        return {
            hasError: true,
            error: errorResponse,
        };
    }
}

function getCreateFileUrl(baseUrl: string): string {
    return `${baseUrl}/api/v1/files/create-file`;
}