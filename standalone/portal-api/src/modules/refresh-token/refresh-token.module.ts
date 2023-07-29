import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RefreshTokenService } from 'src/modules/refresh-token/refresh-token.service';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { RefreshTokenEntityRepositoryProvider } from './refresh-token.repository.provider';
import { UserEntity } from '../auth/entity/user.entity';
import { UserEntityRepositoryProvider } from '../auth/user.repository.provider';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenEntity, UserEntity]),
  ],
  providers: [JwtService, RefreshTokenService, RefreshTokenEntityRepositoryProvider, UserEntityRepositoryProvider],
  exports: [RefreshTokenService],
  controllers: [],
})
export class RefreshTokenModule {}
