import { Transform } from 'class-transformer';
import { IsLowercase, IsNotEmpty, IsBoolean } from 'class-validator';

/**
 * user login data transfer object
 */
export class UserLoginLoggingDto {
  @IsNotEmpty()
  @IsLowercase()
  username: string;

  @IsNotEmpty()
  @Transform(({ obj }) => {
    return `[${typeof obj.password}]`;
  })
  password: string;

  @IsBoolean()
  remember: boolean;
}
