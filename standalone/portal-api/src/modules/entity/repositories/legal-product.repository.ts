import { BaseRepository } from '@modules/transaction';
import { EntityRepository } from 'typeorm';
import { LegalProductEntity } from '../models/legal-product.entity';

@EntityRepository(LegalProductEntity)
export class LegalProductRepository extends BaseRepository<LegalProductEntity> {}
