import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { BuyerEntity } from '../models/buyer.entity';

@EntityRepository(BuyerEntity)
export class CompanyAddressEntityRepository extends BaseRepository<BuyerEntity> {}
