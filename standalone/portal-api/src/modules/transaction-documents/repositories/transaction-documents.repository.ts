import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { TransactionDocumentEntity } from '../models/transaction-documents.entity';

@EntityRepository(TransactionDocumentEntity)
export class TransactionDocumentRepository extends BaseRepository<TransactionDocumentEntity> {}
