import { HttpException, HttpStatus } from '@nestjs/common';

type ValidationError =
  | 'no-file'
  | 'incorrect-signature'
  | 'no-rights-on-chain'
  | 'missing-file-id';

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
