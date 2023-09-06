import { SupplierEntity } from 'src/modules/supplier/models/supplier.entity';
import { ChildEntity, OneToOne } from 'typeorm';
import { RelationshipEntity } from './relationship.entity';
import { BuyerEntity } from 'src/modules/buyer/models/buyer.entity';

@ChildEntity()
export class BuyerRelationshipWithSupplierEntity extends RelationshipEntity {
  @OneToOne(() => BuyerEntity, (buyer) => buyer.relationshipWithSupplier, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  buyer: BuyerEntity;
}
