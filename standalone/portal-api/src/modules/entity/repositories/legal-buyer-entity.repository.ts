import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { LegalBuyerEntity } from '../models/legal-buyer-entity.entity';

@EntityRepository(LegalBuyerEntity)
export class LegalBuyerEntityRepository extends BaseRepository<LegalBuyerEntity> {}
