import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from 'src/modules/auth/auth.service';
import { UserEntity } from 'src/modules/auth/entity/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { TwofaCodeDto } from 'src/modules/twofa/dto/twofa-code.dto';
import {
  TwoFaStatusUpdateDto,
  TwoFaStatusUpdateResult,
} from 'src/modules/twofa/dto/twofa-status-update.dto';
import { TwofaService } from 'src/modules/twofa/twofa.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { AuthResponse } from '../auth/dto/auth-response.dto';

@Controller('twofa')
export class TwofaController {
  constructor(
    private readonly twofaService: TwofaService,
    private readonly usersService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @Post('authenticate')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async authenticate(
    @Req()
    req: Request,
    @Res()
    response: Response,
    @GetUser()
    user: UserEntity,
    @Body()
    twofaCodeDto: TwofaCodeDto,
  ): Promise<AuthResponse> {
    //TODO(doru): if environment is development, skip 2fa

    const isCodeValid = this.twofaService.isTwoFACodeValid(
      twofaCodeDto.code,
      user,
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('invalidOTP');
    }
    const accessToken = await this.refreshTokenService.generateAccessToken(
      user,
      true,
    );
    const authPayload = this.usersService.buildResponsePayload(accessToken);
    return authPayload;
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async toggleTwoFa(
    @Body()
    twofaStatusUpdateDto: TwoFaStatusUpdateDto,
    @GetUser()
    user: UserEntity,
  ): Promise<TwoFaStatusUpdateResult> {
    let qrDataUri = null;
    if (twofaStatusUpdateDto.isTwoFAEnabled) {
      const { otpauthUrl } = await this.twofaService.generateTwoFASecret(user);
      qrDataUri = await this.twofaService.qrDataToUrl(otpauthUrl);
    }
    const updateResult = await this.usersService.turnOnTwoFactorAuthentication(
      user,
      twofaStatusUpdateDto.isTwoFAEnabled,
      qrDataUri,
    );

    return {
      success: updateResult !== null,
      qrcodeUri: qrDataUri,
    };
  }
}
