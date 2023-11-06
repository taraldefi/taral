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

  @Column({ nullable: true })
  @Allow()
  interestCurrency: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: true,
  })
  @Allow()
  interestPercentage: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: true,
  })
  @Allow()
  interestFixedRate: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: true,
  })
  @Allow()
  interestDegressiveRate: number;

  @Column({ type: 'enum', enum: paymentTypes })
  @Allow()
  paymentType: string;

  @Column()
  @Allow()
  downpaymentCurrency: string;

  @Column()
  @Allow()
  downpaymentAmount: string;

  @Column()
  @Allow()
  downpaymentDescription: string;

  @Column()
  @Allow()
  balanceCurrency: string;

  @Column()
  @Allow()
  balanceAmount: string;

  @Column()
  @Allow()
  balancePaymentDeadline: string;

  @Column()
  @Allow()
  paymentVehicleDescription: string;

  @Column()
  @Allow()
  paymentDuration: string;

  @OneToOne(
    () => QuickApplicationEntity,
    (application) => application.paymentTerms,
  )
  application: QuickApplicationEntity;
}
