import { Transform } from 'class-transformer';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

import { IsEqualTo } from 'src/common/decorators/is-equal-to.decorator';

/**
 * change password data transfer object
 */
export class ChangePasswordDto {
  @IsNotEmpty()
  @Transform(({ obj }) => {
    return `[${typeof obj.password}]`;
  })
  oldPassword: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'minLength-{"ln":6,"count":6}',
  })
  @MaxLength(20, {
    message: 'maxLength-{"ln":20,"count":20}',
  })
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/,
    {
      message:
        'password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
    },
  )
  @Transform(({ obj }) => {
    return `[${typeof obj.password}]`;
  })
  password: string;

  @IsNotEmpty()
  @IsEqualTo('password', {
    message: 'isEqualTo-{"field":"password"}',
  })
  @Transform(({ obj }) => {
    return `[${typeof obj.password}]`;
  })
  confirmPassword: string;
}
