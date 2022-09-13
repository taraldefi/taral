import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorEntity } from './models/sector.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SectorEntity])],
  controllers: [],
  providers: [ConfigModule, ConfigService],
})
export class SectorsModule {}
