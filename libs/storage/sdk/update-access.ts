import { Logger, txOk } from "lib-shared";
import { IStorageFileAccessUpdate } from "./types";

export async function updateAccessToFile(
  request: IStorageFileAccessUpdate,
): Promise<boolean> {
  const response = await txOk(
    request.contract.updateAccess(
      request.participant,
      request.fileId,
      request.canRead,
      request.canWrite,
    ),
  );

  Logger.debug("update-access", "Received result ", response);
  return response.value;
}
