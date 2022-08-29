import { BaseRepository } from '@modules/transaction';
import { EntityRepository } from 'typeorm';
import { RatingEntity } from '../models/rating.entity';

@EntityRepository(RatingEntity)
export class RatingsRepository extends BaseRepository<RatingEntity> {}