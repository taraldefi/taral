import crypto from "crypto";
import { ICoinbaseSignRequest } from "./types";

export function signRequest(
    method: string,
    path: string,
    body: string,
    coinbaseKey: string,
    coinbasePassPhrase: string,
    coinbaseSecret: string
): ICoinbaseSignRequest {
    const timestamp = Date.now() / 1000;
    const what = timestamp + method.toUpperCase() + path + body;
    const key = Buffer.from(coinbaseSecret, "base64");
    const hmac = crypto.createHmac("sha256", key);
    const signature = hmac.update(what).digest("base64");
    return {
        key: coinbaseKey,
        signature: signature,
        timestamp: timestamp,
        passphrase: coinbasePassPhrase,
    };
}
