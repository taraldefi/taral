import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UAParser } from 'ua-parser-js';

import { GetUser } from 'src/common/decorators/get-user.decorator';
import JwtTwoFactorGuard from 'src/common/guard/jwt-two-factor.guard';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import { multerOptionsHelper } from 'src/common/helper/multer-options.helper';
import { Pagination } from 'src/modules/paginate';
import { RefreshTokenEntity } from 'src/modules/refresh-token/entities/refresh-token.entity';
import { AuthService } from 'src/modules/auth/auth.service';
import { ChangePasswordDto } from 'src/modules/auth/dto/change-password.dto';
import { CreateUserDto } from 'src/modules/auth/dto/create-user.dto';
import { ForgetPasswordDto } from 'src/modules/auth/dto/forget-password.dto';
import { RegisterUserDto } from 'src/modules/auth/dto/register-user.dto';
import { ResetPasswordDto } from 'src/modules/auth/dto/reset-password.dto';
import { UpdateUserProfileDto } from 'src/modules/auth/dto/update-user-profile.dto';
import { UpdateUserDto } from 'src/modules/auth/dto/update-user.dto';
import { UserLoginDto } from 'src/modules/auth/dto/user-login.dto';
import { UserSearchFilterDto } from 'src/modules/auth/dto/user-search-filter.dto';
import { UserEntity } from 'src/modules/auth/entity/user.entity';
import { UserSerializer } from 'src/modules/auth/serializer/user.serializer';
import { RefreshPaginateFilterDto } from 'src/modules/refresh-token/dto/refresh-paginate-filter.dto';
import { RefreshTokenSerializer } from 'src/modules/refresh-token/serializer/refresh-token.serializer';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthResponse } from './dto/auth-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';

@ApiTags('user')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/auth/register')
  register(
    @Body(ValidationPipe)
    registerUserDto: RegisterUserDto,
  ): Promise<RegisterResponseDto> {
    return this.authService.register(registerUserDto);
  }

  @Post('/auth/login')
  async login(
    @Req()
    req: Request,
    @Body()
    userLoginDto: UserLoginDto,
  ): Promise<AuthResponse> {
    const ua = UAParser(req.headers['user-agent']);
    const refreshTokenPayload: Partial<RefreshTokenEntity> = {
      ip: req.ip,
      userAgent: JSON.stringify(ua),
      browser: ua.browser.name,
      os: ua.os.name,
    };
    const authResponsePayload = await this.authService.login(
      userLoginDto,
      refreshTokenPayload,
    );

    return authResponsePayload;
  }

  @Post('/auth/refresh')
  async refresh(
    @Body()
    refreshTokenDto: RefreshTokenDto
  ): Promise<AuthResponse> {
    const authResponsePayload =
      await this.authService.createAccessTokenFromRefreshToken(
        refreshTokenDto.refreshToken,
      );

    return authResponsePayload;
  }

  @Get('/auth/activate-account')
  @HttpCode(HttpStatus.NO_CONTENT)
  activateAccount(
    @Query('token')
    token: string,
  ): Promise<void> {
    return this.authService.activateAccount(token);
  }

  @Put('/auth/forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  forgotPassword(
    @Body()
    forgetPasswordDto: ForgetPasswordDto,
  ): Promise<void> {
    return this.authService.forgotPassword(forgetPasswordDto);
  }

  @Put('/auth/reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  resetPassword(
    @Body()
    resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @UseGuards(JwtTwoFactorGuard)
  @Get('/auth/profile')
  profile(
    @GetUser()
    user: UserEntity,
  ): Promise<UserSerializer> {
    return this.authService.get(user);
  }

  @UseGuards(JwtTwoFactorGuard)
  @Put('/auth/profile')
  @UseInterceptors(
    FileInterceptor(
      'avatar',
      multerOptionsHelper('public/images/profile', 1000000),
    ),
  )
  updateProfile(
    @GetUser()
    user: UserEntity,
    @UploadedFile()
    file: Express.Multer.File,
    @Body()
    updateUserDto: UpdateUserProfileDto,
  ): Promise<UserSerializer> {
    if (file) {
      updateUserDto.avatar = file.filename;
    }
    return this.authService.update(user.id, updateUserDto);
  }

  @UseGuards(JwtTwoFactorGuard)
  @Put('/auth/change-password')
  changePassword(
    @GetUser()
    user: UserEntity,
    @Body()
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    return this.authService.changePassword(user, changePasswordDto);
  }

  @UseGuards(JwtTwoFactorGuard, PermissionGuard)
  @Get('/users')
  findAll(
    @Query()
    userSearchFilterDto: UserSearchFilterDto,
  ): Promise<Pagination<UserSerializer>> {
    return this.authService.findAll(userSearchFilterDto);
  }

  @UseGuards(JwtTwoFactorGuard, PermissionGuard)
  @Post('/users')
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ): Promise<UserSerializer> {
    return this.authService.create(createUserDto);
  }

  @UseGuards(JwtTwoFactorGuard, PermissionGuard)
  @Put('/users/:id')
  update(
    @Param('id')
    id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ): Promise<UserSerializer> {
    return this.authService.update(+id, updateUserDto);
  }

  @UseGuards(JwtTwoFactorGuard, PermissionGuard)
  @Get('/users/:id')
  findOne(
    @Param('id')
    id: string,
  ): Promise<UserSerializer> {
    return this.authService.findById(+id);
  }

  @Post('/auth/logout')
  async logOut(
    @Body()
    refreshTokenDto: RefreshTokenDto,
  ): Promise<LogoutResponseDto> {
    if (refreshTokenDto.refreshToken) {
      await this.authService.revokeRefreshToken(refreshTokenDto.refreshToken);
    }

    return {
      loggedOut: true,
    };
  }

  @UseGuards(JwtTwoFactorGuard)
  @Get('/auth/token-info')
  getRefreshToken(
    @Query()
    filter: RefreshPaginateFilterDto,
    @GetUser()
    user: UserEntity,
  ): Promise<Pagination<RefreshTokenSerializer>> {
    return this.authService.activeRefreshTokenList(+user.id, filter);
  }

  @UseGuards(JwtTwoFactorGuard)
  @Put('/revoke/:id')
  revokeToken(
    @Param('id')
    id: string,
    @GetUser()
    user: UserEntity,
  ) {
    return this.authService.revokeTokenById(+id, user.id);
  }
}
