import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import { EntitiesModule } from 'src/modules/entity/entity.module';
import { QuickApplicationController } from './controllers/buyer-quickapplication-controller';

import { BuyerQuickApplicationEntity } from './models/buyer-quickapplication.entity';
import { SupplierQuickApplicationEntity } from './models/supplier-quickapplication.entity';
import { BuyerQuickApplicationService } from './services/buyer.quickapplication.service';

import { OrderDetailsModule } from '../order-detail/order-details.module';
import { BuyersModule } from '../buyer/buyers.module';
import { CollateralModule } from '../collateral/collateral.module';
import { SuppliersModule } from '../supplier/suppliers.module';
import { RelationshipModule } from '../relationship/relationship.module';

@Module({
  imports: [
    EntitiesModule,
    OrderDetailsModule,
    CollateralModule,
    BuyersModule,
    SuppliersModule,
    RelationshipModule,
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
