import { Logger } from "lib-shared";
import { TaralStorageContract } from "taral-contracts";

export async function getFileHash(
    fileId: string,
    contract: TaralStorageContract
): Promise<string | undefined> {
    const response = await contract.getFileHash(fileId);
    Logger.debug("get-file-hash", "Received result ", response);

    if (response.isErr()) {
        Logger.error("get-file-hash", "Received error ", response);
    }

    const result = response._unsafeUnwrap();

    return Buffer.from(result).toString();
}
