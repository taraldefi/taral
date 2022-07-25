import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
    decryptString,
    ecPrivateKey,
    encryptString,
    getPublicKeyFromPrivate,
  } from "lib-stacks";

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

        const decryptedContent = await decryptString(this.privateKey, stringContent);

        return Buffer.from(decryptedContent, 'utf-8');
    }

    
}