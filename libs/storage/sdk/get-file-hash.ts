import { Logger } from "lib-shared";
import { StorageServiceContract } from "taral-contracts";

export async function getFileHash(
  fileId: string,
  contract: StorageServiceContract,
): Promise<string | undefined> {
  const response = await contract.getHash(fileId);
  Logger.debug("get-file-hash", "Received result ", response);

  if (response.isErr()) {
    Logger.error("get-file-hash", "Received error ", response);
  }

  const result = response._unsafeUnwrap();

  return Buffer.from(result).toString();
}
