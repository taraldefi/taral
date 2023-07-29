import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionHistoryEntity } from './entities/auction.history.entity';
import { AuctionBidHistoryEntity } from './entities/auction.bid.history.entity';
import { AuctionHistoryController } from './controllers/auction.history.controller';
import { AuctionHistoryService } from './services/auction.history.service';
import { AuctionSubscriberController } from './controllers/auction.subscriber.controller';
import { RabbitMQHealthService } from './services/rabbitmq.health.service';
import { LoggerModule } from '../logger/logger.module';
import { RabbitmqService } from './services/rabbitmq.service';
import { StartAuctionService } from './services/start.auction.service';
import { AuctionEntityRepositoryProvider } from '../auctions/providers/auction.repository.provider';
import { AuctionBidEntityRepositoryProvider } from '../auctions/providers/auction.bid.repository.provider';
import { AuctionBidHistoryEntityRepositoryProvider } from './providers/auction.bid.history.repository.provider';
import { AuctionHistoryEntityRepositoryProvider } from './providers/auction.history.repository.provider';
import { CancelAuctionService } from './services/cancel.auction.service';
import { PlaceBidService } from './services/place.bid.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuctionHistoryEntity, AuctionBidHistoryEntity]),
    LoggerModule,
  ],
  controllers: [AuctionHistoryController, AuctionSubscriberController],
  providers: [
    ConfigModule,
    ConfigService,
    AuctionHistoryService,
    RabbitMQHealthService,
    RabbitmqService,
    StartAuctionService,
    CancelAuctionService,
    AuctionHistoryService,
    PlaceBidService,

    AuctionEntityRepositoryProvider,
    AuctionBidEntityRepositoryProvider,
    AuctionBidHistoryEntityRepositoryProvider,
    AuctionHistoryEntityRepositoryProvider,
  ],
})
export class AuctionHistoryModule {}
