import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import config from 'config';

import { UserEntityRepository } from 'src/modules/auth/user.repository';
import { UserEntity } from 'src/modules/auth/entity/user.entity';
import { JwtPayloadDto } from 'src/modules/auth/dto/jwt-payload.dto';
import { UnauthorizedException } from 'src/modules/exception/unauthorized.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-strategy') {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: UserEntityRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
    });
  }

  /**
   * Validate if user exists and return user entity
   * @param payload
   */
  async validate(payload: JwtPayloadDto): Promise<UserEntity> {
    const { subject } = payload;

    const user = await this.userRepository.findOne(Number(subject), {
      relations: ['role', 'role.permission'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
