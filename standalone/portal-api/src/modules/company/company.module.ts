import { MemoryStoredFile, NestjsFormDataModule } from '@modules/multipart';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityLogoController } from './entity-logo.controller';
import { BuyerEntityController } from './buyer-entities.controller';

import { BuyerCompanyEntity } from './models/buyer.company.entity';
import { SupplierCompanyEntity } from './models/supplier.company.entity';
import { BuyerCompanyEntityService } from './services/buyer-entity.service';
import { LogoService } from './services/logo.service';
import { EntityMappingService } from './services/mapping.service';
import { SupplierEntityController } from './supplier-entities.controller';
import { SupplierCompanyEntityService } from './services/supplier-entity.service';
import { CompanyAddressEntity } from '../company-information/models/company.information.address.entity';
import { SupplierCompanyInformationEntity } from '../company-information/models/supplier.company.information.entity';
import { BuyerCompanyTaxAndRevenueEntity } from './models/buyer.company.tax.and.revenue.entity';
import { SupplierCompanyTaxAndRevenueEntity } from './models/supplier.company.tax.and.revenue.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BuyerCompanyEntity,
      SupplierCompanyEntity,
      CompanyAddressEntity,
      BuyerCompanyTaxAndRevenueEntity,
      SupplierCompanyTaxAndRevenueEntity,
      SupplierCompanyInformationEntity,
    ]),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [
    BuyerEntityController,
    EntityLogoController,
    SupplierEntityController,
  ],
  providers: [
    ConfigModule,
    ConfigService,
    BuyerCompanyEntityService,
    SupplierCompanyEntityService,
    EntityMappingService,
    LogoService,
  ],
  exports: [
    BuyerCompanyEntityService,
    SupplierCompanyEntityService,
    TypeOrmModule.forFeature([
      BuyerCompanyEntity,
      BuyerCompanyTaxAndRevenueEntity,
    ]),
  ],
})
export class CompaniesModule {}
