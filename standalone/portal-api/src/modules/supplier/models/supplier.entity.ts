import { Allow } from 'class-validator';
import { CompanyEntity } from 'src/modules/company/models/company.entity';
import { FinancialInformationEntity } from 'src/modules/financial/models/financial.info.entity';
import { SupplierRatingEntity } from 'src/modules/rating/models/supplier.rating.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Suppliers' })
export class SupplierEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => CompanyEntity, (company) => company.supplier)
  @JoinColumn()
  @Allow()
  company: CompanyEntity;

  @OneToOne(() => FinancialInformationEntity, (financialInformation) => financialInformation.supplier)
  @JoinColumn()
  @Allow()
  financials: FinancialInformationEntity;

  @OneToOne(() => SupplierRatingEntity, (rating) => rating.supplier)
  @JoinColumn()
  @Allow()
  rating: SupplierRatingEntity;
}
