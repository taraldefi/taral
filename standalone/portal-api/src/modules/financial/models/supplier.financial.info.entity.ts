import { Allow } from 'class-validator';
import { SupplierCompanyEntity } from 'src/modules/company/models/supplier.company.entity';
import { ChildEntity, OneToOne } from 'typeorm';
import { FinancialInformationEntity } from './financial.info.entity';

@ChildEntity()
export class SupplierFinancialInformationEntity extends FinancialInformationEntity {
  @OneToOne(() => SupplierCompanyEntity, (supplier) => supplier.financials, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Allow()
  supplier: SupplierCompanyEntity;
}
