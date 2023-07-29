import { EntityRepository } from "typeorm";
import { AuctionEntity } from "../entities/auction.entity";
import { BaseSimpleRepository } from "src/common/repository/base.simple.repository";

@EntityRepository(AuctionEntity)
export class AuctionEntityRepository extends BaseSimpleRepository<AuctionEntity> {}
