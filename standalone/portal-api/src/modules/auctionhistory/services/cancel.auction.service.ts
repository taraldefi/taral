import { Inject, Injectable } from '@nestjs/common';
import { CancelAuction } from 'src/models/cancel-auction.model';
import { AuctionEntityRepository } from 'src/modules/auctions/repositories/auction.repository';
import { AuctionEntityRepositoryToken } from 'src/modules/auctions/providers/auction.repository.provider';
import { AuctionStatus } from 'src/modules/auctions/entities/auction.status';
import { IsolationLevel } from 'src/common/transaction/IsolationLevel';
import { BaseService } from '../../../common/services/base.service';
import { AuctionEntity } from 'src/modules/auctions/entities/auction.entity';
import { AuctionHistoryEntity } from '../entities/auction.history.entity';
import { AuctionHistoryEntityRepositoryToken } from '../providers/auction.history.repository.provider';
import { AuctionHistoryEntityRepository } from '../repositories/auction.history.repository';
import { Transactional } from 'src/common/transaction';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CancelAuctionService extends BaseService {
  constructor(
    public configService: ConfigService,
    
    @Inject(AuctionEntityRepositoryToken)
    private auctionRepository: AuctionEntityRepository,
    @Inject(AuctionHistoryEntityRepositoryToken)
    private auctionHistoryRepository: AuctionHistoryEntityRepository,
  ) {
    super(configService);
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async cancelAuction(cancelAuctionModel: CancelAuction): Promise<void> {
    this.setupTransactionHooks();

    console.log('In cancel auction service');

    const auction = await this.auctionRepository.findOneOrFail({
      where: { auctionId: Number(cancelAuctionModel['auction-id'].value) },
      relations: ['bids'],
    });

    if (auction != null && auction.status == AuctionStatus.CANCELLED) {
      this.Logger.info('Auction already cancelled');
      return;
    }

    const oldAuction = Object.assign(
      Object.create(Object.getPrototypeOf(auction)),
      auction,
    ) as AuctionEntity;

    auction.status = AuctionStatus.CANCELLED;
    auction.hash = this.calculateHash(auction);

    await this.auctionRepository.save(auction);

    this.Logger.info('Auction Saved');

    await this.insertIntoHistory(
      AuctionHistoryEntity,
      oldAuction,
      auction,
      'update',
      (entity: AuctionEntity, history: AuctionHistoryEntity) => {
        history.auctionId = entity.auctionId;
        history.endBlock = entity.endBlock;
        history.createdAt = new Date();

        history.highestBid = entity.highestBid;
        history.maker = entity.maker;

        history.highestBidder = entity.highestBidder;
        history.nftAsset = entity.nftAsset;
        history.status = entity.status;
        history.hash = entity.hash;
      },
      (entity: AuctionHistoryEntity) =>
        this.auctionHistoryRepository.save(entity),
    );
  }
}
