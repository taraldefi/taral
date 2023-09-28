import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './models/supplier.entity';
import { CompaniesModule } from '../company/company.module';

@Module({
  imports: [
    CompaniesModule,
    TypeOrmModule.forFeature([SupplierEntity])
  ],
  controllers: [],
  providers: [ConfigModule, ConfigService],
})
export class SuppliersModule {}
