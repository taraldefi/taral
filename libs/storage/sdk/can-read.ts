import { Logger } from "lib-shared";
import { IStorageFileReadInterrogation } from "./types";

export async function canRead(
  request: IStorageFileReadInterrogation
): Promise<boolean> {
  const response = await request.contract.canReadFile(
    request.participant,
    request.fileId
  );

  const result = response._unsafeUnwrap();

  Logger.debug("can-write-file", "Received result ", result);

  return result;
}
