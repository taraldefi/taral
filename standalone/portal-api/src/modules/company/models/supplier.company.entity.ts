import { ChildEntity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { SupplierCompanyInformationEntity } from 'src/modules/company-information/models/supplier.company.information.entity';
import { CollaborationRelationshipEntity } from 'src/modules/relationship/models/collaboration.relationship.entity';
import { Allow } from 'class-validator';

@ChildEntity()
export class SupplierCompanyEntity extends CompanyEntity {
  @OneToMany(
    () => CollaborationRelationshipEntity,
    (collaborationRelationship) => collaborationRelationship.supplier,
  )
  @Allow()
  relationshipWithBuyers: CollaborationRelationshipEntity[];

  @OneToOne(
    () => SupplierCompanyInformationEntity,
    (companyInformation) => companyInformation.supplier,
  )
  companyInformation: SupplierCompanyInformationEntity;
  // @OneToMany(
  //   () => LegalProductEntity,
  //   (legalProduct) => legalProduct.legalEntity,
  // )
  // legalProducts: LegalProductEntity[];
  // @OneToMany(
  //   () => SupplierQuickApplicationEntity,
  //   (LegalApplication) => LegalApplication.legalEntity,
  // )
  // @JoinColumn()
  // legalApplications: SupplierQuickApplicationEntity[];
}
