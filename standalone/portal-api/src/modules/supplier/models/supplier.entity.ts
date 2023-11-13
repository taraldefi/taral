// import { Allow } from 'class-validator';
// import { QuickApplicationEntity } from 'src/modules/applications/models/quickapplication.entity';

// import { SupplierCompanyEntity } from 'src/modules/company-information/models/supplier.company.information.entity';
// import { SupplierFinancialInformationEntity } from 'src/modules/financial/models/supplier.financial.info.entity';
// import { SupplierRatingEntity } from 'src/modules/rating/models/supplier.rating.entity';
// import { CollaborationRelationshipEntity } from 'src/modules/relationship/models/collaboration.relationship.entity';
// import { EntityHelper } from 'src/utils/entity-helper';
// import {
//   Entity,
//   JoinColumn,
//   OneToMany,
//   OneToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';

// @Entity({ name: 'Suppliers' })
// export class SupplierEntity extends EntityHelper {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @OneToOne(() => SupplierCompanyEntity, (company) => company.supplier)
//   @JoinColumn()
//   @Allow()
//   company: SupplierCompanyEntity;

//   @OneToOne(
//     () => SupplierFinancialInformationEntity,
//     (financialInformation) => financialInformation.supplier,
//   )
//   @JoinColumn()
//   @Allow()
//   financials: SupplierFinancialInformationEntity;

//   @OneToOne(() => SupplierRatingEntity, (rating) => rating.supplier)
//   @JoinColumn()
//   @Allow()
//   rating: SupplierRatingEntity;

//   @OneToOne(
//     () => QuickApplicationEntity,
//     (QuickApplication) => QuickApplication.supplierInformation,
//   )
//   application: QuickApplicationEntity;

//   @OneToMany(
//     () => CollaborationRelationshipEntity,
//     (collaborationRelationship) => collaborationRelationship.supplier,
//   )
//   @Allow()
//   relationshipWithBuyers: CollaborationRelationshipEntity[];
// }
