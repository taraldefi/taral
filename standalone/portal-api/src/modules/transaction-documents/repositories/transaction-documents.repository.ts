import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { TxDocEntity } from '../models/transaction-documents.entity';

@EntityRepository(TxDocEntity)
export class TxDocRepository extends BaseRepository<TxDocEntity> {}
