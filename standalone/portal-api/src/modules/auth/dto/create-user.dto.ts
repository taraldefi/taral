import { IsIn, IsNumber } from 'class-validator';
import { OmitType } from '@nestjs/swagger';

import { UserStatusEnum } from 'src/modules/auth/user-status.enum';
import { RegisterUserDto } from 'src/modules/auth/dto/register-user.dto';

const statusEnumArray = [
  UserStatusEnum.ACTIVE,
  UserStatusEnum.INACTIVE,
  UserStatusEnum.BLOCKED
];

/**
 * create user data transform object
 */
export class CreateUserDto extends OmitType(RegisterUserDto, [
  'password'
] as const) {
  @IsIn(statusEnumArray, {
    message: `isIn-{"items":"${statusEnumArray.join(',')}"}`
  })
  status: UserStatusEnum;

  @IsNumber()
  roleId: number;
}
