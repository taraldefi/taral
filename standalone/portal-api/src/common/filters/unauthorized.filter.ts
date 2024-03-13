// entity-not-found.filter.ts

import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    UnauthorizedException,
  } from '@nestjs/common';
import CoreLoggerService from '../logging/CoreLoggerService';
  
  @Catch(UnauthorizedException)
  export class UnauthorizedExceptionFilter implements ExceptionFilter {
    constructor(
      private readonly logger: CoreLoggerService,
    ) {}
  
    async catch(exception: UnauthorizedException, host: ArgumentsHost) {
      const response = host.switchToHttp().getResponse();
  
      this.logger.error('Error: ', {
        meta: {
          name: exception.name,
          cause: exception.cause,
          stack: exception.stack,
          error: exception.message,
        },
      });
  
      response.status(401).json({
        statusCode: 401,
        message: `Unauthorized. ${exception.message}`,
      });
    }
  }
  