import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyerCompanyInformationEntity } from './models/buyer.company.information.entity';
import { CompanyAddressEntity } from './models/company.information.address.entity';
import { CompanyInformationEntity } from './models/company.information.entity';
import { SupplierCompanyInformationEntity } from './models/supplier.company.information.entity';
import { CompanyTaxAndRevenueEntity } from './models/company.information.tax.and.revenue.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyInformationEntity,
      CompanyAddressEntity,
      SupplierCompanyInformationEntity,
      BuyerCompanyInformationEntity,
      CompanyTaxAndRevenueEntity,
    ]),
  ],
  controllers: [],
  providers: [ConfigModule, ConfigService],
  exports: [
    TypeOrmModule.forFeature([
      CompanyInformationEntity,
      CompanyAddressEntity,
      SupplierCompanyInformationEntity,
      BuyerCompanyInformationEntity,
      CompanyTaxAndRevenueEntity,
    ]),
  ],
})
export class CompaniesModule {}
