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
import { SupplierEntity } from 'src/modules/supplier/models/supplier.entity';
import { BuyerEntity } from 'src/modules/buyer/models/buyer.entity';

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
    () => SupplierEntity,
    (supplier) => supplier.relationshipWithBuyers,
    {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  supplier: SupplierEntity;

  @ManyToOne(() => BuyerEntity, (buyer) => buyer.relationshipWithSuppliers, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  buyer: BuyerEntity;
}
