import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTermEntity } from './models/payment-term.entity';
import { PaymentTermService } from './services/payment-term.service';
import { PaymentTermMappingService } from './services/mapping.service';
import { QuickApplicationEntity } from '../applications/models/quickapplication.entity';
import { LoggerModule } from 'src/common/logging/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentTermEntity, QuickApplicationEntity]),
    LoggerModule
  ],

  providers: [
    ConfigModule,
    ConfigService,
    PaymentTermService,
    PaymentTermMappingService,
  ],
  exports: [PaymentTermService, PaymentTermMappingService],
})
export class PaymentTermModule {}
