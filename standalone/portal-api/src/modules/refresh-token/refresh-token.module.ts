import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RefreshTokenService } from 'src/modules/refresh-token/refresh-token.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { RefreshTokenRepository } from 'src/modules/refresh-token/refresh-token.repository';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([RefreshTokenRepository])
  ],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
  controllers: []
})
export class RefreshTokenModule {}
