import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { TestController } from './test.controller';

@Module({
  providers: [],
  imports: [AuthModule, RefreshTokenModule],
  exports: [],
  controllers: [TestController],
})
export class TestModule 
{

}
