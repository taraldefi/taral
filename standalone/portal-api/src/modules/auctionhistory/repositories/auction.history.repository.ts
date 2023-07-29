import { EntityRepository } from 'typeorm';
import { AuctionHistoryEntity } from '../entities/auction.history.entity';
import { BaseSimpleRepository } from 'src/common/repository/base.simple.repository';

@EntityRepository(AuctionHistoryEntity)
export class AuctionHistoryEntityRepository extends BaseSimpleRepository<AuctionHistoryEntity> {}
