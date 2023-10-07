import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [],
  providers: [ConfigModule, TypeOrmConfigService],
})
export class ApplicationModule {}
