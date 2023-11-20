import { EntityRepository } from 'typeorm';
import { QuickApplicationEntity } from '../models/quickapplication.entity';
import { BaseSimpleRepository } from 'src/common/repository/base.simple.repository';

@EntityRepository(QuickApplicationEntity)
export class BuyerQuickApplicationEntityRepository extends BaseSimpleRepository<QuickApplicationEntity> {}
