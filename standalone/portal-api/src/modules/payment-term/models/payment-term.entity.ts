import { Allow } from 'class-validator';
import { QuickApplicationEntity } from 'src/modules/applications/models/quickapplication.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { paymentTypes } from '../enums/payment-term-type.enum';

@Entity({ name: 'PaymentTerms' })
export class PaymentTermEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: false })
  @Allow()
  isConcluded: boolean;

  @Column({ type: 'boolean', default: false })
  @Allow()
  partialRefinancing: boolean;

  @Column()
  @Allow()
  interestCurrency: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  @Allow()
  interestPercentage: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  @Allow()
  interestFixedRate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  @Allow()
  interestRegressiveRate: number;

  @Column({ type: 'enum', enum: paymentTypes })
  @Allow()
  paymentType: string;

  @Column()
  @Allow()
  paymentDuration: string;

  @OneToOne(
    () => QuickApplicationEntity,
    (application) => application.paymentTerms,
  )
  application: QuickApplicationEntity;
}
