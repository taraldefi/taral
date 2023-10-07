import { EntityRepository } from 'typeorm';
import { BuyerQuickApplicationEntity } from '../models/quickapplication.entity';
import { BaseSimpleRepository } from 'src/common/repository/base.simple.repository';

@EntityRepository(BuyerQuickApplicationEntity)
export class BuyerQuickApplicationEntityRepository extends BaseSimpleRepository<BuyerQuickApplicationEntity> {}
