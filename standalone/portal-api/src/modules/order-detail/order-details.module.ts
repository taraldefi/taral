import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuickApplicationEntity } from '../applications/models/quickapplication.entity';
import { OrderDetailEntity } from './models/order-detail.entity';
import { OrderProductEntity } from './models/order-product.entity';
import { OrderDetailsController } from './order-details.controller';
import { OrderProductController } from './order-product.controller';
import { OrderDetailMappingService } from './services/mapping.service';
import { OrderDetailService } from './services/order-detail.service';
import { OrderProductService } from './services/order-product.service';
import { LoggerModule } from 'src/common/logging/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuickApplicationEntity,
      OrderDetailEntity,
      OrderProductEntity,
    ]),

    LoggerModule
  ],
  controllers: [OrderDetailsController, OrderProductController],
  providers: [
    ConfigModule,
    ConfigService,
    OrderDetailService,
    OrderProductService,
    OrderDetailMappingService,
  ],
  exports: [OrderDetailService, OrderProductService, OrderDetailMappingService],
})
export class OrderDetailsModule {}
