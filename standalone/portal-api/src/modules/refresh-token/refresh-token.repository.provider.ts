import { getRepositoryToken } from "@nestjs/typeorm";
import { RefreshTokenEntity } from "./entities/refresh-token.entity";
import { Connection } from "typeorm";
import { RefreshTokenEntityRepository } from "./refresh-token.repository";

export const RefreshTokenEntityRepositoryToken = getRepositoryToken(RefreshTokenEntity);

export const RefreshTokenEntityRepositoryProvider = {
    provide: RefreshTokenEntityRepositoryToken,
    useFactory: (connection: Connection) => connection.getCustomRepository(RefreshTokenEntityRepository),
    inject: [Connection]
};