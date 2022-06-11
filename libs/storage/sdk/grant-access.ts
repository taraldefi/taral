import { Logger, txOk } from "lib-shared";
import { IStorageFileAccessGrant } from "./types";

export async function grantAccessToFile(
  request: IStorageFileAccessGrant
): Promise<boolean> {
  const response = await txOk(
    request.contract.grantAccess(
      request.fileId,
      request.canRead,
      request.canWrite
    )
  );

  Logger.debug("grant-access", "Received result ", response);
  return response.value;
}
