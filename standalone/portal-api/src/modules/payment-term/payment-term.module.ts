import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTermEntity } from './models/payment-term.entity';
import { PaymentTermService } from './services/payment-term.service';
import { PaymentTermMappingService } from './services/mapping.service';
import { PaymentTermController } from './payment-term.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentTermEntity])],
  controllers: [PaymentTermController],
  providers: [
    ConfigModule,
    ConfigService,
    PaymentTermService,
    PaymentTermMappingService,
  ],
  exports: [PaymentTermService],
})
export class PaymentTermModule {}
