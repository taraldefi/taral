import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { SupplierRelationshipWithBuyerEntity } from '../models/buyer.relationship.entity';

@EntityRepository(SupplierRelationshipWithBuyerEntity)
export class SupplierRelationshipWithBuyerRepository extends BaseRepository<SupplierRelationshipWithBuyerEntity> {}
