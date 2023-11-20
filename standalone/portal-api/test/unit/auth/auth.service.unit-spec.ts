import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UnprocessableEntityException } from '@nestjs/common';

import { AuthService } from 'src/modules/auth/auth.service';
import { UserEntityRepository } from 'src/modules/auth/user.repository';
import { CreateUserDto } from 'src/modules/auth/dto/create-user.dto';
import { UserLoginDto } from 'src/modules/auth/dto/user-login.dto';
import { UserEntity } from 'src/modules/auth/entity/user.entity';
import { UpdateUserProfileDto } from 'src/modules/auth/dto/update-user-profile.dto';
import { ResetPasswordDto } from 'src/modules/auth/dto/reset-password.dto';
import { ForgetPasswordDto } from 'src/modules/auth/dto/forget-password.dto';
import { UserStatusEnum } from 'src/modules/auth/user-status.enum';
import { ChangePasswordDto } from 'src/modules/auth/dto/change-password.dto';
import { MailService } from 'src/modules/mail/mail.service';
import { RefreshTokenService } from 'src/modules/refresh-token/refresh-token.service';
import { UserSerializer } from 'src/modules/auth/serializer/user.serializer';
import { NotFoundException } from 'src/modules/exception/not-found.exception';
import { CustomHttpException } from 'src/modules/exception/custom-http.exception';
import { RefreshPaginateFilterDto } from 'src/modules/refresh-token/dto/refresh-paginate-filter.dto';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockUserRepository = () => ({
  findOne: jest.fn(),
  update: jest.fn(),
  get: jest.fn(),
  store: jest.fn(),
  login: jest.fn(),
  transform: jest.fn(),
  findBy: jest.fn(),
  updateEntity: jest.fn(),
  getUserForResetPassword: jest.fn(),
  countEntityByCondition: jest.fn(),
});

const mockUser = {
  email: 'test@mail.com',
  username: 'tester',
  name: 'test',
  password: 'test123',
  roleId: 2,
  status: UserStatusEnum.ACTIVE,
  save: jest.fn(),
};

const refreshTokenServiceMock = () => ({
  generateRefreshToken: jest.fn(),
  resolveRefreshToken: jest.fn(),
  getRefreshTokenByUserId: jest.fn(),
  revokeRefreshTokenById: jest.fn(),
});

const throttleMock = () => ({
  get: jest.fn(),
  delete: jest.fn(),
});

const mailServiceMock = () => ({
  sendMail: jest.fn(),
});

const jwtServiceMock = () => ({
  signAsync: jest.fn(),
  verifyAsync: jest.fn(),
});

