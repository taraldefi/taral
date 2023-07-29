import { getRepositoryToken } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { AuctionEntity } from "../entities/auction.entity";
import { AuctionEntityRepository } from "../repositories/auction.repository";

export const AuctionEntityRepositoryToken = getRepositoryToken(AuctionEntity);

export const AuctionEntityRepositoryProvider = {
    provide: AuctionEntityRepositoryToken,
    useFactory: (connection: Connection) => connection.getCustomRepository(AuctionEntityRepository),
    inject: [Connection]
};