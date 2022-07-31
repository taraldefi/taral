import { Logger } from "lib-shared";
import { TaralStorageContract } from "taral-contracts";

export async function getFileHash(
  fileId: string,
  contract: TaralStorageContract
): Promise<string | undefined> {
  const response = await contract.getFileHash(fileId);

  const result = response._unsafeUnwrap();

  Logger.debug("get-file-hash", "Received result ", result);

  if (result == null) {
    return "";
  }

  return Buffer.from(result).toString();
}