describe('AuthService', () => {
  let authService: AuthService,
    userRepository,
    refreshTokenService,
    mailService,
    throttleService,
    jwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useFactory: jwtServiceMock,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: mockUserRepository,
        },
        {
          provide: RefreshTokenService,
          useFactory: refreshTokenServiceMock,
        },
        {
          provide: MailService,
          useFactory: mailServiceMock,
        },
        {
          provide: 'LOGIN_THROTTLE',
          useFactory: throttleMock,
        },
      ],
    }).compile();

    authService = await module.get<AuthService>(AuthService);
    userRepository = await module.get(getRepositoryToken(UserEntity));
    refreshTokenService =
      await module.get<RefreshTokenService>(RefreshTokenService);
    mailService = await module.get<MailService>(MailService);
    throttleService = await module.get<'LOGIN_THROTTLE'>('LOGIN_THROTTLE');
    jwtService = await module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('change or forgot password', () => {
    it('forgot password with email', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      const forgetPasswordDto: ForgetPasswordDto = {
        email: 'taraluser@gmail.com',
      };
      await authService.forgotPassword(forgetPasswordDto);
      expect(mockUser.save).toHaveBeenCalledTimes(1);
      expect(mailService.sendMail).toHaveBeenCalled();
    });
    it('check if generate code works as expected', () => {
      const result = authService.generateRandomCode(5);
      expect(typeof result).toBe('string');
      expect(result.length).toEqual(5);
    });

    it('generate unique code test', async () => {
      authService.generateRandomCode = jest.fn().mockReturnValue('W45Rft');
      userRepository.countEntityByCondition.mockResolvedValue(0);
      await authService.generateUniqueToken(6);
      expect(authService.generateRandomCode).toHaveBeenCalledWith(6);
      expect(userRepository.countEntityByCondition).toHaveBeenCalledWith({
        token: 'W45Rft',
      });
    });

    describe('reset password test', () => {
      let resetPasswordDto: ResetPasswordDto;
      beforeEach(() => {
        resetPasswordDto = {
          password: 'Truthy@123',
          confirmPassword: 'Truthy@123',
          token: 'Aer23C',
        };
      });
      it('reset password for existing user', async () => {
        userRepository.getUserForResetPassword.mockResolvedValue(mockUser);
        authService.generateUniqueToken = jest.fn();
        await authService.resetPassword(resetPasswordDto);
        expect(userRepository.getUserForResetPassword).toHaveBeenCalledWith(
          resetPasswordDto,
        );
        expect(authService.generateUniqueToken).toHaveBeenCalledTimes(1);
        expect(mockUser.save).toHaveBeenCalled();
      });
      it('try to reset password with invalid token', async () => {
        userRepository.getUserForResetPassword.mockResolvedValue(null);
        await expect(
          authService.resetPassword(resetPasswordDto),
        ).rejects.toThrowError(NotFoundException);
      });
      describe('change password', () => {
        let user: UserEntity, changePasswordDto: ChangePasswordDto;
        beforeEach(() => {
          jest.clearAllMocks();
          changePasswordDto = {
            oldPassword: 'Truthy@prev',
            password: 'Truthy@123',
            confirmPassword: 'Truthy@123',
          };

          user = new UserEntity();
          user.email = mockUser.email;
          user.username = mockUser.username;
          user.password = mockUser.password;
          user.salt = 'result';
          user.save = mockUser.save;
        });
        it('change password for loggedin user with correct password', async () => {
          user.validatePassword = jest.fn().mockResolvedValue(true);
          bcrypt.hash = jest.fn().mockResolvedValue('result');
          await authService.changePassword(user, changePasswordDto);
          expect(user.validatePassword).toHaveBeenCalledTimes(1);
          expect(user.save).toHaveBeenCalledTimes(1);
        });
        it('change password for loggedin user with incorrect password', async () => {
          bcrypt.hash = jest.fn().mockResolvedValue('result');
          user.validatePassword = jest.fn().mockResolvedValue(false);
          await expect(
            authService.changePassword(user, changePasswordDto),
          ).rejects.toThrowError(CustomHttpException);
          expect(user.validatePassword).toHaveBeenCalledTimes(1);
          expect(user.save).toHaveBeenCalledTimes(0);
        });
      });
    });
  });

  it('generate access token', async () => {
    const user = new UserSerializer();
    user.id = 1;
    user.email = 'test@mail.com';
    await refreshTokenService.generateAccessToken(user);
    expect(jwtService.signAsync).toHaveBeenCalledTimes(1);
  });

  describe('addUser', () => {
    it('add new user test', async () => {
      const token = 'Adf2vBnVV';
      authService.generateUniqueToken = jest.fn().mockResolvedValue(token);
      userRepository.store.mockResolvedValue(mockUser);
      const createUserDto: CreateUserDto = mockUser;
      await authService.create(createUserDto);
      expect(authService.generateUniqueToken).toHaveBeenCalled();
      expect(userRepository.store).toHaveBeenCalledWith(createUserDto, token);
      expect(mailService.sendMail).toHaveBeenCalledTimes(1);
      expect(userRepository.store).not.toThrow();
    });

    it('activate account with valid token', async () => {
      authService.generateUniqueToken = jest.fn();
      userRepository.findOne.mockResolvedValue(mockUser);
      mockUser.status = UserStatusEnum.INACTIVE; // initially user will have inactive status
      const token = 'Adf2vBnVV';
      await authService.activateAccount(token);
      expect(userRepository.findOne).toHaveBeenCalledWith({ token });
      expect(authService.generateUniqueToken).toHaveBeenCalled();
      expect(mockUser.save).toHaveBeenCalled();
    });

    it('activate account with invalid token', async () => {
      userRepository.findOne.mockResolvedValue(null);
      const token = 'Bgf2vBnVV';
      await expect(authService.activateAccount(token)).rejects.toThrowError(
        NotFoundException,
      );
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUser.save).toHaveBeenCalledTimes(0);
    });
  });

  describe('findBy', () => {
    it('find user by id', async () => {
      userRepository.findBy.mockResolvedValue(mockUser);
      const result = await authService.findBy('username', 'tester');
      expect(userRepository.findBy).toHaveBeenCalledWith('username', 'tester');
      expect(result).toBe(mockUser);
    });
  });

  describe('logged in user functionality', () => {
    let userLoginDto: UserLoginDto, user, ip: string, refreshTokenPayload;
    beforeEach(() => {
      userLoginDto = {
        password: mockUser.password,
        username: mockUser.username,
        remember: true,
      };
      user = new UserEntity();
      user.id = 1;
      user.email = mockUser.email;
      user.username = mockUser.username;
      user.password = mockUser.password;
      ip = '::1';
      refreshTokenPayload = {
        ip: '::1',
        userAgent: 'mozilla',
      };
    });

    it('check if throttle error occurs if user tries to login multiple times', async () => {
      throttleService.get.mockResolvedValue({
        consumedPoints: 6,
        msBeforeNext: 3000,
      });
      userRepository.login.mockResolvedValue(user);
      await expect(
        authService.login(userLoginDto, refreshTokenPayload),
      ).rejects.toThrowError(CustomHttpException);
    });

    it('login user successfully', async () => {
      throttleService.get.mockResolvedValue(null);
      jest
        .spyOn(authService, 'buildResponsePayload')
        .mockReturnValue(['result']);
      userRepository.login.mockResolvedValue([user, null]);
      jest
        .spyOn(refreshTokenService, 'generateAccessToken')
        .mockResolvedValue('access_token');
      await authService.login(userLoginDto, refreshTokenPayload);
      expect(userRepository.login).toHaveBeenCalledWith(userLoginDto);
      expect(throttleService.delete).toHaveBeenCalledWith(
        `${user.username}_${ip}`,
      );
      expect(refreshTokenService.generateRefreshToken).toHaveBeenCalledTimes(1);
      expect(refreshTokenService.generateAccessToken).toHaveBeenCalledTimes(1);
      expect(authService.buildResponsePayload).toHaveBeenCalledTimes(1);
    });

    it('get profile', async () => {
      userRepository.transform.mockResolvedValue(mockUser);
      await authService.get(user);
      expect(userRepository.transform).toHaveBeenCalledTimes(1);
    });

    it('get user by id', async () => {
      userRepository.get.mockResolvedValue(mockUser);
      await authService.findById(1);
      expect(userRepository.get).toHaveBeenCalledTimes(1);
    });

    describe('update user', () => {
      let updateUserDto: UpdateUserProfileDto;
      beforeEach(() => {
        updateUserDto = {
          email: 'test@test.com',
          username: 'tester123',
          name: 'tester',
          avatar: 'test.jpg',
          address: 'test',
          contact: 'test',
        };
      });

      it('update user with duplicate username & email', async () => {
        userRepository.countEntityByCondition.mockResolvedValue(1);

        userRepository.get.mockResolvedValue(mockUser);
        await expect(
          authService.update(user, updateUserDto),
        ).rejects.toThrowError(UnprocessableEntityException);
        expect(userRepository.countEntityByCondition).toHaveBeenCalledTimes(2);
      });

      it('update user with non duplicate username & email', async () => {
        userRepository.updateEntity.mockResolvedValue(mockUser);
        userRepository.get.mockResolvedValue(mockUser);
        userRepository.countEntityByCondition.mockResolvedValue(0);
        await authService.update(user.id, updateUserDto);
        expect(userRepository.countEntityByCondition).toHaveBeenCalledTimes(2);
        expect(userRepository.updateEntity).toHaveBeenCalledTimes(1);
        expect(userRepository.updateEntity).toHaveBeenCalledWith(
          mockUser,
          updateUserDto,
        );
        expect(userRepository.updateEntity).not.toThrow();
      });
    });

    it('logout user', async () => {
      const mockToken = {
        id: 1,
        userId: 1,
        save: jest.fn(),
      };
      refreshTokenService.resolveRefreshToken.mockResolvedValue({
        user: mockUser,
        token: mockToken,
      });
      await authService.revokeRefreshToken('refresh_token');
      expect(refreshTokenService.resolveRefreshToken).toHaveBeenCalledTimes(1);
      expect(refreshTokenService.resolveRefreshToken).toHaveBeenCalledWith(
        'refresh_token',
      );
    });
  });

  it('get user token list', async () => {
    const userId = 1;
    const filter: RefreshPaginateFilterDto = {
      limit: 10,
      page: 1,
    };
    await authService.activeRefreshTokenList(userId, filter);
    expect(refreshTokenService.getRefreshTokenByUserId).toHaveBeenCalledWith(
      userId,
      filter,
    );
    expect(refreshTokenService.getRefreshTokenByUserId).toHaveBeenCalledTimes(
      1,
    );
  });

  it('revokeTokenById', async () => {
    const mockRefreshToken = {
      ip: '::1',
      userAgent: 'mozilla',
    };
    refreshTokenService.revokeRefreshTokenById.mockResolvedValue(
      mockRefreshToken,
    );
    await expect(authService.revokeTokenById(1, 1)).resolves.not.toThrow();
    expect(refreshTokenService.revokeRefreshTokenById).toHaveBeenCalledTimes(1);
  });

  it('should update user twofa secret', async () => {
    await authService.setTwoFactorAuthenticationSecret('secret', 1);
    expect(userRepository.update).toHaveBeenCalledTimes(1);
  });

  it('should update user twofa enable status', async () => {
    const user = new UserEntity();
    user.id = 1;
    user.email = mockUser.email;
    user.username = mockUser.username;
    user.password = mockUser.password;
    await authService.turnOnTwoFactorAuthentication(user, true, 'qrcode');
    expect(userRepository.update).toHaveBeenCalledTimes(1);
    expect(userRepository.update).toHaveBeenCalledWith(1, {
      isTwoFAEnabled: true,
    });
  });

  it('should return users stats data', async () => {
    await authService.countByCondition({});
    expect(userRepository.countEntityByCondition).toHaveBeenCalledTimes(1);
  });
});
