import { Module } from '@nestjs/common';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import mailConfig from './config/mail.config';
import fileConfig from './config/file.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { HomeModule } from './home/home.module';
import { EventModule } from '@modules/events';
import { StorageModule } from '@modules/storage';
import { LoggerModule } from 'nestjs-pino';
import { EntitiesModule } from './modules/entity/entity.module';
import { CompaniesModule } from './modules/company/company.module';
import { FinancialsModule } from './modules/financial/financials.module';
import { MailConfigService } from './modules/mail/mail-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, mailConfig, fileConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
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
    FinancialsModule
  ],
})
export class AppModule {}