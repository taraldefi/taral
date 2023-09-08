import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { PaymentExperienceEntity } from './payment.experience.entity';
import { SupplierEntity } from 'src/modules/supplier/models/supplier.entity';
import { BuyerEntity } from 'src/modules/buyer/models/buyer.entity';

@Entity({ name: 'CollaborationRelationships' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class CollaborationRelationshipEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Allow()
  shareHoldingRelationship?: string;

  @Column()
  @Allow()
  influence?: string;

  @OneToOne(
    () => PaymentExperienceEntity,
    (paymentexperience) => paymentexperience.relationship,
  )
  @JoinColumn()
  paymentExperience: PaymentExperienceEntity;

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

  @OneToOne(() => BuyerEntity, (buyer) => buyer.relationshipWithSupplier, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  buyer: BuyerEntity;
}
