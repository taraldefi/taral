import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { MemoryStoredFile, NestjsFormDataModule } from '@modules/multipart';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [],
  providers: [ConfigModule, ConfigService],
})
export class FilesModule {}
