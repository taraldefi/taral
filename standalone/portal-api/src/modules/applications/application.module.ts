import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import { EntitiesModule } from 'src/modules/entity/entity.module';
import { QuickApplicationController } from './controllers/buyer-quickapplication-controller';
import {
  BuyerQuickApplicationEntity,
  SupplierQuickApplicationEntity,
} from './models/quickapplication.entity';
import { BuyerQuickApplicationService } from './services/buyer.quickapplication.service';

@Module({
  imports: [
    EntitiesModule,
    TypeOrmModule.forFeature([
      BuyerQuickApplicationEntity,
      SupplierQuickApplicationEntity,
    ]),
  ],
  controllers: [QuickApplicationController],
  providers: [ConfigModule, TypeOrmConfigService, BuyerQuickApplicationService],
  exports: [BuyerQuickApplicationService],
})
export class ApplicationModule {}
