import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RefreshTokenService } from 'src/modules/refresh-token/refresh-token.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { RefreshTokenEntity } from './entities/refresh-token.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([RefreshTokenEntity]),
  ],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
  controllers: [],
})
export class RefreshTokenModule {}
