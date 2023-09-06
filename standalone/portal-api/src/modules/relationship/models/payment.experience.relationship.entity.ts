import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RelationshipEntity } from './relationship.entity';

@Entity({ name: 'paymentExperienceRelationships' })
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

  @Column()
  @Allow()
  paymentHistory: string; // should be an enum of delays | on-time | early

  @Column()
  @Allow()
  paymentDelays?: string; // explanation if there was a delay in payment

  @OneToOne(
    () => RelationshipEntity,
    (relationship) => relationship.paymentExperience,
    {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  relationship: RelationshipEntity;
}
