import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionDocEntity } from './models/transaction-documents.entity';
import { FilesModule } from '../files/files.module';
import { TransactionDocController } from './transaction-documents.controller';
import { TransactionDocService } from './services/transaction-documents.service';
import { MemoryStoredFile, NestjsFormDataModule } from '@modules/multipart';

@Module({
  imports: [
    FilesModule,
    TypeOrmModule.forFeature([TransactionDocEntity]),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [TransactionDocController],
  providers: [ConfigModule, ConfigService, TransactionDocService],
})
export class TransactionDocModule {}
