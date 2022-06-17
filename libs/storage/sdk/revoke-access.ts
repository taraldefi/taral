import { Logger, txOk } from "lib-shared";
import { IStorageFileAccessRevoke } from "./types";

export async function revokeAccessFromFile(
  request: IStorageFileAccessRevoke
): Promise<boolean> {
  const response = await txOk(
    request.contract.revokeAccess(request.fileId, request.participant)
  );

  Logger.debug("revoke-access", "Received result ", response);
  return response.value;
}
