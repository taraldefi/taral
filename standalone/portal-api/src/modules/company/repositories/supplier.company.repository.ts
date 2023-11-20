import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { SupplierCompanyEntity } from '../models/supplier.company.entity';

@EntityRepository(SupplierCompanyEntity)
export class SupplierCompanyEntityRepository extends BaseRepository<SupplierCompanyEntity> {}
