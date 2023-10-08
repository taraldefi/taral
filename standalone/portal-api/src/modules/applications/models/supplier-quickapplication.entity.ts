import { Allow } from 'class-validator';
import { LegalSupplierEntity } from 'src/modules/entity/models/legal-supplier-entity.entity';
import { CollaborationRelationshipEntity } from 'src/modules/relationship/models/collaboration.relationship.entity';
import { ChildEntity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { QuickApplicationEntity } from './quickapplication.entity';

@ChildEntity()
export class SupplierQuickApplicationEntity extends QuickApplicationEntity {
  @OneToOne(
    () => CollaborationRelationshipEntity,
    (relationship) => relationship.supplier,
  )
  @JoinColumn()
  @Allow()
  relationshipWithBuyer: CollaborationRelationshipEntity;

  // @OneToOne(() => ContractEntity, (contract) => contract.application)
  // @JoinColumn()
  // @Allow()
  // contract: ContractEntity;

  @ManyToOne(
    () => LegalSupplierEntity,
    (legalEntity) => legalEntity.legalApplications,
    {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  legalEntity: LegalSupplierEntity;
}
