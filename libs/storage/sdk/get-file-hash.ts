import { Logger } from "lib-shared";
import { TaralStorageContract } from "taral-contracts";

export async function getFileHash(
  fileId: bigint,
  contract: TaralStorageContract
): Promise<string | undefined> {
  const response = await contract.fileHash({ id: fileId });

  Logger.debug("get-file-hash", "Received result ", response);

  return response?.hash.toString();
}
