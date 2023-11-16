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
import { BuyerQuickApplicationBuyerInformationService } from './services/buyer-quick-application.service/buyer-information.service';
// import { BuyerQuickApplicationSupplierInformationService } from './services/buyer-quick-application.service/supplier-info.service';
import { BuyerQuickApplicationMappingService } from './services/buyer-quick-application.service/mapping.service';
import { CompanyInformationModule } from '../company-information/company.information.module';
import { SectorsModule } from '../sectors/sectors.module';

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
    BuyerQuickApplicationBuyerInformationService,
    // BuyerQuickApplicationSupplierInformationService,
    BuyerQuickApplicationMappingService,
  ],
  exports: [
    BuyerQuickApplicationService,
    TypeOrmModule.forFeature([QuickApplicationEntity]),
  ],
})
export class ApplicationModule {}
