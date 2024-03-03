import { Logger } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';

import { MailJobInterface } from 'src/modules/mail/interface/mail-job.interface';
import { Configuration } from '../../configuration';

@Processor(Configuration.mail.queueName)
export class MailProcessor {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly mailerService: MailerService) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(
        job.data,
      )}`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.debug(
      `Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(
        result,
      )}`,
    );
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process('system-mail')
  async sendEmail(
    job: Job<{
      payload: MailJobInterface;
      type: string;
    }>,
  ): Promise<any> {
    this.logger.log(`Sending email to '${job.data.payload.to}'`);
    const mailConfig = Configuration.mail;
    console.log("mailConfig", JSON.stringify(mailConfig, null, 2));
    try {
      const options: ISendMailOptions = {
        to: job.data.payload.to,
        from: mailConfig.from,
        subject: job.data.payload.subject,
        template: 'email-layout',
        context: job.data.payload.context,
        html: job.data.payload.context,
        text: job.data.payload.context,
      };
      const sendResult = await this.mailerService.sendMail({ ...options });
      return sendResult;
    } catch (error) {
      this.logger.error(
        `Failed to send email to '${job.data.payload.to}'`,
        error.stack,
      );
      throw error;
    }
  }
}
