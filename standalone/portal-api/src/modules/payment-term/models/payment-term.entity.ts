import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentTermInterest } from './payment-term-interest';
import { PaymentTermType } from './payment-term-type';

@Entity({ name: 'PaymentTerms' })
export class PaymentTermEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bool' })
  @Allow()
  isConcluded: boolean;

  @Column({ type: 'bool' })
  @Allow()
  partialRefinancing: boolean;

  @Column(() => PaymentTermInterest)
  @Allow()
  interest: PaymentTermInterest;

  @Column(() => PaymentTermType)
  @Allow()
  payment: PaymentTermType;
}
