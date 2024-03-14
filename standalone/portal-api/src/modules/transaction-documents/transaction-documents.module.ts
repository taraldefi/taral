import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuickApplicationEntity } from '../applications/models/quickapplication.entity';
import { TransactionDocumentEntity } from './models/transaction-documents.entity';
import { TransactionDocumentService } from './services/transaction-documents.service';
import { TransactionDocumentController } from './transaction-documents.controller';
import { LoggerModule } from 'src/common/logging/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionDocumentEntity,
      QuickApplicationEntity,
    ]),
    LoggerModule
  ],
  controllers: [TransactionDocumentController],
  providers: [ConfigModule, ConfigService, TransactionDocumentService],
})
export class TransactionDocumentModule {}
