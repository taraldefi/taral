import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionEntity } from './entities/auction.entity';
import { AuctionBidEntity } from './entities/auction.bid.entity';
import { AuctionEntityRepositoryProvider } from './providers/auction.repository.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        AuctionEntity, AuctionBidEntity
    ]),
  ],
  controllers: [],
  providers: [
    ConfigModule,
    ConfigService,
    AuctionEntityRepositoryProvider
  ],
})
export class AuctionModule {}
