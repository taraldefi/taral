import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'CompanyTaxAndRevenue' })
export class CompanyTaxAndRevenueEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Allow()
  taxNumber?: string;

  @Column({ type: 'timestamptz' })
  @Allow()
  lastFiscalYear?: Date;

  @Column()
  @Allow()
  totalRevenue: string;

  @Column()
  @Allow()
  exportValue?: number;

  @Column()
  @Allow()
  audited?: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Allow()
  exportRevenuePercentage: number;

  @OneToOne(() => CompanyEntity, (company) => company.taxAndRevenue, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  company: CompanyEntity;
}
