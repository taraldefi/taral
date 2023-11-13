import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentExperience } from './payment.experience';
import { SupplierCompanyEntity } from 'src/modules/company/models/supplier.company.entity';
import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';

@Entity({ name: 'CollaborationRelationships' })
export class CollaborationRelationshipEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  @Allow()
  shareHoldingRelationship?: string;

  @Column({ nullable: true })
  @Allow()
  influence?: string;

  @Column(() => PaymentExperience)
  @Allow()
  paymentExperience: PaymentExperience;

  @ManyToOne(
    () => SupplierCompanyEntity,
    (supplier) => supplier.relationshipWithBuyers,
    {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  supplier: SupplierCompanyEntity;

  @ManyToOne(
    () => BuyerCompanyEntity,
    (buyer) => buyer.relationshipWithSuppliers,
    {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  buyer: BuyerCompanyEntity;
}
