import { Module } from '@nestjs/common';

import { TwofaService } from 'src/modules/twofa/twofa.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { TwofaController } from 'src/modules/twofa/twofa.controller';

@Module({
  providers: [TwofaService],
  imports: [AuthModule],
  exports: [TwofaService],
  controllers: [TwofaController]
})
export class TwofaModule {}
