import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { LegalSupplierEntity } from '../models/legal-entity.entity';

@EntityRepository(LegalSupplierEntity)
export class LegalSupplierEntityRepository extends BaseRepository<LegalSupplierEntity> {}
