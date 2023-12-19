import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    Inject,
    Logger,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CustomHttpException } from 'src/modules/exception/custom-http.exception';
  
  @Catch(CustomHttpException)
  export class CustomHttpExceptionFilter implements ExceptionFilter {
    constructor(
      @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}
  
    catch(exception: CustomHttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();

      console.log('Catch exception in custom http exception filter');
  
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
  