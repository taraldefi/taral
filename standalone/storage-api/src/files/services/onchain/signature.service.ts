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

import { Signature, verify } from '@noble/secp256k1';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SignatureService {

  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor(private configService: ConfigService) {
    this.privateKey = this.configService.get(
      'onchain.deployerprivatekey',
    ) as string;

    this.publicKey = this.configService.get(
      'onchain.deployerpublickey',
    ) as string;
  }

  public signMessage(content: string): string {
    const stacksPrivateKey: StacksPrivateKey = createStacksPrivateKey(this.privateKey);

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
