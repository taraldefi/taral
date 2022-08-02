import FormData from "form-data";
import fs from "fs";

import {
    createStacksPrivateKey,
    signMessageHashRsv,
    StacksPrivateKey,
} from "lib-stacks";

export function createUpdateFormPayload(
    fileStream: fs.ReadStream,
    fileName: string,
    fileId: string,
    fileSizeInBytes: number,
    privateKey: string,
    message: string
) {
    const signature = sign(privateKey, message);

    const form = new FormData();

    form.append("newFile", fileStream, {
        filename: fileName,
        knownLength: fileSizeInBytes,
        contentType: "application/octet-stream",
    });

    form.append("id", fileId);
    form.append("signedMessage", signature[1]);
    form.append("signature", signature[0]);

    const requestOptions = {
        method: "POST",
        body: form,
    };

    return requestOptions;
}

export function createRegisterFormPayload (
    fileName: string,
    fileStream: fs.ReadStream,
    fileSizeInBytes: number,
    privateKey: string,
    message: string
) {
    const signature = sign(privateKey, message);

    const form = new FormData();

    form.append("file", fileStream, {
        filename: fileName,
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

export function createRequestFilePayload (fileId: string, message: string, privateKey: string) {
    const signature = sign(privateKey, message);

    const body = {
      id: fileId,
      signedMessage: signature[1],
      signature: signature[0],
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };

    return requestOptions;
}



function sign(privateKey: string, message: string): [string, string] {
    const stacksPrivateKey: StacksPrivateKey = createStacksPrivateKey(
        privateKey
    );

    const signature = signMessageHashRsv({
        message: message,
        privateKey: stacksPrivateKey,
    });

    return [signature.data, message];
}