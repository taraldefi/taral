import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from '@nestjs/microservices';
import { rabbitMQServiceOptions } from './rabbtmq/constants';
import { AuctionPublisherService } from './rabbtmq/auction.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    AuthModule,
    ClientsModule.register([
      rabbitMQServiceOptions as any
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, AuctionPublisherService],
})
export class AppModule {}
