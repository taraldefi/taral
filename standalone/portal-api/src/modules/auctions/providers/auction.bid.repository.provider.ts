import { getRepositoryToken } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { AuctionBidEntity } from "../entities/auction.bid.entity";
import { AuctionBidEntityRepository } from "../repositories/auction.bid.entity.repository";

export const AuctionBidEntityRepositoryToken = getRepositoryToken(AuctionBidEntity);

export const AuctionBidEntityRepositoryProvider = {
    provide: AuctionBidEntityRepositoryToken,
    useFactory: (connection: Connection) => connection.getCustomRepository(AuctionBidEntityRepository),
    inject: [Connection]
};