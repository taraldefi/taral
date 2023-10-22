import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { LegalSupplierEntity } from '../models/legal-supplier-entity.entity';

@EntityRepository(LegalSupplierEntity)
export class LegalSupplierEntityRepository extends BaseRepository<LegalSupplierEntity> {}
