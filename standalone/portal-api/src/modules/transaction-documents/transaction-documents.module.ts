import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionDocumentEntity } from './models/transaction-documents.entity';
import { FilesModule } from '../files/files.module';
import { TransactionDocumentController } from './transaction-documents.controller';
import { TransactionDocumentService } from './services/transaction-documents.service';
import { MemoryStoredFile, NestjsFormDataModule } from '@modules/multipart';

@Module({
  imports: [
    FilesModule,
    TypeOrmModule.forFeature([TransactionDocumentEntity]),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [TransactionDocumentController],
  providers: [ConfigModule, ConfigService, TransactionDocumentService],
})
export class TransactionDocumentModule {}
