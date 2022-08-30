import { BaseRepository } from '@modules/transaction';
import { EntityRepository } from 'typeorm';
import { RatingEntity } from '../models/rating.entity';
import { SupplierRatingEntity } from '../models/supplier.rating.entity';

@EntityRepository(SupplierRatingEntity)
export class SupplierRatingsRepository extends BaseRepository<SupplierRatingEntity> {}