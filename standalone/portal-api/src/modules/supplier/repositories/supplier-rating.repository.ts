import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { SupplierRatingEntity } from 'src/modules/rating/models/supplier.rating.entity';

@EntityRepository(SupplierRatingEntity)
export class SupplierRatingEntityRepository extends BaseRepository<SupplierRatingEntity> {}
