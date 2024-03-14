import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

import { UniqueValidatorPipe } from 'src/common/pipes/unique-validator.pipe';
import { UserEntity } from 'src/modules/auth/entity/user.entity';

/**
 * register user data transform object
 */
export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  @Validate(UniqueValidatorPipe, [UserEntity], {
    message: 'username is already taken',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsLowercase()
  @Validate(UniqueValidatorPipe, [UserEntity], {
    message: 'email is already taken',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'minimum length of password should be 6 characters',
  })
  @MaxLength(20, {
    message: 'maximum length of password should be 6 characters',
  })
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/,
    {
      message:
        'password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
    },
  )
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
