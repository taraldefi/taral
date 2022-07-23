import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { FilesService } from './files.service';
import { FileVersionEntity } from './entities/file-version.entity';
import {
  MemoryStoredFile,
  NestjsFormDataModule,
} from 'src/core/modules/multipart';
import { FilesOnChainService } from './files.on-chain.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity, FileVersionEntity]),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [FilesController],
  providers: [ConfigModule, ConfigService, FilesService, FilesOnChainService],
})
export class FilesModule {}
