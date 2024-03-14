import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import nodemailer from 'nodemailer';
import { MailService } from 'src/modules/mail/mail.service';
import { MailProcessor } from 'src/modules/mail/mail.processor';
import { EmailTemplateModule } from 'src/modules/email-template/email-template.module';
import { Configuration } from '../../configuration';
import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { LoggerModule } from 'src/common/logging/logger.module';

const mailConfig = Configuration.mail;

async function constructTransport(): Promise<TransportType> {
  const transportType = {
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    requireTLS: true,
    logger: true,
    debug: true,
    secure: false,
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

  const isDevelopment = Configuration.app.nodeEnv === 'development';

  if (!isDevelopment) {
    // With the verify() function we can check whether the authentication is successful. If it isn`t, then terminate function execution with the error.
    try {
      await transporter.verify();
    } catch (error) {
        console.log('Could not verify the connection to the mail server. Error:', error);
        // throw error;
    }
  } else {
    console.log('Skipping mail server connection verification in development mode');
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
    LoggerModule
  ],
  controllers: [],
  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule {}
