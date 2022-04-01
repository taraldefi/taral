import { COINBASE_SECRET } from "../../config";

import crypto from "crypto";

export function generateSignature(path: string, method: string, body: string) {
  const timestamp = Math.floor(Date.now() / 1000);
  const message = timestamp + method + "/v2/" + path + body;
  const signature = crypto
    .createHmac("sha256", COINBASE_SECRET)
    .update(message)
    .digest("hex");

  return {
    digest: signature,
    timestamp: timestamp,
  };
}
