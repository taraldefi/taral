import {
  CreateFileResponse,
  EncryptedFileResponse,
  ErrorResponse,
  RequestFileResponse,
  StorageApiBaseResponse,
  UpdateFileResponse,
} from "./models";

import FormData from "form-data";
import fs from "fs";

import axios from "axios";
import {
  createStacksPrivateKey,
  signMessageHashRsv,
  StacksPrivateKey,
} from "lib-stacks";

export class StorageApiClient {
  constructor(
    private baseUrl: string,
    private privateKey: string,
  ) {
    axios.defaults.validateStatus = function () {
      return true;
    };
  }

  public async updateFile(
    fileId: string,
    fileStream: fs.ReadStream,
    fileSizeInBytes: number,
  ): Promise<StorageApiBaseResponse<UpdateFileResponse>> {
    const requestOptions = this.createUpdateFilePayload(
      fileId,
      fileStream,
      fileSizeInBytes,
    );

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      const { data, status } = await axios.post(
        this.getUpdateFileUrl(),
        requestOptions,
        config,
      );

      if (status == 200 || status == 201) {
        const result = data as UpdateFileResponse;
        return {
          result,
          hasError: false,
        };
      }

      const errorResult = data as ErrorResponse;
      return {
        hasError: true,
        error: errorResult,
      };
    } catch (error) {
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

  public async createFile(
    fileName: string,
    fileStream: fs.ReadStream,
    fileSizeInBytes: number,
  ): Promise<StorageApiBaseResponse<CreateFileResponse>> {
    const requestOptions = this.createRegisterFilePayload(
      fileName,
      fileStream,
      fileSizeInBytes,
    );

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "mime-type": "application/octet-stream",
      },
    };

    try {
      const { data, status } = await axios.post(
        this.getCreateFileUrl(),
        requestOptions,
        config,
      );

      if (status == 200 || status == 201) {
        const result = data as CreateFileResponse;
        return {
          result,
          hasError: false,
        };
      }

      const errorResult = data as ErrorResponse;
      return {
        hasError: true,
        error: errorResult,
      };
    } catch (error) {
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

  public async requestFile(
    id: string,
  ): Promise<StorageApiBaseResponse<RequestFileResponse>> {
    const signature = this.sign();

    const body = {
      id: id,
      signedMessage: signature[1],
      signature: signature[0],
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        "mime-type": "application/octet-stream",
      },
    };

    try {
      const { data, status, headers } = await axios.post(
        this.getRequestFileUrl(),
        JSON.stringify(body),
        config,
      );

      if (status == 200 || status == 201) {
        const header = headers["content-disposition"];

        const parts = header.split(";");
        const fileName = parts[1].split("=")[1];

        const encryptedFile = data as EncryptedFileResponse;

        const requestFileResponse: RequestFileResponse = {
          encryptedFile,
          fileName: fileName.replace(/['"]+/g, ""),
        };

        return {
          hasError: false,
          result: requestFileResponse,
        };
      }

      const errorResult = data as ErrorResponse;
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

  private getCreateFileUrl(): string {
    return `${this.baseUrl}/api/v1/files/create-file`;
  }

  private getUpdateFileUrl(): string {
    return `${this.baseUrl}/api/v1/files/update-file`;
  }

  private getRequestFileUrl(): string {
    return `${this.baseUrl}/api/v1/files/request-file`;
  }

  private createRegisterFilePayload(
    fileName: string,
    fileStream: fs.ReadStream,
    fileSizeInBytes: number,
  ) {
    const signature = this.sign();

    const form = new FormData();

    form.append("file", fileStream, {
      filename: fileName,
      knownLength: fileSizeInBytes,
      contentType: "application/octet-stream",
    });

    form.append("signedMessage", signature[1]);
    form.append("signature", signature[0]);

    return form;
  }

  private createUpdateFilePayload(
    fileId: string,
    fileStream: fs.ReadStream,
    fileSizeInBytes: number,
  ) {
    const signature = this.sign();

    const form = new FormData();

    form.append("id", fileId);
    form.append("newFile", fileStream, {
      knownLength: fileSizeInBytes,
      contentType: "application/octet-stream",
    });

    form.append("signedMessage", signature[1]);
    form.append("signature", signature[0]);

    return form;
  }

  private sign(): [string, string] {
    const message = "Hello";
    const stacksPrivateKey: StacksPrivateKey = createStacksPrivateKey(
      this.privateKey,
    );

    const signature = signMessageHashRsv({
      message: message,
      privateKey: stacksPrivateKey,
    });

    return [signature.data, message];
  }
}
