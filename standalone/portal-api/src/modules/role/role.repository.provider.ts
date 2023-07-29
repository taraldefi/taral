import { getRepositoryToken } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Connection } from 'typeorm';
import { RoleEntityRepository } from './role.repository';

export const RoleEntityRepositoryToken = getRepositoryToken(RoleEntity);

export const RoleEntityRepositoryProvider = {
  provide: RoleEntityRepositoryToken,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(RoleEntityRepository),
  inject: [Connection],
};
