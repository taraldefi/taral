// entity-not-found.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import CoreLoggerService from '../logging/CoreLoggerService';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
  constructor(
    private readonly logger: CoreLoggerService,
  ) {}

  async catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    this.logger.error('Error: ', {
      meta: {
        name: exception.name,
        cause: exception.cause,
        stack: exception.stack,
        error: exception.message,
      },
    });

    response.status(404).json({
      statusCode: 404,
      message: `Entity not found. ${exception.message}`,
    });
  }
}
