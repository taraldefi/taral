import { Module } from '@nestjs/common';

import { TwofaService } from 'src/modules/twofa/twofa.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { TwofaController } from 'src/modules/twofa/twofa.controller';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';

@Module({
  providers: [TwofaService],
  imports: [AuthModule, RefreshTokenModule],
  exports: [TwofaService],
  controllers: [TwofaController],
})
export class TwofaModule {}
