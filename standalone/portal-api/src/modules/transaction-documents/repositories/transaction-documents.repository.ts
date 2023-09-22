import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { TransactionDocEntity } from '../models/transaction-documents.entity';

@EntityRepository(TransactionDocEntity)
export class TransactionDocRepository extends BaseRepository<TransactionDocEntity> {}
