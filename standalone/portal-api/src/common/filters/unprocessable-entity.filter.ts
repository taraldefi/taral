import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';
import CoreLoggerService from '../logging/CoreLoggerService';

@Catch(UnprocessableEntityException)
export class UnprocessableExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: CoreLoggerService,
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
