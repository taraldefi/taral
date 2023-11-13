import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { BuyerCompanyEntity } from '../models/buyer.company.entity';

@EntityRepository(BuyerCompanyEntity)
export class BuyerCompanyEntityRepository extends BaseRepository<BuyerCompanyEntity> {}
