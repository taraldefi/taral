import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { RoleEnum } from '../roles/roles.enum';
import { StatusEnum } from '../statuses/statuses.enum';
import * as crypto from 'crypto';

import * as qrcode from 'qrcode';

import { plainToClass } from 'class-transformer';
import { Status } from '../statuses/entities/status.entity';
import { Role } from '../roles/entities/role.entity';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { UsersService } from '../users/users.service';
import { ForgotService } from '../forgot/forgot.service';
import { MailService } from '../mail/mail.service';
import { generateSecret, totpVerify } from 'src/utils/otp/otp';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private forgotService: ForgotService,
    private mailService: MailService,
  ) {}

  async validateLogin(
    loginDto: AuthEmailLoginDto,
    onlyAdmin: boolean,
  ): Promise<{ token: string; user: User }> {
    const user = await this.usersService.findOne({
      where: {
        email: loginDto.email,
      },
    });

    if (
      !user ||
      (user &&
        !(onlyAdmin ? [RoleEnum.admin] : [RoleEnum.user]).includes(
          user.role.id,
        ))
    ) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (isValidPassword) {
      const token = await this.jwtService.sign({
        id: user.id,
        role: user.role,
      });

      return { token, user: user };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async enable2faForUser(email: string) {

    const user = await this.usersService.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User does not exists');
    }

    if (user.twoFA_enabled) {
      throw new BadRequestException('2FA already enabled on account');
    }

    const secret = this.generateSecret();

    user.twoFA_secret = secret.base32;

    await this.usersService.update(user.id, user);

    // Generate QRcode
    const url = await qrcode.toDataURL(secret.otpauth_url);

    return { key: secret.base32, qrcode_url: url };
  }

  generateSecret() {
    const secret = generateSecret({ name: 'Invent App' });

    const { hex, base32, otpauth_url } = secret;

    return { hex, base32, otpauth_url };
  }

  async complete2FASetup(email: string, token: string) {
    const user = await this.usersService.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User does not exists');
    }

    if (!user.twoFA_secret) {
      throw new BadRequestException('2FA enabling request not made');
    }

    if (user.twoFA_enabled) {
      throw new BadRequestException('2FA already enabled on account');
    }

    const verify2FAToken = this.verify2FAOtp(user.twoFA_secret, token);

    if (!verify2FAToken) {
      throw new BadRequestException('Invalid token provided');
    }


    user.twoFA_enabled = true;
    await this.usersService.update(user.id, user);

    return {
      status: true,
      message: '2FA successfully enabled on account account',
    };
  }

  verify2FAOtp(secret: string, token: string): boolean {
    return totpVerify({
      encoding: 'base64',
      token,
      key: secret,
      counter: Date.now(),
    });
  }

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const user = await this.usersService.create({
      ...dto,
      email: dto.email,
      role: {
        id: RoleEnum.user,
      } as Role,
      status: {
        id: StatusEnum.inactive,
      } as Status,
      hash,
    });

    await this.mailService.userSignUp({
      to: user.email,
      data: {
        hash,
      },
    });
  }

  async confirmEmail(hash: string): Promise<void> {
    const user = await this.usersService.findOne({
      where: {
        hash: hash,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `notFound`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    user.hash = null;
    user.status = plainToClass(Status, {
      id: StatusEnum.active,
    });
    await user.save();
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.usersService.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailNotExists',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      const hash = crypto
        .createHash('sha256')
        .update(randomStringGenerator())
        .digest('hex');
      await this.forgotService.create({
        hash,
        user,
      });

      await this.mailService.forgotPassword({
        to: email,
        data: {
          hash,
        },
      });
    }
  }

  async resetPassword(hash: string, password: string): Promise<void> {
    const forgot = await this.forgotService.findOne({
      hash,
    });

    if (!forgot) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            hash: `notFound`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = forgot.user;
    user.password = password;
    await user.save();
    await this.forgotService.softDelete(forgot.id);
  }

  async me(user: User): Promise<User> {
    return this.usersService.findOne({
      where: {
        id: user.id,
      },
    });
  }

  async update(user: User, userDto: AuthUpdateDto): Promise<User> {
    if (userDto.password) {
      if (userDto.oldPassword) {
        const currentUser = await this.usersService.findOne({
          where: {
            id: user.id,
          },
        });

        const isValidOldPassword = await bcrypt.compare(
          userDto.oldPassword,
          currentUser.password,
        );

        if (!isValidOldPassword) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                oldPassword: 'incorrectOldPassword',
              },
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      } else {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              oldPassword: 'missingOldPassword',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    await this.usersService.update(user.id, userDto);

    return this.usersService.findOne({
      where: {
        id: user.id,
      },
    });
  }

  async softDelete(user: User): Promise<void> {
    await this.usersService.softDelete(user.id);
  }
}
