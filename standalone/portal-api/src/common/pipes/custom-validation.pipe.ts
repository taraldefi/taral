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
    if (errors && errors.length > 0) {
      const translatedErrors = this.transformErrors(errors);
      throw new UnprocessableEntityException(translatedErrors);
    }
    return value;
  }

  transformErrors(errors: ValidationError[]): any[] {
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
