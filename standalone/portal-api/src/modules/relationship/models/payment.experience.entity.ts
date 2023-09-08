import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CollaborationRelationshipEntity } from './collaboration.relationship.entity';
import { PaymentHistory } from './payment.experience.history.entity';

@Entity({ name: 'paymentExperiences' })
export class PaymentExperienceEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Allow()
  description: string;

  @Column()
  @Allow()
  paymentExperienceLength: string;

  @Column()
  @Allow()
  noOfDeals: number;

  @Column()
  @Allow()
  avgBusinessVol: string;

  @Column({
    type: 'enum',
    enum: PaymentHistory,
  })
  @Allow()
  paymentHistory: string; // should be an enum of delays | on-time | early

  @Column()
  @Allow()
  paymentDelays?: string; // explanation if there was a delay in payment

  @OneToOne(
    () => CollaborationRelationshipEntity,
    (relationship) => relationship.paymentExperience,
    {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  relationship: CollaborationRelationshipEntity;
}
