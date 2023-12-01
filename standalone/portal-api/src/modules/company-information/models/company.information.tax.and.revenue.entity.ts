import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyInformationEntity } from './company.information.entity';

@Entity({ name: 'TaxAndRevenue' })
export class CompanyTaxAndRevenueEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'int' })
  @Allow()
  taxNumber?: string;

  @Column({ unique: true })
  @Allow()
  lastFiscalYear: number;

  @Column()
  @Allow()
  totalRevenue: string;

  @Column({ nullable: true })
  @Allow()
  exportValue?: number;

  @Column({ nullable: true })
  @Allow()
  audited?: boolean;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true,
  })
  @Allow()
  exportRevenuePercentage: number;

  @ManyToOne(
    () => CompanyInformationEntity,
    (company) => company.taxAndRevenue,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  company: CompanyInformationEntity;
}
