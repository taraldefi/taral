import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { decryptString, ecPrivateKey, encryptString } from 'lib-stacks';

@Injectable({
  scope: Scope.DEFAULT,
})
export class EncryptionService {
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor(private configService: ConfigService) {
    this.privateKey = this.configService.get(
      'onchain.privateKey',
    ) as string;

    this.publicKey = this.configService.get(
      'onchain.publicKey',
    ) as string;
  }

  public async decrypt(content: Buffer): Promise<Buffer> {
    const stringContent: string = content.toString('utf8');

    const decryptedContent = await decryptString(
      this.privateKey,
      stringContent,
    );

    return Buffer.from(decryptedContent, 'utf8');
  }

  public async encrypt(content: Buffer, publicKey: string): Promise<Buffer> {
    const stringContent = content.toString('utf8');

    const encryptedContent = await encryptString(publicKey, stringContent);

    return Buffer.from(encryptedContent, 'utf8');
  }

  public async encryptForStorage(content: Buffer): Promise<Buffer> {
    const stringContent = content.toString('utf8');

    const encryptedContent = await encryptString(this.publicKey, stringContent);

    return Buffer.from(encryptedContent, 'utf8');
  }

  public async decryptAndEncryptBack(
    content: Buffer,
    publicKey: string,
  ): Promise<Buffer> {
    const stringContent: string = content.toString('utf8');

    const privateKey = ecPrivateKey(this.privateKey);

    const decryptedContent = await decryptString(
      privateKey,
      stringContent,
    );

    const encryptedContent = await encryptString(publicKey, decryptedContent);

    return Buffer.from(encryptedContent, 'utf8');
  }
}
