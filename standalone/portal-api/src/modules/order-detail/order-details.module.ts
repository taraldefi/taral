import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from './models/order-detail.entity';
import { OrderDetailsController } from './order-details.controller';
import { OrderDetailService } from './services/order-detail.service';
import { OrderProductEntity } from './models/order-product.entity';
import { OrderProductService } from './services/order-product.service';
import { OrderProductController } from './order-product.controller';
import { OrderDetailMappingService } from './services/mapping.service';
import { ApplicationModule } from '../applications/application.module';
import { BuyerQuickApplicationEntity } from '../applications/models/buyer-quickapplication.entity';
import { OrderDetailsRepository } from './repositories/order-details.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BuyerQuickApplicationEntity,
      OrderDetailEntity,
      OrderProductEntity,
    ]),
  ],
  controllers: [OrderDetailsController, OrderProductController],
  providers: [
    ConfigModule,
    ConfigService,
    OrderDetailService,
    OrderProductService,
    OrderDetailMappingService,
  ],
  exports: [OrderDetailService],
})
export class OrderDetailsModule {}
