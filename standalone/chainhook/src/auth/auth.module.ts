import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { StaticBearerStrategy } from './strategy/static-bearer.strategy';

@Module({
  imports: [PassportModule],
  providers: [StaticBearerStrategy],
  exports: [],
})
export class AuthModule {}
