import { IsBoolean } from 'class-validator';

export class TwoFaStatusUpdateDto {
  @IsBoolean()
  isTwoFAEnabled: boolean;
}

export class TwoFaStatusUpdateResult {
  @IsBoolean()
  success: boolean;

  qrcodeUri: string; 
}

