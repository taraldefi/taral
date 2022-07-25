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

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity, FileVersionEntity]),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [FilesController],
  providers: [ConfigModule, ConfigService, FilesService, SignatureService],
})
export class FilesModule {}
