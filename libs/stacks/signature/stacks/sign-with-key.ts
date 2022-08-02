import { Signature, signSync } from "@noble/secp256k1";
import { COORDINATE_BYTES } from "./constants";
import { createMessageSignature } from "./create-message-signature";
import { MessageSignature, StacksPrivateKey } from "./types";
import { intToHex, leftPadHexToLength } from "./utils";

export function signWithKey(
  privateKey: StacksPrivateKey,
  messageHash: string
): MessageSignature {
  const [rawSignature, recoveryParam] = signSync(
    messageHash,
    privateKey.data.slice(0, 32),
    {
      canonical: true,
      recovered: true,
    }
  );
  const signature = Signature.fromHex(rawSignature);
  const r = leftPadHexToLength(signature.r.toString(16), COORDINATE_BYTES * 2);
  const s = leftPadHexToLength(signature.s.toString(16), COORDINATE_BYTES * 2);

  if (recoveryParam === undefined || recoveryParam === null) {
    throw new Error('"signature.recoveryParam" is not set');
  }
  const recoveryParamHex = intToHex(recoveryParam, 1);
  const recoverableSignatureString = recoveryParamHex + r + s;
  return createMessageSignature(recoverableSignatureString);
}
