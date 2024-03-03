import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { MailService } from 'src/modules/mail/mail.service';
import { MailProcessor } from 'src/modules/mail/mail.processor';
import { EmailTemplateModule } from 'src/modules/email-template/email-template.module';
import { Configuration } from '../../configuration';
import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';

const mailConfig = Configuration.mail;

async function constructTransport(): Promise<TransportType> {
  const transportType = {
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: mailConfig.user,
      pass: mailConfig.password,
    },
    defaults: {
      from: `"${mailConfig.from}" <${mailConfig.user}>`,
    },
    template: {
      dir: __dirname + '/templates/email/layouts/',
      
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
  };

  const transporter = nodemailer.createTransport(transportType);

  // With the verify() function we can check whether the authentication is successful. If it isn`t, then terminate function execution with the error.
  try {
    await transporter.verify();
  } catch (error) {
      throw error;
  }

  return transportType;
}

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
      useFactory: async () => {
        const transport = await constructTransport();
        return {
          transport: transport,
        }
      },
    }),
  ],
  controllers: [],
  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule {}
