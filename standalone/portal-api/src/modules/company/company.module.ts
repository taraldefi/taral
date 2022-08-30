import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyAddressEntity } from './models/company.address.entity';
import { CompanyEntity } from './models/company.entity';
import { SupplierCompanyEntity } from './models/supplier.company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity,
      CompanyAddressEntity,
      SupplierCompanyEntity
    ]),
  ],
  controllers: [ ],
  providers: [
    ConfigModule,
    ConfigService,
  ],
})
export class CompaniesModule {}
