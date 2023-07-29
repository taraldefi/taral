import { getRepositoryToken } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { AuctionBidHistoryEntity } from "../entities/auction.bid.history.entity";
import { AuctionBidHistoryEntityRepository } from "../repositories/auction.bid.history.repository";

export const AuctionBidHistoryEntityRepositoryToken = getRepositoryToken(AuctionBidHistoryEntity);

export const AuctionBidHistoryEntityRepositoryProvider = {
    provide: AuctionBidHistoryEntityRepositoryToken,
    useFactory: (connection: Connection) => connection.getCustomRepository(AuctionBidHistoryEntityRepository),
    inject: [Connection]
};