import { Test } from '@nestjs/testing';

import { RefreshTokenEntityRepository } from '../../../src/modules/refresh-token/refresh-token.repository';
import { UserSerializer } from '../../../src/modules/auth/serializer/user.serializer';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RefreshTokenEntity } from '../../../src/modules/refresh-token/entities/refresh-token.entity';

const mockRefreshToken = {
  id: 1,
  userId: 1,
  expires: new Date(),
  isRevoked: false,
  save: jest.fn(),
};

describe('Refresh token repository', () => {
  let repository, user;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(RefreshTokenEntity),
          useClass: RefreshTokenEntityRepository,
        },
      ],
    }).compile();
    repository = await module.get(getRepositoryToken(RefreshTokenEntity));
    user = new UserSerializer();
    user.id = 1;
    user.email = 'test@mail.com';
  });

  it('create new refresh token', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(mockRefreshToken);
    await repository.createRefreshToken(user, 60 * 60);
    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create().save).toHaveBeenCalledTimes(1);
  });

  it('findTokenById', async () => {
    jest.spyOn(repository, 'findOne').mockReturnValue(mockRefreshToken);
    await repository.findTokenById(1);
    expect(repository.findOne).toHaveBeenCalledTimes(1);
  });
});
