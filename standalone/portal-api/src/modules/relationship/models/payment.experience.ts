import { Allow } from 'class-validator';
import { Column } from 'typeorm';
import { PaymentHistory } from '../enums/payment.experience.history.entity';

export class PaymentExperience {
  @Column({ nullable: true })
  @Allow()
  description: string;

  @Column({ nullable: true })
  @Allow()
  length: string;

  @Column({ nullable: true })
  @Allow()
  noOfDeals: number;

  @Column({ nullable: true })
  @Allow()
  avgBusinessVol: string;

  @Column({ nullable: true })
  @Allow()
  currency: string;

  @Column({
    type: 'enum',
    enum: PaymentHistory,
    nullable: true,
    default: null,
  })
  @Allow()
  History: string; // should be an enum of delays | on-time

  @Column({ nullable: true })
  @Allow()
  Delays?: string; // explanation if there was a delay in payment
}
