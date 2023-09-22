import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTermEntity } from './models/payment-term.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentTermEntity])],
  controllers: [],
  providers: [ConfigModule, ConfigService],
})
export class PaymentTermModule {}
