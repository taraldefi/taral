import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    console.log('Raw Errors:', JSON.stringify(errors, null, 2));

    if (errors && errors.length > 0) {
      const translatedError = this.transformError(errors);

      console.log('Translated Errors:', JSON.stringify(translatedError, null, 2));

      throw new UnprocessableEntityException(translatedError);
    }
    return value;
  }

  transformError(errors: ValidationError[]): any[] {
    const transformedErrors: any[] = [];
  
    function extractErrors(error: ValidationError, prefix = ''): void {
      if (error.constraints) {
        for (const key in error.constraints) {
          transformedErrors.push({
            name: prefix + error.property,
            errors: [error.constraints[key]]
          });
        }
      }
      if (error.children) {
        error.children.forEach(child => extractErrors(child, prefix + error.property + '.'));
      }
    }
  
    errors.forEach(error => extractErrors(error));
    return transformedErrors;
  }

  private toValidate(metatype: unknown): boolean {
    const types: unknown[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
