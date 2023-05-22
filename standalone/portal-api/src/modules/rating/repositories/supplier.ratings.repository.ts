import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { SupplierRatingEntity } from '../models/supplier.rating.entity';

@EntityRepository(SupplierRatingEntity)
export class SupplierRatingsRepository extends BaseRepository<SupplierRatingEntity> {}
