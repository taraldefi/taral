import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { CollateralEntity } from '../models/collaterals.entity';

@EntityRepository(CollateralEntity)
export class CollateralsRepository extends BaseRepository<CollateralEntity> {}
