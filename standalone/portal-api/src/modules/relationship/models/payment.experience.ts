import { Allow } from 'class-validator';
import { Column } from 'typeorm';
import { PaymentHistory } from '../enums/payment.experience.history.entity';

export class PaymentExperience {
  @Column()
  @Allow()
  description: string;

  @Column()
  @Allow()
  length: string;

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
  History: string; // should be an enum of delays | on-time

  @Column()
  @Allow()
  Delays?: string; // explanation if there was a delay in payment
}
