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
import { CompanyInformationEntity } from '../../company-information/models/company.information.entity';
import { BuyerCompanyEntity } from './buyer.company.entity';

@Entity({ name: 'BuyerCompanyTaxAndRevenue' })
export class BuyerCompanyTaxAndRevenueEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'int' })
  @Allow()
  taxNumber?: string;

  @Column()
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

  @ManyToOne(() => BuyerCompanyEntity, (company) => company.taxAndRevenue, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  buyerCompany: BuyerCompanyEntity;
}
