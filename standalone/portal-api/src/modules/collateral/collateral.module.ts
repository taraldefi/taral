import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollateralEntity } from './models/collaterals.entity';
import { CollateralService } from './services/collateral.service';
import { CollateralController } from './collateral.controller';
import { CollateralsRepository } from './repositories/collaterals.repository';
import { CollateralMappingService } from './services/mapping.service';

@Module({
  imports: [TypeOrmModule.forFeature([CollateralEntity])],
  controllers: [CollateralController],
  providers: [
    ConfigModule,
    ConfigService,
    CollateralService,
    CollateralMappingService,
  ],
})
export class CollateralModule {}
