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
import { PaymentExperienceEntity } from './payment.experience.relationship.entity';

@Entity({ name: 'Relationship' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class RelationshipEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
}
