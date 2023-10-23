import { Allow } from 'class-validator';
import { SupplierQuickApplicationEntity } from 'src/modules/applications/models/supplier-quickapplication.entity';
import { TransactionEntity } from 'src/modules/transaction/models/transaction.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Contracts' })
export class ContractEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' }) // Recommended
  @Allow()
  conoclusion: Date;

  @Column({ type: 'bool' })
  @Allow()
  isSigned: boolean;

  @OneToOne(() => TransactionEntity, (transaction) => transaction.contract, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  transaction: TransactionEntity;

  @OneToOne(  () => SupplierQuickApplicationEntity, (application) => application.contract, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  SupplierApplication: SupplierQuickApplicationEntity;
}
