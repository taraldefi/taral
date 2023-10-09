import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import { EntitiesModule } from 'src/modules/entity/entity.module';
import { QuickApplicationController } from './controllers/buyer-quickapplication-controller';

import { BuyerQuickApplicationEntity } from './models/buyer-quickapplication.entity';
import { SupplierQuickApplicationEntity } from './models/supplier-quickapplication.entity';

import { OrderDetailsModule } from '../order-detail/order-details.module';
import { BuyersModule } from '../buyer/buyers.module';
import { CollateralModule } from '../collateral/collateral.module';
import { SuppliersModule } from '../supplier/suppliers.module';
import { RelationshipModule } from '../relationship/relationship.module';
import { PaymentTermModule } from '../payment-term/payment-term.module';
import { BuyerQuickApplicationService } from './services/buyer-quick-application.service/application.service';
import { BuyerQuickApplicationBuyerInformationService } from './services/buyer-quick-application.service/buyer-info.service';
import { BuyerQuickApplicationSupplierInformationService } from './services/buyer-quick-application.service/supplier-info.service';
import { BuyerQuickApplicationOrderDetailService } from './services/buyer-quick-application.service/order-details.service';
import { BuyerQuickApplicationPaymentTermService } from './services/buyer-quick-application.service/payment-term.service';
import { BuyerQuickApplicationCollateralService } from './services/buyer-quick-application.service/collaterals.service';

@Module({
  imports: [
    EntitiesModule,
    BuyersModule,
    SuppliersModule,
    RelationshipModule,
    OrderDetailsModule,
    CollateralModule,
    PaymentTermModule,
    TypeOrmModule.forFeature([
      BuyerQuickApplicationEntity,
      SupplierQuickApplicationEntity,
    ]),
  ],
  controllers: [QuickApplicationController],
  providers: [
    ConfigModule,
    TypeOrmConfigService,
    BuyerQuickApplicationService,
    BuyerQuickApplicationBuyerInformationService,
    BuyerQuickApplicationSupplierInformationService,
    BuyerQuickApplicationOrderDetailService,
    BuyerQuickApplicationPaymentTermService,
    BuyerQuickApplicationCollateralService,
  ],
  exports: [BuyerQuickApplicationService],
})
export class ApplicationModule {}
