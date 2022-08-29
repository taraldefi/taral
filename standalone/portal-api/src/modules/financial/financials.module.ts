import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialInformationEntity } from './models/financial.info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        FinancialInformationEntity
    ]),
  ],
  controllers: [ ],
  providers: [
    ConfigModule,
    ConfigService,
  ],
})
export class FinancialsModule {}
