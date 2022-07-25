import { Injectable } from '@nestjs/common';

import { SignatureVerificationModel } from '../../models/signature-verification.model';
import {
  getAddressFromPublicKey,
  hashStacksMessage,
  hexToBigInt,
  MessageSignature,
  parseRecoverableSignature,
  PubKeyEncoding,
  publicKeyFromSignatureVrs,
  signatureRsvToVrs,
  StacksMessageType,
  TransactionVersion,
} from '@libs/stacks';

import { Signature, verify } from '@noble/secp256k1';

@Injectable()
export class SignatureService {
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
