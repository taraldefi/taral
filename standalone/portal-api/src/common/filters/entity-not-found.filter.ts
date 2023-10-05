// entity-not-found.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.status(404).json({
      statusCode: 404,
      message: `Entity not found. ${exception.message}`,
    });
  }
}
