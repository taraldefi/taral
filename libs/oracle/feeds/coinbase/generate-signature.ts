import crypto from "crypto";
import { ICoinbaseSignatureGenerationRequest } from "./types";

export function generateSignature(
  request: ICoinbaseSignatureGenerationRequest
) {
  const timestamp = Math.floor(Date.now() / 1000);
  const message =
    timestamp + request.method + "/v2/" + request.path + request.body;
  const signature = crypto
    .createHmac("sha256", request.coinbaseSecret)
    .update(message)
    .digest("hex");

  return {
    digest: signature,
    timestamp: timestamp,
  };
}
