import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import { CompaniesModule } from 'src/modules/company/company.module';
import { QuickApplicationController } from './controllers/buyer-quickapplication-controller';
import { QuickApplicationEntity } from './models/quickapplication.entity';
import { OrderDetailsModule } from '../order-detail/order-details.module';
import { CollateralModule } from '../collateral/collateral.module';
import { RelationshipModule } from '../relationship/relationship.module';
import { PaymentTermModule } from '../payment-term/payment-term.module';
import { BuyerQuickApplicationService } from './services/buyer-quick-application.service/application.service';
import { CompanyInformationModule } from '../company-information/company.information.module';
import { SectorsModule } from '../sectors/sectors.module';
import { StripeService } from './services/buyer-quick-application.service/stripe.service';

@Module({
  imports: [
    CompaniesModule,
    RelationshipModule,
    OrderDetailsModule,
    CollateralModule,
    PaymentTermModule,
    CompanyInformationModule,
    SectorsModule,
    TypeOrmModule.forFeature([QuickApplicationEntity]),
  ],
  controllers: [QuickApplicationController],
  providers: [
    ConfigModule,
    TypeOrmConfigService,
    BuyerQuickApplicationService,
    StripeService,
  ],
  exports: [
    BuyerQuickApplicationService,
    TypeOrmModule.forFeature([QuickApplicationEntity]),
  ],
})
export class ApplicationModule {}
