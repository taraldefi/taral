import { EntityRepository } from 'typeorm';
import config from 'config';

import { RefreshTokenEntity } from 'src/modules/refresh-token/entities/refresh-token.entity';
import { UserSerializer } from 'src/modules/auth/serializer/user.serializer';
import { BaseRepository } from 'src/common/repository/base.repository';
import { RefreshTokenSerializer } from 'src/modules/refresh-token/serializer/refresh-token.serializer';

const tokenConfig = config.get('jwt');
@EntityRepository(RefreshTokenEntity)
export class RefreshTokenRepository extends BaseRepository<
  RefreshTokenEntity,
  RefreshTokenSerializer
> {
  /**
   * Create refresh token
   * @param user
   * @param tokenPayload
   */
  public async createRefreshToken(
    user: UserSerializer,
    tokenPayload: Partial<RefreshTokenEntity>
  ): Promise<RefreshTokenEntity> {
    const token = this.create();
    token.userId = user.id;
    token.isRevoked = false;
    token.ip = tokenPayload.ip;
    token.userAgent = tokenPayload.userAgent;
    token.browser = tokenPayload.browser;
    token.os = tokenPayload.os;
    const expiration = new Date();
    expiration.setSeconds(
      expiration.getSeconds() + tokenConfig.refreshExpiresIn
    );
    token.expires = expiration;
    return token.save();
  }

  /**
   * find token by id
   * @param id
   */
  public async findTokenById(id: number): Promise<RefreshTokenEntity | null> {
    return this.findOne({
      where: {
        id
      }
    });
  }
}
