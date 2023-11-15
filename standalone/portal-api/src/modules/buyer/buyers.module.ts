// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { BuyerEntity } from './models/buyer.entity';
// import { CompaniesModule } from '../company-information/company.information.module';
// import { BuyerService } from './services/buyer.service';
// import { EntityMappingService } from './services/mapping.service';
// import { BuyersEntityController } from './buyers.controller';
// import { CompanyAddressEntity } from '../company-information/models/companyinformation.address.entity';
// import { BuyerCompanyEntity } from '../company-information/models/buyer.company.information.entity';
// import { SectorsModule } from '../sectors/sectors.module';

// @Module({
//   imports: [
//     CompaniesModule,
//     SectorsModule,
//     TypeOrmModule.forFeature([BuyerEntity]),
//     TypeOrmModule.forFeature([CompanyAddressEntity]),
//     TypeOrmModule.forFeature([BuyerCompanyEntity]),
//   ],
//   controllers: [BuyersEntityController],
//   providers: [ConfigModule, ConfigService, BuyerService, EntityMappingService],
//   exports: [
//     BuyerService,
//     EntityMappingService,
//     TypeOrmModule.forFeature([BuyerEntity]),
//     TypeOrmModule.forFeature([CompanyAddressEntity]),
//     TypeOrmModule.forFeature([BuyerCompanyEntity]),
//   ],
// })
// export class BuyersModule {}
