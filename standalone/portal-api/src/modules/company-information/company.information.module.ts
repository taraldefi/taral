import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyerCompanyInformationEntity } from './models/buyer.company.information.entity';
import { CompanyAddressEntity } from './models/company.information.address.entity';
import { CompanyInformationEntity } from './models/company.information.entity';
import { SupplierCompanyInformationEntity } from './models/supplier.company.information.entity';
import { EntityMappingService } from './services/mapping.service';
import { QuickApplicationEntity } from '../applications/models/quickapplication.entity';
import { BuyerInformationService } from './services/buyer-information.service';
import { SectorEntity } from '../sectors/models/sector.entity';
import { BuyerCompanyEntity } from '../company/models/buyer.company.entity';
import { CompaniesModule } from '../company/company.module';
import { RelationshipModule } from '../relationship/relationship.module';
import { CollaborationRelationshipEntity } from '../relationship/models/collaboration.relationship.entity';
import { SupplierInformationService } from './services/supplier-information.service';
import { LoggerModule } from 'src/common/logging/logger.module';

@Module({
  imports: [
    CompaniesModule,
    RelationshipModule,
    TypeOrmModule.forFeature([
      CollaborationRelationshipEntity,
      BuyerCompanyEntity,
      SectorEntity,
      CompanyInformationEntity,
      CompanyAddressEntity,
      SupplierCompanyInformationEntity,
      BuyerCompanyInformationEntity,
      QuickApplicationEntity,
    ]),
    LoggerModule
  ],
  controllers: [],
  providers: [
    ConfigModule,
    ConfigService,
    EntityMappingService,
    BuyerInformationService,
    SupplierInformationService,
  ],
  exports: [
    EntityMappingService,
    BuyerInformationService,
    SupplierInformationService,
    TypeOrmModule.forFeature([
      CompanyInformationEntity,
      CompanyAddressEntity,
      SupplierCompanyInformationEntity,
      BuyerCompanyInformationEntity,
    ]),
  ],
})
export class CompanyInformationModule {}
