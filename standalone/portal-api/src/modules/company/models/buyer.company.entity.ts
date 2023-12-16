import { ChildEntity, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { QuickApplicationEntity } from 'src/modules/applications/models/quickapplication.entity';
import { BuyerCompanyInformationEntity } from 'src/modules/company-information/models/buyer.company.information.entity';
import { Allow } from 'class-validator';
import { CollaborationRelationshipEntity } from 'src/modules/relationship/models/collaboration.relationship.entity';
import { SectorEntity } from 'src/modules/sectors/models/sector.entity';
import { BuyerCompanyTaxAndRevenueEntity } from './buyer.company.tax.and.revenue.entity';

@Entity({ name: 'BuyerCompanies' })
export class BuyerCompanyEntity extends CompanyEntity {
  // @OneToMany(
  //   () => LegalProductEntity,
  //   (legalProduct) => legalProduct.legalEntity,
  // )
  // legalProducts: LegalProductEntity[];

  @OneToOne(() => SectorEntity, (sector) => sector.buyer)
  @JoinColumn()
  @Allow()
  sector: SectorEntity;

  @OneToOne(
    () => BuyerCompanyInformationEntity,
    (companyInformation) => companyInformation.buyer,
  )
  @JoinColumn()
  companyInformation: BuyerCompanyInformationEntity;

  @OneToMany(
    () => BuyerCompanyTaxAndRevenueEntity,
    (taxAndRevenue) => taxAndRevenue.buyerCompany,
  )
  taxAndRevenue: BuyerCompanyTaxAndRevenueEntity[];

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
