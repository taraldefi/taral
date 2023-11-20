import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity({ name: 'FinancialInformations' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class FinancialInformationEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Allow()
  turnover: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Allow()
  balanceSheetTotal: number;
}
