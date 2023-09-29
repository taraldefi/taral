import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './models/supplier.entity';
import { CompaniesModule } from '../company/company.module';
import { SuppliersEntityController } from './suppliers.controller';
import { SupplierService } from './services/supplier.service';
import { EntityMappingService } from './services/mapping.service';

@Module({
  imports: [
    CompaniesModule,
    TypeOrmModule.forFeature([SupplierEntity])
  ],
  controllers: [SuppliersEntityController],
  providers: [ConfigModule, ConfigService, SupplierService, EntityMappingService],
})
export class SuppliersModule {}
