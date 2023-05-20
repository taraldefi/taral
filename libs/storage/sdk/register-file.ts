import { Logger, txOk } from "lib-shared";
import {
    createStacksPrivateKey,
    signMessageHashRsv,
    StacksPrivateKey,
    utf8ToBytes
} from "lib-stacks";
import { IStorageFileRegister } from "./types";

export async function registerFile(
    request: IStorageFileRegister
): Promise<string> {
    const stacksPrivateKey: StacksPrivateKey = createStacksPrivateKey(
        request.privateKey
    );

    const signature = signMessageHashRsv({
        message: request.fileHash,
        privateKey: stacksPrivateKey,
    });

    const signatureBuffer = Buffer.from(signature.data, "hex");
    const buffer = Buffer.from(utf8ToBytes(request.fileHash));

    Logger.debug(
        "register-file",
        `Registering file ${request.fileId} - ${request.fileName}`
    );

    const response = await txOk(
        request.contract.registerFile(
            request.fileId,
            request.fileName,
            buffer,
            signatureBuffer
        )
    );

    Logger.debug("register-file", "Received result ", response);
    return response.value;
}
