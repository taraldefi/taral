import { Logger } from "lib-shared";
import { IStorageFileReadInterrogation } from "./types";

export async function canRead(
  request: IStorageFileReadInterrogation
): Promise<boolean> {
  const response = await request.contract.canReadFile(
    request.participant,
    request.fileId
  );

  Logger.debug("can-read-file", "Received response ", JSON.stringify(response));

  const result = response._unsafeUnwrap();

  Logger.debug("can-read-file", "Received result ", result);

  return result;
}
