import { I18nService } from 'nestjs-i18n';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch(HttpException)
export class CommonExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly i18n: I18nService,
  ) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    console.log(JSON.stringify(exception, null,2));

    let message = exception.getResponse() as {
      key: string;
      args: Record<string, any>;
    };

    if (message !== undefined && message.key !== undefined) {
      console.log('Message key', message.key);
      console.log('Message args', JSON.stringify(message.args, null, 2));

      message = await this.i18n.translate(message.key, {
        lang: ctx.getRequest().i18nLang,
        args: message.args,
      });

      this.logger.error('Error: ', {
        meta: {
          error: message,
        },
      });

      response.status(statusCode).json({
        statusCode,
        message,
      });
    } else {
      const simpleException = exception as any;

      let message = "Http Error";

      if (simpleException.response.errors && simpleException.response.errors.message) {
        message = simpleException.response.errors.message;
      } else if (simpleException.message) {
        message = simpleException.message;
      }

      response.status(simpleException.status).json({
        statusCode: simpleException.status,
        message
      });
    }
  }
}
