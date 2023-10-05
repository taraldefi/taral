import { ExceptionFilter, Catch, ArgumentsHost, UnprocessableEntityException } from '@nestjs/common';
import { Response } from 'express';

@Catch(UnprocessableEntityException)
export class UnprocessableExceptionFilter implements ExceptionFilter {
  catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      errors: exception.getResponse()  // This will contain your error details
    });
  }
}