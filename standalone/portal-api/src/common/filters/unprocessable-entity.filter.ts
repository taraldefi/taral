import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnprocessableEntityException,
  Inject,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Catch(UnprocessableEntityException)
export class UnprocessableExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    this.logger.error('Error: ', {
      meta: {
        name: exception.name,
        message: exception.message,
        cause: exception.cause,
        stack: exception.stack,
        error: exception.getResponse(),
      },
    });

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      errors: exception.getResponse(), // This will contain your error details
    });
  }
}
