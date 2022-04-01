import {
  COINBASE_KEY,
  COINBASE_PASSPHRASE,
  COINBASE_SECRET,
} from "../../config";

import crypto from "crypto";

export interface ICoinbaseSignRequest {
  key: string;
  signature: string;
  timestamp: number;
  passphrase: string;
}

export function signRequest(
  method: string,
  path: string,
  body: string
): ICoinbaseSignRequest {
  const timestamp = Date.now() / 1000;
  const what = timestamp + method.toUpperCase() + path + body;
  const key = Buffer.from(COINBASE_SECRET, "base64");
  const hmac = crypto.createHmac("sha256", key);
  const signature = hmac.update(what).digest("base64");
  return {
    key: COINBASE_KEY,
    signature: signature,
    timestamp: timestamp,
    passphrase: COINBASE_PASSPHRASE,
  };
}
