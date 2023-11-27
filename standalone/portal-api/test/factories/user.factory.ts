import { getRepository } from 'typeorm';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

import { UserEntity } from 'src/modules/auth/entity/user.entity';
import { UserStatusEnum } from 'src/modules/auth/user-status.enum';
import { RoleEntity } from 'src/modules/role/entities/role.entity';

export class UserFactory {
  private role: RoleEntity;

  static new() {
    return new UserFactory();
  }

  withRole(role: RoleEntity) {
    this.role = role;
    return this;
  }

  async create(user: Partial<UserEntity> = {}) {
    const userRepository = getRepository(UserEntity);
    const salt = await bcrypt.genSalt();
    const password = await this.hashPassword(
      user.password || faker.internet.password(),
      salt,
    );
    const payload = {
      username: faker.internet.userName().toLowerCase(),
      email: faker.internet.email().toLowerCase(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      address: faker.address.streetAddress(),
      contact: faker.phone.number(),
      avatar: faker.image.avatar(),
      salt,
      token: faker.datatype.uuid(),
      status: UserStatusEnum.ACTIVE,
      isTwoFAEnabled: false,
      ...user,
      password,
    };

    if (this.role) payload.role = this.role;
    return userRepository.save(payload);
  }

  async createMany(users: Partial<UserEntity>[]) {
    return Promise.all([users.map((user) => this.create(user))]);
  }

  private hashPassword(password, salt) {
    return bcrypt.hash(password, salt);
  }
}
