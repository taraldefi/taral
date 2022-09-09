import { Allow } from 'class-validator';
import { SupplierCompanyEntity } from 'src/modules/company/models/supplier.company.entity';
import { SupplierFinancialInformationEntity } from 'src/modules/financial/models/supplier.financial.info.entity';
import { SupplierRatingEntity } from 'src/modules/rating/models/supplier.rating.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Suppliers' })
export class SupplierEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => SupplierCompanyEntity, (company) => company.supplier)
  @JoinColumn()
  @Allow()
  company: SupplierCompanyEntity;

  @OneToOne(() => SupplierFinancialInformationEntity, (financialInformation) => financialInformation.supplier)
  @JoinColumn()
  @Allow()
  financials: SupplierFinancialInformationEntity;

  @OneToOne(() => SupplierRatingEntity, (rating) => rating.supplier)
  @JoinColumn()
  @Allow()
  rating: SupplierRatingEntity;
}
