import { HttpException, HttpStatus } from '@nestjs/common';

type ValidationError =
  | 'entity-not-found'
  | 'missing-entity-id'

export function triggerError(error: ValidationError): HttpException {
  return new HttpException(
    {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      errors: {
        message: error,
      },
    },
    HttpStatus.UNPROCESSABLE_ENTITY,
  );
}
