import { Module } from '@nestjs/common';
import mailConfig from './config/mail.config';
import fileConfig from './config/file.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
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
import { JobsModule } from './modules/jobs/jobs.module';
import {
  CookieResolver,
  HeaderResolver,
  I18nJsonParser,
  I18nModule,
  QueryResolver
} from 'nestjs-i18n';
import ormConfig from './config/orm.config';
import throttleConfig from './config/throttle.config'
import winstonConfig from './config/winston.config';
import { WinstonModule } from 'nest-winston';
import { ServeStaticModule } from '@nestjs/serve-static';
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
import config from 'config';
import { join } from 'path';

import path from 'path';
import { AppController } from './app.controller';

const appConfig = config.get('app');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, mailConfig, fileConfig],
      envFilePath: ['.env'],
    }),
    // TypeOrmModule.forRootAsync({
    //   useClass: TypeOrmConfigService,
    // }),
    WinstonModule.forRoot(winstonConfig),
    ThrottlerModule.forRootAsync({
      useFactory: () => throttleConfig
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ormConfig
    }),
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: appConfig.fallbackLanguage,
        parserOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: true
        }
      }),
      parser: I18nJsonParser,
      resolvers: [
        {
          use: QueryResolver,
          options: ['lang', 'locale', 'l']
        },
        new HeaderResolver(['x-custom-lang']),
        new CookieResolver(['lang', 'locale', 'l'])
      ]
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
    RatingsModule,
    SectorsModule,
    SuppliersModule,
    BuyersModule,
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
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe
    },
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard
    },
    {
      provide: APP_FILTER,
      useClass: I18nExceptionFilterPipe
    }
  ],
  controllers: [AppController],
})
export class AppModule {}
