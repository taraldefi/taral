import { EntityRepository } from 'typeorm';
import { BaseSimpleRepository } from 'src/common/repository/base.simple.repository';
import { AuctionBidHistoryEntity } from '../entities/auction.bid.history.entity';

@EntityRepository(AuctionBidHistoryEntity)
export class AuctionBidHistoryEntityRepository extends BaseSimpleRepository<AuctionBidHistoryEntity> {}
