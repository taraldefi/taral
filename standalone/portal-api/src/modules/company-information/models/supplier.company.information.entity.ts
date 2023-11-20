import { Allow } from 'class-validator';
import { SupplierCompanyEntity } from 'src/modules/company/models/supplier.company.entity';
import { ChildEntity, OneToOne } from 'typeorm';
import { CompanyInformationEntity } from './company.information.entity';

@ChildEntity()
export class SupplierCompanyInformationEntity extends CompanyInformationEntity {
  @OneToOne(
    () => SupplierCompanyEntity,
    (supplier) => supplier.companyInformation,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @Allow()
  supplier: SupplierCompanyEntity;
}
