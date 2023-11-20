import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyerCompanyInformationEntity } from './models/buyer.company.information.entity';
import { CompanyAddressEntity } from './models/company.information.address.entity';
import { CompanyInformationEntity } from './models/company.information.entity';
import { SupplierCompanyInformationEntity } from './models/supplier.company.information.entity';
import { CompanyTaxAndRevenueEntity } from './models/company.information.tax.and.revenue.entity';
import { EntityMappingService } from './services/mapping.service';
import { QuickApplicationEntity } from '../applications/models/quickapplication.entity';
import { BuyerInformationService } from './services/buyer-information.service';
import { SectorEntity } from '../sectors/models/sector.entity';
import { BuyerCompanyEntity } from '../company/models/buyer.company.entity';
import { CompaniesModule } from '../company/company.module';

@Module({
  imports: [
    CompaniesModule,
    TypeOrmModule.forFeature([
      BuyerCompanyEntity,
      SectorEntity,
      CompanyInformationEntity,
      CompanyAddressEntity,
      SupplierCompanyInformationEntity,
      BuyerCompanyInformationEntity,
      CompanyTaxAndRevenueEntity,
      QuickApplicationEntity,
    ]),
  ],
  controllers: [],
  providers: [
    ConfigModule,
    ConfigService,
    EntityMappingService,
    BuyerInformationService,
  ],
  exports: [
    EntityMappingService,
    BuyerInformationService,
    TypeOrmModule.forFeature([
      CompanyInformationEntity,
      CompanyAddressEntity,
      SupplierCompanyInformationEntity,
      BuyerCompanyInformationEntity,
      CompanyTaxAndRevenueEntity,
    ]),
  ],
})
export class CompanyInformationModule {}
