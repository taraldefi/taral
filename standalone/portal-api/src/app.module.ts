import { DynamicModule, Module, Type } from '@nestjs/common';
import mailConfig from './config/mail.config';
import fileConfig from './config/file.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeModule } from './modules/home/home.module';
import { EventModule } from '@modules/events';
import { StorageModule } from '@modules/storage';
import { LoggerModule } from 'nestjs-pino';
import { CompaniesModule } from './modules/company/company.module';
import { CompanyInformationModule } from './modules/company-information/company.information.module';
import { FinancialsModule } from './modules/financial/financials.module';
import { AuthModule } from './modules/auth/auth.module';
import authConfig from './config/auth.config';
import { FilesModule } from './modules/files/files.module';
import { RatingsModule } from './modules/rating/ratings.module';
import { SectorsModule } from './modules/sectors/sectors.module';
// import { SuppliersModule } from './modules/supplier/suppliers.module';
import { TransactionsModule } from './modules/transaction/transaction.module';
import { GoodsAndServicesModule } from './modules/service/service.module';
import { ContractsModule } from './modules/contract/contracts.module';
import { ServeStaticModule } from '@nestjs/serve-static';

import {
  CookieResolver,
  HeaderResolver,
  I18nJsonParser,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
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
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import path, { join } from 'path';
import { AppController } from './app.controller';
import databaseConfig from './config/database.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import onchainConfig from './config/onchain.config';
import appConfig from './config/app.config';
import { ClientsModule } from '@nestjs/microservices';
import { rabbitMQServiceOptions } from './common/rabbitmq/constants';
import { AuctionModule } from './modules/auctions/auction.module';
import { AuctionHistoryModule } from './modules/auctionhistory/auction.history.module';
import { RabbitMqModule } from './modules/rabbit/rabbitmq.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { RelationshipModule } from './modules/relationship/relationship.module';
import { OrderDetailsModule } from './modules/order-detail/order-details.module';
import { CollateralModule } from './modules/collateral/collateral.module';
import { WinstonLoggerModule } from './modules/logger/logger.module';
import { ApplicationModule } from './modules/applications/application.module';
import config from 'config';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { throttle } from 'rxjs';

@Module({
  imports: [...AppModule.createDynamicImports()],
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
export class AppModule {
  static createDynamicImports(): (Type<any> | DynamicModule)[] {
    const imports: (Type<any> | DynamicModule)[] = [
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
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..\\..\\..\\..\\', 'public'),

        exclude: ['/api*']
      }),
      StorageModule.registerAsync({
        imports: [ConfigService],
        useFactory: (config: ConfigService) => {
          return config.get('filesystem');
        },
        inject: [ConfigService],
      }),
      HomeModule,
      // EventModule,
      StorageModule,
      LoggerModule,
      WinstonLoggerModule,
      CompaniesModule,
      ApplicationModule,
      CompanyInformationModule,
      FinancialsModule,
      FilesModule,
      RatingsModule,
      SectorsModule,
      // SuppliersModule,
      TransactionsModule,
      GoodsAndServicesModule,
      ContractsModule,
      AuthModule,
      RolesModule,
      PermissionsModule,
      MailModule,
      EmailTemplateModule,
      RefreshTokenModule,
      TwofaModule,
      AuctionModule,
      AuctionHistoryModule,
      RelationshipModule,
      OrderDetailsModule,
      CollateralModule,
    ];

    const config = new ConfigService();

    const shouldRunChainhook = config.get('app.runchainhook');
    const shouldRunJobs = config.get('app.runjobs');
    const shouldRunThrottle = config.get('app.runthrottle');

    if (shouldRunThrottle) {
      console.log('Running throttle');
      imports.push(ThrottlerModule.forRootAsync({
        useFactory: () => this.getThrottleConfig(),
      }),)
    }

    if (shouldRunChainhook) {
      console.log('Running chainhook');
      imports.push(RabbitMqModule);
    } else {
      console.log('Not running chainhook');
    }

    if (shouldRunJobs) {
      console.log('Running jobs');
      imports.push(JobsModule);
    } else {
      console.log('Not running jobs');
    }

    return imports;
  }

  private static getThrottleConfig() {
    const throttleConfigVariables = config.get('throttle.global') as any;
    const redisConfig = config.get('queue') as any;

    const throttleConfig: ThrottlerModuleOptions = {
      ttl: process.env.THROTTLE_TTL || throttleConfigVariables.get('ttl'),
      limit: process.env.THROTTLE_LIMIT || throttleConfigVariables.get('limit'),
      storage: new ThrottlerStorageRedisService({
        host: process.env.REDIS_HOST || redisConfig.host,
        port: process.env.REDIS_PORT || redisConfig.port,
        password: process.env.REDIS_PASSWORD || redisConfig.password,
      }),
    };

    return throttleConfig;
  }
}
