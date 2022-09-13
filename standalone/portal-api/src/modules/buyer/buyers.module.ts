import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyerEntity } from './models/buyer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BuyerEntity])],
  controllers: [],
  providers: [ConfigModule, ConfigService],
})
export class BuyersModule {}
