import { Logger, txOk } from "lib-shared";
import {
  createStacksPrivateKey,
  signMessageHashRsv,
  StacksPrivateKey,
  utf8ToBytes,
} from "lib-stacks";
import { IStorageFileUpdate } from "./types";

export async function updateFile(
  request: IStorageFileUpdate
): Promise<boolean> {
  const stacksPrivateKey: StacksPrivateKey = createStacksPrivateKey(
    request.privateKey
  );

  const signature = signMessageHashRsv({
    message: request.fileHash,
    privateKey: stacksPrivateKey,
  });

  const signatureBuffer = Buffer.from(signature.data, "hex");
  const buffer = Buffer.from(utf8ToBytes(request.fileHash));

  const response = await txOk(
    request.contract.updateFile(request.fileId, buffer, signatureBuffer)
  );

  Logger.debug("update-file", "Received result ", response);
  return response.value;
}
