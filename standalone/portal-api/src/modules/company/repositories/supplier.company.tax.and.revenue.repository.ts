import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { SupplierCompanyTaxAndRevenueEntity } from '../models/supplier.company.tax.and.revenue.entity';

@EntityRepository(SupplierCompanyTaxAndRevenueEntity)
export class SupplierCompanyTaxAndRevenueRepository extends BaseRepository<SupplierCompanyTaxAndRevenueEntity> {}
