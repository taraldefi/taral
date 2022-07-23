import { IsNumberString } from 'class-validator';

export class RequestFileDataDto {
  @IsNumberString()
  externalId: number;
}
