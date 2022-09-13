import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from './models/rating.entity';
import { SupplierRatingEntity } from './models/supplier.rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RatingEntity, SupplierRatingEntity])],
  controllers: [],
  providers: [ConfigModule, ConfigService],
})
export class RatingsModule {}
