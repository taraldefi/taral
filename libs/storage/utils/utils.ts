import * as crypto from "crypto";

export function getHexFileHash(file: Buffer): string {
    const hashSum = crypto.createHash("sha256");
    hashSum.update(file);
    const fileHash = hashSum.digest("hex");

    return fileHash;
}
