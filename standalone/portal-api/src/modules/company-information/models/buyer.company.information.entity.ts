import { Allow } from 'class-validator';
import { ChildEntity, OneToOne } from 'typeorm';
import { CompanyInformationEntity } from './company.information.entity';
import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';

@ChildEntity()
export class BuyerCompanyInformationEntity extends CompanyInformationEntity {
  @OneToOne(
    () => BuyerCompanyEntity,
    (buyerCompany) => buyerCompany.companyInformation,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @Allow()
  buyer: BuyerCompanyEntity;
}
