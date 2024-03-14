import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuctionHistoryEntity } from '../entities/auction.history.entity';
import { AuctionBidHistoryEntity } from '../entities/auction.bid.history.entity';
import { AuctionHistoryEntityRepositoryToken } from '../providers/auction.history.repository.provider';
import { AuctionBidHistoryEntityRepositoryToken } from '../providers/auction.bid.history.repository.provider';
import { BaseService } from 'src/common/services/base.service';
import CoreLoggerService from 'src/common/logging/CoreLoggerService';

@Injectable()
export class AuctionHistoryService extends BaseService {
  constructor(
    public logger: CoreLoggerService,
    @Inject(AuctionHistoryEntityRepositoryToken)
    private auctionHistoryRepository: Repository<AuctionHistoryEntity>,
    @Inject(AuctionBidHistoryEntityRepositoryToken)
    private auctionBidsHistoryRepository: Repository<AuctionBidHistoryEntity>,
  ) {
    super(logger);
  }

  async getHumanReadableAuctionHistory(auctionId: number): Promise<string> {
    const auctionHistory = await this.auctionHistoryRepository.find({
      where: { auctionId: auctionId },
      order: { createdAt: 'ASC' },
    });
    const bidsHistory = await this.auctionBidsHistoryRepository.find({
      where: { auctionId: auctionId },
      order: { createdAt: 'ASC' },
    });

    const allHistory = [...auctionHistory, ...bidsHistory].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    );

    const humanReadableAuctionHistory = allHistory.map((history) => {
      let actionText: string;
      let entityText: string;

      if (history instanceof AuctionHistoryEntity) {
        entityText = `Auction with the id "${history.auctionId}"`;
      } else {
        entityText = `Auction bid with the amount "${history.amount}" and bidder "${history.bidder}"`;
      }

      switch (history.action) {
        case 'insert':
          actionText = 'was created';
          break;
        case 'update':
          actionText = 'was updated';
          break;
        case 'delete':
          actionText = 'was deleted';
          break;
      }

      let changesText = history.changes
        .map(
          (change) =>
            `The ${change.name} was changed to "${change.new_value}".`,
        )
        .join(' ');

      return `${entityText} ${actionText} at ${history.createdAt.toLocaleString()}. ${changesText}`;
    });

    return JSON.stringify(humanReadableAuctionHistory, null, 2);
  }
}
