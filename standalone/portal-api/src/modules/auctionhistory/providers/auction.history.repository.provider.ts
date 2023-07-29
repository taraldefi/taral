import { getRepositoryToken } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { AuctionHistoryEntity } from "../entities/auction.history.entity";
import { AuctionHistoryEntityRepository } from "../repositories/auction.history.repository";

export const AuctionHistoryEntityRepositoryToken = getRepositoryToken(AuctionHistoryEntity);

export const AuctionHistoryEntityRepositoryProvider = {
    provide: AuctionHistoryEntityRepositoryToken,
    useFactory: (connection: Connection) => connection.getCustomRepository(AuctionHistoryEntityRepository),
    inject: [Connection]
};