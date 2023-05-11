import { Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { UserEntity } from 'src/modules/auth/entity/user.entity';
import { UserStatusEnum } from 'src/modules/auth/user-status.enum';
import { RoleEntity } from 'src/modules/role/entities/role.entity';

export default class CreateUserSeed {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const role = await connection
      .getRepository(RoleEntity)
      .createQueryBuilder('role')
      .where('role.name = :name', {
        name: 'superuser'
      })
      .getOne();

    if (!role) {
      return;
    }
    await connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([
        {
          username: 'admin',
          email: 'admin@taral.com',
          password:
            '$2b$10$O9BWip02GuE14bDPfBomQebCjwKQyuUfkulhvBB1UoizOeKxGG8Fu', // Truthy@123
          salt: '$2b$10$O9BWip02GuE14bDPfBomQe',
          name: 'taral-admin',
          status: UserStatusEnum.ACTIVE,
          roleId: role.id
        }
      ])
      .orIgnore()
      .execute();
  }
}
