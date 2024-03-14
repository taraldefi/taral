import { Injectable, Scope } from '@nestjs/common';

import { decryptString, ecPrivateKey, encryptString } from 'lib-stacks';
import { Configuration } from '../../../../configuration';
import { BaseService } from 'src/common/services/base.service';
import CoreLoggerService from 'src/common/logging/CoreLoggerService';

@Injectable({
  scope: Scope.DEFAULT,
})
export class EncryptionService extends BaseService {
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor(public logger: CoreLoggerService) {
    super(logger);
    
    this.privateKey = Configuration.onchain.privateKey;
    this.publicKey = Configuration.onchain.publicKey;
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
    const stringContent = content.toString('binary');

    const encryptedContent = await encryptString(this.publicKey, stringContent);

    return Buffer.from(encryptedContent, 'utf8');
  }

  public async decryptAndEncryptBack(
    content: Buffer,
    publicKey: string,
  ): Promise<Buffer> {
    const stringContent: string = content.toString('utf8');

    const privateKey = ecPrivateKey(this.privateKey);

    const decryptedContent = await decryptString(privateKey, stringContent);

    const encryptedContent = await encryptString(publicKey, decryptedContent);

    return Buffer.from(encryptedContent, 'utf8');
  }
}
