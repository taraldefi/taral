import { LegalSupplierEntity } from 'src/modules/entity/models/legal-supplier-entity.entity';
import { ChildEntity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { QuickApplicationEntity } from './quickapplication.entity';
import { ContractEntity } from 'src/modules/contract/models/contract.entity';
import { Allow } from 'class-validator';

@ChildEntity()
export class SupplierQuickApplicationEntity extends QuickApplicationEntity {
  @OneToOne(() => ContractEntity, (contract) => contract.SupplierApplication, )
  @JoinColumn()
  @Allow()
  contract: ContractEntity;

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
