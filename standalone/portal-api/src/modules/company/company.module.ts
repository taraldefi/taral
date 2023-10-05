import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyerCompanyEntity } from './models/buyer.company.entity';
import { CompanyAddressEntity } from './models/company.address.entity';
import { CompanyEntity } from './models/company.entity';
import { SupplierCompanyEntity } from './models/supplier.company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity,
      CompanyAddressEntity,
      SupplierCompanyEntity,
      BuyerCompanyEntity,
    ]),
  ],
  controllers: [],
  providers: [ConfigModule, ConfigService],
  exports: [TypeOrmModule.forFeature([
    CompanyEntity,
    CompanyAddressEntity,
    SupplierCompanyEntity,
    BuyerCompanyEntity,
  ])],
})
export class CompaniesModule {}
