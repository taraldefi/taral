import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollateralEntity } from './models/collaterals.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CollateralEntity])],
  controllers: [],
  providers: [ConfigModule, ConfigService],
})
export class CollateralModule {}
