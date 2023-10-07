import { EntityRepository } from 'typeorm';
import { SupplierQuickApplicationEntity } from '../models/quickapplication.entity';
import { BaseSimpleRepository } from 'src/common/repository/base.simple.repository';

@EntityRepository(SupplierQuickApplicationEntity)
export class SupplierQuickApplicationEntityRepository extends BaseSimpleRepository<SupplierQuickApplicationEntity> {}
