import {
  CreateFileResponse,
  EncryptedFileResponse,
  ErrorResponse,
  RequestFileResponse,
  StorageApiBaseResponse,
} from "./models";

import FormData from "form-data";
import fs from "fs";

import {
  createStacksPrivateKey,
  signMessageHashRsv,
  StacksPrivateKey,
} from "lib-stacks";
import axios from "axios";

export class StorageApiClient {
  constructor(private baseUrl: string, private privateKey: string) {
    axios.defaults.validateStatus = function () {
      return true;
  };
  }

  public async createFile(
    fileName: string,
    fileStream: fs.ReadStream,
    fileSizeInBytes: number
  ): Promise<StorageApiBaseResponse<CreateFileResponse>> {
    const requestOptions = this.createFormPayload(fileName, fileStream, fileSizeInBytes);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    try {
      const { data, status } = await axios.post(this.getCreateFileUrl(), requestOptions, config);

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
    id: string
  ): Promise<StorageApiBaseResponse<RequestFileResponse>> {
    const signature = this.sign();

    const body = {
      id: id,
      signedMessage: signature[1],
      signature: signature[0],
    };


    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const { data, status, headers } = await axios.post(this.getRequestFileUrl(), JSON.stringify(body), config);

      if (status == 200 || status == 201) {
        const header = headers["content-disposition"];

        const parts = header!.split(";");
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

  private getRequestFileUrl(): string {
    return `${this.baseUrl}/api/v1/files/request-file`;
  }

  private createFormPayload(
    fileName: string,
    fileStream: fs.ReadStream,
    fileSizeInBytes: number
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

  private sign(): [string, string] {
    const message = "Hello";
    const stacksPrivateKey: StacksPrivateKey = createStacksPrivateKey(
      this.privateKey
    );

    const signature = signMessageHashRsv({
      message: message,
      privateKey: stacksPrivateKey,
    });

    return [signature.data, message];
  }
}
