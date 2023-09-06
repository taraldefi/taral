import { BaseRepository } from 'src/common/transaction/BaseRepository';
import { EntityRepository } from 'typeorm';
import { BuyerRelationshipWithSupplierEntity } from '../models/supplier.relationship.entity';

@EntityRepository(BuyerRelationshipWithSupplierEntity)
export class BuyerRelationshipWithSupplierRepository extends BaseRepository<BuyerRelationshipWithSupplierEntity> {}
