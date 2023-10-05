// entity-not-found.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost, Inject, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) { }

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
