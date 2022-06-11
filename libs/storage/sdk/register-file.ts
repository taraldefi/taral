import { IStorageFileRegister } from "./types";
import * as crypto from "crypto";
import {
  createStacksPrivateKey,
  hashStacksMessage,
  signMessageHashRsv,
  StacksPrivateKey,
  utf8ToBytes,
} from "lib-stacks";
import { Logger, txOk } from "lib-shared";

export async function registerFile(
  request: IStorageFileRegister
): Promise<bigint> {
  const stacksPrivateKey: StacksPrivateKey = createStacksPrivateKey(
    request.privateKey
  );

  const hashSum = crypto.createHash("sha256");
  hashSum.update(request.fileBuffer);
  const fileHash = hashSum.digest("hex");

  const signature = signMessageHashRsv({
    message: fileHash,
    privateKey: stacksPrivateKey,
  });

  const signatureBuffer = Buffer.from(signature.data, "hex");
  const buffer = Buffer.from(utf8ToBytes(fileHash));

  const response = await txOk(
    request.contract.registerFile(request.fileName, buffer, signatureBuffer)
  );

  Logger.debug("register-file", "Received result ", response);
  Logger.debug("register-file-result", response.value.toString());
  return response.value;
}
