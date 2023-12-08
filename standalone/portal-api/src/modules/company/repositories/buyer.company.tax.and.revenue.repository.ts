import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { BuyerCompanyTaxAndRevenueEntity } from '../models/buyer.company.tax.and.revenue.entity';

@EntityRepository(BuyerCompanyTaxAndRevenueEntity)
export class BuyerCompanyTaxAndRevenueRepository extends BaseRepository<BuyerCompanyTaxAndRevenueEntity> {}
