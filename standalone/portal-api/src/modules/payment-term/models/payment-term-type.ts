import { Column } from 'typeorm';
import { paymentTypes } from '../enums/payment-term-type.enum';

export class PaymentTermType {
  @Column({ type: 'enum', enum: paymentTypes })
  type?: string;

  @Column()
  duration?: string;
}
