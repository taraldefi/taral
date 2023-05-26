import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { LegalProductEntity } from '../models/legal-product.entity';

@EntityRepository(LegalProductEntity)
export class LegalProductRepository extends BaseRepository<LegalProductEntity> {}
