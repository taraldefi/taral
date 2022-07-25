import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { decryptString, encryptString } from 'lib-stacks';

@Injectable({
  scope: Scope.DEFAULT,
})
export class EncryptionService {
  private readonly privateKey: string;

  constructor(private configService: ConfigService) {
    this.privateKey = this.configService.get(
      'onchain.deployerprivatekey',
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

  public async decryptAndEncryptBack(
    content: Buffer,
    publicKey: string,
  ): Promise<Buffer> {
    const stringContent: string = content.toString('utf8');

    const decryptedContent = await decryptString(
      this.privateKey,
      stringContent,
    );

    const encryptedContent = await encryptString(publicKey, decryptedContent);

    return Buffer.from(encryptedContent, 'utf8');
  }
}
