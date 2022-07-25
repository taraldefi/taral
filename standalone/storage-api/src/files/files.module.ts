import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { FilesService } from './services/files.service';
import { FileVersionEntity } from './entities/file-version.entity';
import {
  MemoryStoredFile,
  NestjsFormDataModule,
} from 'src/core/modules/multipart';
import { SignatureService } from './services/signature.service';
import { OnChainService } from './services/onchain/on-chain.service';
import { EncryptionService } from './services/onchain/encryption.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity, FileVersionEntity]),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [FilesController],
  providers: [
    ConfigModule,
    ConfigService,
    FilesService,
    SignatureService,
    OnChainService,
    EncryptionService,
  ],
})
export class FilesModule {}
