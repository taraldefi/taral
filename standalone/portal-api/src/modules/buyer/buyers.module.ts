import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyerEntity } from './models/buyer.entity';
import { CompaniesModule } from '../company/company.module';
import { BuyerService } from './services/buyer.service';
import { EntityMappingService } from './services/mapping.service';
import { BuyersEntityController } from './buyers.controller';

@Module({
  imports: [
    CompaniesModule,
    TypeOrmModule.forFeature([BuyerEntity])],
  controllers: [BuyersEntityController],
  providers: [ConfigModule, ConfigService, BuyerService, EntityMappingService],
})
export class BuyersModule {}
