import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuickApplicationEntity } from '../applications/models/quickapplication.entity';
import { TransactionDocumentEntity } from './models/transaction-documents.entity';
import { TransactionDocumentService } from './services/transaction-documents.service';
import { TransactionDocumentController } from './transaction-documents.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionDocumentEntity,
      QuickApplicationEntity,
    ]),
  ],
  controllers: [TransactionDocumentController],
  providers: [ConfigModule, ConfigService, TransactionDocumentService],
})
export class TransactionDocumentModule {}
