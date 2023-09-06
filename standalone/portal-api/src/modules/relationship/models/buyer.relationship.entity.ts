import { SupplierEntity } from 'src/modules/supplier/models/supplier.entity';
import { ChildEntity, OneToOne } from 'typeorm';
import { RelationshipEntity } from './relationship.entity';

@ChildEntity()
export class SupplierRelationshipWithBuyerEntity extends RelationshipEntity {
  @OneToOne(
    () => SupplierEntity,
    (supplier) => supplier.relationshipWithBuyer,
    {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  supplier: SupplierEntity;
}
