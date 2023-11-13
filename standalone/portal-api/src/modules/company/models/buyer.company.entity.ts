import { ChildEntity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { QuickApplicationEntity } from 'src/modules/applications/models/quickapplication.entity';
import { BuyerCompanyInformationEntity } from 'src/modules/company-information/models/buyer.company.information.entity';
import { Allow } from 'class-validator';
import { CollaborationRelationshipEntity } from 'src/modules/relationship/models/collaboration.relationship.entity';

@ChildEntity()
export class BuyerCompanyEntity extends CompanyEntity {
  // @OneToMany(
  //   () => LegalProductEntity,
  //   (legalProduct) => legalProduct.legalEntity,
  // )
  // legalProducts: LegalProductEntity[];

  @OneToOne(
    () => BuyerCompanyInformationEntity,
    (companyInformation) => companyInformation.buyer,
  )
  companyInformation: BuyerCompanyInformationEntity;

  @OneToMany(
    () => CollaborationRelationshipEntity,
    (collaborationRelationship) => collaborationRelationship.buyer,
  )
  @Allow()
  relationshipWithSuppliers: CollaborationRelationshipEntity[];

  @OneToMany(
    () => QuickApplicationEntity,
    (LegalApplication) => LegalApplication.company,
  )
  applications: QuickApplicationEntity[];
}
