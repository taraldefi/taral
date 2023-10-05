import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { CompanyTaxAndRevenueEntity } from 'src/modules/company/models/company.tax.and.revenue.entity';

@EntityRepository(CompanyTaxAndRevenueEntity)
export class CompanyTaxAndRevenueEntityRepository extends BaseRepository<CompanyTaxAndRevenueEntity> {}
