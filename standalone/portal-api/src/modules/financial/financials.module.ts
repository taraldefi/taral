import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialInformationEntity } from './models/financial.info.entity';
import { SupplierFinancialInformationEntity } from './models/supplier.financial.info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FinancialInformationEntity,
      SupplierFinancialInformationEntity,
    ]),
  ],
  controllers: [],
  providers: [ConfigModule, ConfigService],
})
export class FinancialsModule {}
