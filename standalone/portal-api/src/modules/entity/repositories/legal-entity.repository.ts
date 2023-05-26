import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { LegalEntity } from '../models/legal-entity.entity';

@EntityRepository(LegalEntity)
export class LegalEntityRepository extends BaseRepository<LegalEntity> {}
