import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseDto<T> {
  @ApiProperty()
  data: T;

  success: boolean;

  error: string;

  errorCode: number;
}