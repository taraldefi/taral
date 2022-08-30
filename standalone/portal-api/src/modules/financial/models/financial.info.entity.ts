import { Allow } from 'class-validator';
import { SupplierEntity } from 'src/modules/supplier/models/supplier.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'FinancialInformations' })
export class FinancialInformationEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Allow()
  turnover: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Allow()
  balanceSheetTotal: number;

  @OneToOne(() => SupplierEntity, (supplier) => supplier.financials, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE'
  })
  @Allow()
  supplier: SupplierEntity; 
}
