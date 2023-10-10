import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './models/supplier.entity';
import { CompaniesModule } from '../company/company.module';
import { SuppliersEntityController } from './suppliers.controller';
import { SupplierService } from './services/supplier.service';
import { EntityMappingService } from './services/mapping.service';
import { SupplierFinancialInformationEntity } from '../financial/models/supplier.financial.info.entity';
import { CompanyTaxAndRevenueEntity } from '../company/models/company.tax.and.revenue.entity';
import { SupplierRatingEntity } from '../rating/models/supplier.rating.entity';

@Module({
  imports: [
    CompaniesModule,
    TypeOrmModule.forFeature([SupplierEntity]),
    TypeOrmModule.forFeature([SupplierFinancialInformationEntity]),
    TypeOrmModule.forFeature([CompanyTaxAndRevenueEntity]),
    TypeOrmModule.forFeature([SupplierRatingEntity]),
  ],
  controllers: [SuppliersEntityController],
  providers: [
    ConfigModule,
    ConfigService,
    SupplierService,
    EntityMappingService,
  ],
  exports: [
    SupplierService,
    EntityMappingService,
    TypeOrmModule.forFeature([SupplierEntity]),
    TypeOrmModule.forFeature([SupplierFinancialInformationEntity]),
    TypeOrmModule.forFeature([CompanyTaxAndRevenueEntity]),
    TypeOrmModule.forFeature([SupplierRatingEntity]),
  ],
})
export class SuppliersModule {}
