import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQHealthService } from './services/rabbitmq.health.service';
import { RabbitmqService } from '../rabbit/services/rabbitmq.service';
import { AuctionSubscriberController } from './controllers/auction.subscriber.controller';
import { AuctionHistoryModule } from '../auctionhistory/auction.history.module';

@Module({
  imports: [AuctionHistoryModule],
  providers: [
    ConfigModule,
    ConfigService,
    RabbitMQHealthService,
    RabbitmqService,
  ],
  controllers: [AuctionSubscriberController],
})
export class RabbitMqModule {}
