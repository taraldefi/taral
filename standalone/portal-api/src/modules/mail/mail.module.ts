import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import config from 'config';

import { MailService } from 'src/modules/mail/mail.service';
import { MailProcessor } from 'src/modules/mail/mail.processor';
import { EmailTemplateModule } from 'src/modules/email-template/email-template.module';
import { Configuration } from '../../configuration';

const mailConfig = Configuration.mail;
const queueConfig = Configuration.queue;

@Module({
  imports: [
    EmailTemplateModule,
    BullModule.registerQueueAsync({
      name: mailConfig.queueName,
      useFactory: () => ({
        redis: {
          host: Configuration.redis.host,
          port: Configuration.redis.port,
          password: Configuration.redis.password,
          retryStrategy(times) {
            return Math.min(times * 50, 2000);
          },
        },
      }),
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_HOST || mailConfig.host,
          port: process.env.MAIL_PORT || mailConfig.port,
          secure: mailConfig.secure,
          ignoreTLS: mailConfig.ignoreTls,
          auth: {
            user: mailConfig.user,
            pass: mailConfig.password,
          },
          tls: {
            //TODO: make sure we do not have this in production. This is for development only to allow self signed certs
            // do not fail on invalid certs
            rejectUnauthorized: false,
          },
        },
        defaults: {
          from: `"${process.env.MAIL_FROM || mailConfig.from}" <${
            mailConfig.from
          }>`,
        },
        preview: mailConfig.preview,
        template: {
          dir: __dirname + '/templates/email/layouts/',
          
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [],
  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule {}
