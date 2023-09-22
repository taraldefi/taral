import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TxDocEntity } from './models/transaction-documents.entity';
import { FilesModule } from '../files/files.module';
import { TxDocController } from './transaction-documents.controller';
import { TxDocService } from './services/transaction-documents.service';
import { MemoryStoredFile, NestjsFormDataModule } from '@modules/multipart';

@Module({
  imports: [
    FilesModule,
    TypeOrmModule.forFeature([TxDocEntity]),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [TxDocController],
  providers: [ConfigModule, ConfigService, TxDocService],
})
export class TxDocModule {}
