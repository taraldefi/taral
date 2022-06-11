import { Logger } from "lib-shared";
import { IStorageFileWriteInterrogation } from "./types";

export async function canWrite(request: IStorageFileWriteInterrogation) {
  const response = await request.contract.canWriteFile(
    request.participant,
    request.fileId
  );

  const result = response._unsafeUnwrap();

  Logger.debug("can-write-file", "Received result ", result);

  return result;
}
