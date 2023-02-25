import { Module } from '@nestjs/common';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './config/mail.config';
import fileConfig from './config/file.config';
// import * as path from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
// import { I18nJsonParser } from 'nestjs-i18n/dist/parsers/i18n.json.parser';
// import { HeaderResolver } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MailConfigService } from './mail/mail-config.service';
import { HomeModule } from './home/home.module';
import { EventModule } from '@modules/events';
import { StorageModule } from '@modules/storage';
import { OpenTelemetryModule } from '@modules/telemetry';
import { LoggerModule } from 'nestjs-pino';
import { FilesModule } from './files/files.module';
import onchainConfig from './config/onchain.config';

// import { ForgotModule } from './forgot/forgot.module';
// import { MailModule } from './mail/mail.module';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true,
    defaultMetrics: true,
    apiMetrics: {
      enable: true,
    },
  },
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        onchainConfig
      ],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
    // I18nModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     fallbackLanguage: configService.get('app.fallbackLanguage'),
    //     parserOptions: {
    //       path: path.join(
    //         configService.get('app.workingDirectory'),
    //         'src',
    //         'i18n',
    //         'translations',
    //       ),
    //     },
    //   }),
    //   parser: I18nJsonParser,
    //   inject: [ConfigService],
    //   resolvers: [new HeaderResolver(['x-custom-lang'])],
    // }),
    StorageModule.registerAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('filesystem');
      },
      inject: [ConfigService],
    }),
    // UsersModule,
    // AuthModule,
    // ForgotModule,
    // MailModule,
    HomeModule,
    EventModule,
    StorageModule,
    OpenTelemetryModuleConfig,
    LoggerModule,
    FilesModule,
  ],
})
export class AppModule {}
