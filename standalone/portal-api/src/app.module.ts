import { Module } from '@nestjs/common';
import mailConfig from './config/mail.config';
import fileConfig from './config/file.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeModule } from './modules/home/home.module';
import { EventModule } from '@modules/events';
import { StorageModule } from '@modules/storage';
import { LoggerModule } from 'nestjs-pino';
import { EntitiesModule } from './modules/entity/entity.module';
import { CompaniesModule } from './modules/company/company.module';
import { FinancialsModule } from './modules/financial/financials.module';
import { AuthModule } from './modules/auth/auth.module';
import authConfig from './config/auth.config';
import { FilesModule } from './modules/files/files.module';
import { RatingsModule } from './modules/rating/ratings.module';
import { SectorsModule } from './modules/sectors/sectors.module';
import { SuppliersModule } from './modules/supplier/supplier.module';
import { BuyersModule } from './modules/buyer/buyers.module';
import { TransactionsModule } from './modules/transaction/transaction.module';
import { GoodsAndServicesModule } from './modules/service/service.module';
import { ContractsModule } from './modules/contract/contracts.module';

// import { JobsModule } from './modules/jobs/jobs.module';

import {
  CookieResolver,
  HeaderResolver,
  I18nJsonParser,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import throttleConfig from './config/throttle.config';
import winstonConfig from './config/winston.config';
import { WinstonModule } from 'nest-winston';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';

import { RolesModule } from './modules/role/roles.module';
import { PermissionsModule } from './modules/permission/permissions.module';
import { MailModule } from './modules/mail/mail.module';
import { EmailTemplateModule } from './modules/email-template/email-template.module';
import { RefreshTokenModule } from './modules/refresh-token/refresh-token.module';
import { I18nExceptionFilterPipe } from './common/pipes/i18n-exception-filter.pipe';
import { CustomValidationPipe } from './common/pipes/custom-validation.pipe';
import { TwofaModule } from './modules/twofa/twofa.module';
import { CustomThrottlerGuard } from './common/guard/custom-throttle.guard';
import { ThrottlerModule } from '@nestjs/throttler';
import path from 'path';
import { AppController } from './app.controller';
import databaseConfig from './config/database.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import onchainConfig from './config/onchain.config';
import appConfig from './config/app.config';
import { ClientsModule } from '@nestjs/microservices';
import { rabbitMQServiceOptions } from './common/rabbitmq/constants';
import { AuctionModule } from './modules/auctions/auction.module';
import { AuctionHistoryModule } from './modules/auctionhistory/auction.history.module';
import { Rabbit } from 'crypto-js';
import { RabbitMqModule } from './modules/rabbit/rabbitmq.module';
import { OrderDetailsModule } from './modules/order-detail/order-details.module';
import { CollateralModule } from './modules/collateral/collateral.module';
import { TransactionDocumentModule } from './modules/transaction-documents/transaction-documents.module';
import { PaymentTermModule } from './modules/payment-term/payment-term.module';


// const appConfig = config.get('app');

@Module({
  imports: [
    ClientsModule.register([rabbitMQServiceOptions as any]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        authConfig,
        mailConfig,
        fileConfig,
        databaseConfig,
        onchainConfig,
        appConfig,
      ],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    WinstonModule.forRoot(winstonConfig),
    ThrottlerModule.forRootAsync({
      useFactory: () => throttleConfig,
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get('app.fallbackLanguage'),
        parserOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: true,
        },
      }),
      parser: I18nJsonParser,
      resolvers: [
        {
          use: QueryResolver,
          options: ['lang', 'locale', 'l'],
        },
        new HeaderResolver(['x-custom-lang']),
        new CookieResolver(['lang', 'locale', 'l']),
      ],
      inject: [ConfigService],
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..\\..\\..\\..\\',  'public'),

    //   exclude: ['/api*']
    // }),
    StorageModule.registerAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('filesystem');
      },
      inject: [ConfigService],
    }),
    HomeModule,
    EventModule,
    StorageModule,
    LoggerModule,
    EntitiesModule,
    CompaniesModule,
    FinancialsModule,
    FilesModule,
    TransactionDocumentModule,
    RatingsModule,
    SectorsModule,
    SuppliersModule,
    BuyersModule,
    PaymentTermModule,
    TransactionsModule,
    GoodsAndServicesModule,
    ContractsModule,
    // JobsModule,
    AuthModule,
    RolesModule,
    PermissionsModule,
    MailModule,
    EmailTemplateModule,
    RefreshTokenModule,
    TwofaModule,
    OrderDetailsModule,
    CollateralModule,
    RabbitMqModule,
    AuctionModule,
    AuctionHistoryModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: I18nExceptionFilterPipe,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
