import { Inject, Injectable } from "@nestjs/common";
import { PlaceBid } from "src/models";
import { AuctionEntityRepository } from "src/modules/auctions/repositories/auction.repository";
import { AuctionEntityRepositoryToken } from "src/modules/auctions/providers/auction.repository.provider";
import { Transactional } from "src/common/transaction/transaction";
import { AuctionBidEntity } from "src/modules/auctions/entities/auction.bid.entity";
import { AuctionBidEntityRepositoryToken } from "src/modules/auctions/providers/auction.bid.repository.provider";
import { AuctionBidEntityRepository } from "src/modules/auctions/repositories/auction.bid.entity.repository";
import { IsolationLevel } from "src/common/transaction/IsolationLevel";
import { BaseService } from "./base.service";
import { AuctionBidHistoryEntityRepositoryToken } from "../providers/auction.bid.history.repository.provider";
import { AuctionBidHistoryEntityRepository } from "../repositories/auction.bid.history.repository";
import { AuctionBidHistoryEntity } from "../entities/auction.bid.history.entity";
import { AuctionEntity } from "src/modules/auctions/entities/auction.entity";
import { AuctionHistoryEntity } from "../entities/auction.history.entity";
import { AuctionHistoryEntityRepositoryToken } from "../providers/auction.history.repository.provider";
import { AuctionHistoryEntityRepository } from "../repositories/auction.history.repository";

@Injectable()
export class PlaceBidService extends BaseService {
  
  constructor(
    @Inject(AuctionEntityRepositoryToken)
    private auctionRepository: AuctionEntityRepository,
    @Inject(AuctionBidEntityRepositoryToken)
    private auctionBidRepository: AuctionBidEntityRepository,
    @Inject(AuctionBidHistoryEntityRepositoryToken)
    private auctionBidHistoryRepository: AuctionBidHistoryEntityRepository,
    @Inject(AuctionHistoryEntityRepositoryToken)
    private auctionHistoryRepository: AuctionHistoryEntityRepository,
  ) {
    super();
  }

  @Transactional({
    isolationLevel: IsolationLevel.READ_COMMITTED,
  })
  public async placeBid(placeBidModel: PlaceBid): Promise<void> {

    console.log("placeBid");

    this.setupTransactionHooks();

    const auction = await this.auctionRepository.findOneOrFail({
        where: { auctionId: Number(placeBidModel["auction-id"].value)},
        relations: ['bids'],
    });

    const oldAuction = Object.assign(Object.create(Object.getPrototypeOf(auction)), auction) as AuctionEntity;

    const bid = new AuctionBidEntity();
    bid.amount = Number(placeBidModel.bid.value);
    bid.bidder = placeBidModel.bidder.value;
    bid.hash = this.calculateHash(auction);

    if (auction.bids.find(b => b.bidder === bid.bidder && b.amount == bid.amount)) {
      // same bid, do nothing
      this.Logger.info('Same bid, do nothing');
      return;
    }

    await this.auctionBidRepository.save(bid);

    (auction.bids || []).push(bid);

    auction.highestBidder = bid.bidder;
    auction.highestBid = String(bid.amount);
    auction.hash = this.calculateHash(auction);

    await this.auctionRepository.save(auction);

    this.Logger.info('Bid Saved');

    this.Logger.info('Inserting into history');

    await this.insertIntoHistory(AuctionBidHistoryEntity, null, bid, "insert", (entity: AuctionBidEntity, history: AuctionBidHistoryEntity) => {
      history.auctionId = auction.auctionId;
      history.createdAt = new Date();
      history.bidder = entity.bidder;
      history.amount = entity.amount;
      history.hash = entity.hash;
    }, (entity: AuctionBidHistoryEntity) => this.auctionBidHistoryRepository.save(entity));

    await this.insertIntoHistory(AuctionHistoryEntity, oldAuction, auction, "update", (entity: AuctionEntity, history: AuctionHistoryEntity) => {
      history.auctionId = entity.auctionId;
      history.endBlock = entity.endBlock;
      history.createdAt = new Date();
  
      history.highestBid = entity.highestBid;
      history.maker = entity.maker;
  
      history.highestBidder = entity.highestBidder;
      history.nftAsset = entity.nftAsset;
      history.status = entity.status;
      history.hash = entity.hash;
    }, (entity: AuctionHistoryEntity) => this.auctionHistoryRepository.save(entity));

    
    this.Logger.info('Inserted into history');
  }
}