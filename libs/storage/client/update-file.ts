import {
    UpdateFileResponse,
    ErrorResponse,
    StorageApiBaseResponse,
} from "./models";

import fetch from "node-fetch";
import fs from "fs";

import { createUpdateFormPayload } from "./utils";

const UPDATE_MESSAGE = "UPDATE";

export interface IUpdateFilePayload {
    baseUrl: string;
    fileId: string;
    fileName: string;
    fileStream: fs.ReadStream;
    fileSize: number;
    privateKey: string;
}

export async function apiUpdateFile(
    request: IUpdateFilePayload
): Promise<StorageApiBaseResponse<UpdateFileResponse>> {

    const requestOptions = createUpdateFormPayload(
        request.fileStream, request.fileName, request.fileId, request.fileSize, request.privateKey, UPDATE_MESSAGE);

    try {
        const response = await fetch(getUpdateFileUrl(request.baseUrl), requestOptions);

        if (response.ok) {
            const result = (await response.json()) as UpdateFileResponse;
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

function getUpdateFileUrl(baseUrl: string): string {
    return `${baseUrl}/api/v1/files/update-file`;
}