import { LegalSupplierEntity } from 'src/modules/entity/models/legal-supplier-entity.entity';
import { ChildEntity, JoinColumn, ManyToOne } from 'typeorm';
import { QuickApplicationEntity } from './quickapplication.entity';

@ChildEntity()
export class SupplierQuickApplicationEntity extends QuickApplicationEntity {
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
