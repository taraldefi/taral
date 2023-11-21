import { ChildEntity, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { SupplierCompanyInformationEntity } from 'src/modules/company-information/models/supplier.company.information.entity';
import { CollaborationRelationshipEntity } from 'src/modules/relationship/models/collaboration.relationship.entity';
import { Allow } from 'class-validator';
import { SupplierFinancialInformationEntity } from 'src/modules/financial/models/supplier.financial.info.entity';
import { SupplierRatingEntity } from 'src/modules/rating/models/supplier.rating.entity';
import { QuickApplicationEntity } from 'src/modules/applications/models/quickapplication.entity';

@Entity({ name: 'SupplierCompanies' })
export class SupplierCompanyEntity extends CompanyEntity {
  @OneToOne(
    () => SupplierFinancialInformationEntity,
    (financialInformation) => financialInformation.supplier,
  )
  @JoinColumn()
  @Allow()
  financials: SupplierFinancialInformationEntity;

  @OneToOne(() => SupplierRatingEntity, (rating) => rating.supplier)
  @JoinColumn()
  @Allow()
  rating: SupplierRatingEntity;

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
  @JoinColumn()
  companyInformation: SupplierCompanyInformationEntity;
  // @OneToMany(
  //   () => LegalProductEntity,
  //   (legalProduct) => legalProduct.legalEntity,
  // )
  // legalProducts: LegalProductEntity[];
  @OneToMany(
    () => QuickApplicationEntity,
    (application) => application.supplierInformation,
  )
  @JoinColumn()
  applications: QuickApplicationEntity[];
}
