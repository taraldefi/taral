import { EntityRepository } from "typeorm";
import { BaseSimpleRepository } from "src/common/repository/base.simple.repository";
import { AuctionBidEntity } from "../entities/auction.bid.entity";

@EntityRepository(AuctionBidEntity)
export class AuctionBidEntityRepository extends BaseSimpleRepository<AuctionBidEntity> {}
