import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from './models/orderDetail.entity';
import { OrderProductEntity } from './models/orderProducts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailEntity, OrderProductEntity])],
  controllers: [],
  providers: [ConfigModule, ConfigService],
})
export class orderDetailsModule {}
