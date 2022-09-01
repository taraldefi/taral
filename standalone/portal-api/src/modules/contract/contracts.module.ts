import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from './models/contract.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        ContractEntity
    ]),
  ],
  controllers: [ ],
  providers: [
    ConfigModule,
    ConfigService,
  ],
})
export class ContractsModule {}
