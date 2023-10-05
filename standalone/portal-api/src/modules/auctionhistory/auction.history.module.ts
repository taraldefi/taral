import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionHistoryEntity } from './entities/auction.history.entity';
import { AuctionBidHistoryEntity } from './entities/auction.bid.history.entity';
import { AuctionHistoryController } from './controllers/auction.history.controller';
import { AuctionHistoryService } from './services/auction.history.service';
import { WinstonLoggerModule } from '../logger/logger.module';
import { StartAuctionService } from './services/start.auction.service';
import { AuctionEntityRepositoryProvider } from '../auctions/providers/auction.repository.provider';
import { AuctionBidEntityRepositoryProvider } from '../auctions/providers/auction.bid.repository.provider';
import { AuctionBidHistoryEntityRepositoryProvider } from './providers/auction.bid.history.repository.provider';
import { AuctionHistoryEntityRepositoryProvider } from './providers/auction.history.repository.provider';
import { CancelAuctionService } from './services/cancel.auction.service';
import { PlaceBidService } from './services/place.bid.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([AuctionHistoryEntity, AuctionBidHistoryEntity]),
    WinstonLoggerModule,
  ],
  controllers: [AuctionHistoryController],
  providers: [
    ConfigModule,
    ConfigService,
    AuctionHistoryService,
    StartAuctionService,
    CancelAuctionService,
    AuctionHistoryService,
    PlaceBidService,

    AuctionEntityRepositoryProvider,
    AuctionBidEntityRepositoryProvider,
    AuctionBidHistoryEntityRepositoryProvider,
    AuctionHistoryEntityRepositoryProvider,
  ],
  exports: [
    AuctionHistoryService,
    StartAuctionService,
    CancelAuctionService,
    AuctionHistoryService,
    PlaceBidService,
  ],
})
export class AuctionHistoryModule {}
