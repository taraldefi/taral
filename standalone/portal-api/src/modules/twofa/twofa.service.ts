import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { authenticator } from 'otplib';
import { toFileStream, toDataURL } from 'qrcode';

import { StatusCodesList } from 'src/common/constants/status-codes-list.constants';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserEntity } from 'src/modules/auth/entity/user.entity';
import { CustomHttpException } from 'src/modules/exception/custom-http.exception';
import { Configuration } from '../../configuration';
import { BaseService } from 'src/common/services/base.service';
import CoreLoggerService from 'src/common/logging/CoreLoggerService';

const TwofaConfig = Configuration.twoFa;

@Injectable()
export class TwofaService extends BaseService {

  constructor(private readonly usersService: AuthService, public logger: CoreLoggerService) {
    super(logger);
  }

  async generateTwoFASecret(user: UserEntity) {
    if (user.twoFAThrottleTime > new Date()) {
      throw new CustomHttpException(
        `tooManyRequest-{"second":"${this.differentBetweenDatesInSec(
          user.twoFAThrottleTime,
          new Date(),
        )}"}`,
        HttpStatus.TOO_MANY_REQUESTS,
        StatusCodesList.TooManyTries,
      );
    }
    
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(
      user.email,
      TwofaConfig.authenticationAppNAme,
      secret,
    );

    await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);
    
    return {
      secret,
      otpauthUrl,
    };
  }

  isTwoFACodeValid(twoFASecret: string, user: UserEntity) {
    return authenticator.verify({
      token: twoFASecret,
      secret: user.twoFASecret,
    });
  }

  async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }

  async qrDataToUrl(otpauthUrl: string): Promise<string> {
    return toDataURL(otpauthUrl);
  }

  differentBetweenDatesInSec(initialDate: Date, endDate: Date): number {
    const diffInSeconds = Math.abs(initialDate.getTime() - endDate.getTime());
    return Math.round(diffInSeconds / 1000);
  }
}
