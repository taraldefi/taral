import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { CompanyTaxAndRevenueEntity } from '../models/company.information.tax.and.revenue.entity';

@EntityRepository(CompanyTaxAndRevenueEntity)
export class CompanyTaxAndRevenueRepository extends BaseRepository<CompanyTaxAndRevenueEntity> {}
