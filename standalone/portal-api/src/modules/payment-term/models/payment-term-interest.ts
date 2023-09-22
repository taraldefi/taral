import { Column } from 'typeorm';

export class PaymentTermInterest {
  @Column()
  currency?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  percentage?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  fixedRate?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  degressiveRate?: number;
}
