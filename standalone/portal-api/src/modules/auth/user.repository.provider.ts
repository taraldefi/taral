import { Connection } from "typeorm";
import { UserEntityRepository } from "./user.repository";
import { UserEntity } from "./entity/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

export const UserEntityRepositoryToken = getRepositoryToken(UserEntity);

export const UserEntityRepositoryProvider = {
    provide: UserEntityRepositoryToken,
    useFactory: (connection: Connection) => connection.getCustomRepository(UserEntityRepository),
    inject: [Connection]
};