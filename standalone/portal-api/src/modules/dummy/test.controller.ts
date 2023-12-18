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
import { PermissionGuard } from 'src/common/guard/permission.guard';
import { TestDto } from './dto/Test.dto';

@Controller('test')
export class TestController {
    constructor(
    ) { }

    @Post('test')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async authenticate(
        @GetUser() user: UserEntity,
        @Body()
        payload: TestDto,
    ): Promise<TestDto> {
        const response = new TestDto();
        response.message = `Hello ${user.email}: ${payload.message}!`;
        return response;
    }
}
