import { Injectable } from '@nestjs/common';

import { SignatureVerificationModel } from '../../models/signature-verification.model';
import {
  createStacksPrivateKey,
  getAddressFromPublicKey,
  hashStacksMessage,
  hexToBigInt,
  MessageSignature,
  parseRecoverableSignature,
  PubKeyEncoding,
  publicKeyFromSignatureVrs,
  signatureRsvToVrs,
  signMessageHashRsv,
  StacksMessageType,
  StacksPrivateKey,
  TransactionVersion,
} from '@libs/stacks';

import { Signature, verify, utils } from '@noble/secp256k1';
import { hmac } from '@noble/hashes/hmac';
import { sha256 } from '@noble/hashes/sha256';
import { Configuration } from '../../../../configuration';

@Injectable()
export class SignatureService {
  private readonly privateKey: string;

  constructor() {
    this.privateKey = Configuration.onchain.privateKey;

    utils.hmacSha256Sync = (key, ...msgs) => {
      const h = hmac.create(sha256, key);
      msgs.forEach((msg) => h.update(msg));
      return h.digest();
    };
  }

  public signMessage(content: string): string {
    const stacksPrivateKey: StacksPrivateKey = createStacksPrivateKey(
      this.privateKey,
    );

    const signature = signMessageHashRsv({
      message: content,
      privateKey: stacksPrivateKey,
    });

    return signature.data;
  }

  public verifySignature(
    signature: string,
    message: string,
  ): SignatureVerificationModel {
    const messageHex = hashStacksMessage({ message });
    const { r, s } = parseRecoverableSignature(signatureRsvToVrs(signature));

    const messageSignature: MessageSignature = {
      data: signature,
      type: StacksMessageType.MessageSignature,
    };

    const compressedPubKeyFromSig = publicKeyFromSignatureVrs(
      messageHex,
      messageSignature,
      PubKeyEncoding.Compressed,
    );

    const nobleSignature: Signature = new Signature(
      hexToBigInt(r),
      hexToBigInt(s),
    );

    const nobleSignatureVerificationResult = verify(
      nobleSignature,
      messageHex,
      compressedPubKeyFromSig,
      {
        strict: true,
      },
    );

    if (!nobleSignatureVerificationResult) {
      return {
        address: '',
        publicKey: '',
        isValid: false,
      };
    }

    const addressFromPublicKey = getAddressFromPublicKey(
      compressedPubKeyFromSig,
      TransactionVersion.Testnet,
    );

    return {
      address: addressFromPublicKey,
      isValid: true,
      publicKey: compressedPubKeyFromSig,
    };
  }
}
