// entity-not-found.filter.ts

import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    Inject,
    Logger,
    UnauthorizedException,
  } from '@nestjs/common';
  import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
  
  @Catch(UnauthorizedException)
  export class UnauthorizedExceptionFilter implements ExceptionFilter {
    constructor(
      @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
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
  