import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollateralEntity } from './models/collaterals.entity';
import { CollateralService } from './services/collateral.service';
import { CollateralMappingService } from './services/mapping.service';
import { QuickApplicationEntity } from '../applications/models/quickapplication.entity';
import { LoggerModule } from 'src/common/logging/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CollateralEntity, QuickApplicationEntity]),
    LoggerModule
  ],
  providers: [
    ConfigModule,
    ConfigService,
    CollateralService,
    CollateralMappingService,
  ],
  exports: [CollateralService, CollateralMappingService],
})
export class CollateralModule {}
