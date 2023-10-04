import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyerEntity } from './models/buyer.entity';
import { CompaniesModule } from '../company/company.module';
import { BuyerService } from './services/buyer.service';
import { EntityMappingService } from './services/mapping.service';
import { BuyersEntityController } from './buyers.controller';
import { CompanyAddressEntity } from '../company/models/company.address.entity';
import { BuyerCompanyEntity } from '../company/models/buyer.company.entity';
import { SectorsModule } from '../sectors/sectors.module';

@Module({
  imports: [
    CompaniesModule,
    SectorsModule,
    TypeOrmModule.forFeature([BuyerEntity]),
    TypeOrmModule.forFeature([CompanyAddressEntity]),
    TypeOrmModule.forFeature([BuyerCompanyEntity]),
  ],
  controllers: [BuyersEntityController],
  providers: [ConfigModule, ConfigService, BuyerService, EntityMappingService],
  exports: [
    TypeOrmModule.forFeature([BuyerEntity]),
    TypeOrmModule.forFeature([CompanyAddressEntity]),
    TypeOrmModule.forFeature([BuyerCompanyEntity])
  ]
})
export class BuyersModule {}
