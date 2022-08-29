import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from './models/rating.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        RatingEntity
    ]),
  ],
  controllers: [ ],
  providers: [
    ConfigModule,
    ConfigService,
  ],
})
export class RatingsModule {}
