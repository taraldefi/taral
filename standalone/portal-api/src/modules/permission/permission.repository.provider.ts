import { getRepositoryToken } from "@nestjs/typeorm";
import { PermissionEntity } from "./entities/permission.entity";
import { Connection } from "typeorm";
import { PermissionEntityRepository } from "./permission.repository";

export const PermissionEntityRepositoryToken = getRepositoryToken(PermissionEntity);

export const PermissionEntityRepositoryProvider = {
    provide: PermissionEntityRepositoryToken,
    useFactory: (connection: Connection) => connection.getCustomRepository(PermissionEntityRepository),
    inject: [Connection]
};