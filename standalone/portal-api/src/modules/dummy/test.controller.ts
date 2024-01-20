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
import { TestDto } from './dto/Test.dto';

@UseGuards(JwtAuthGuard)
@Controller('test')
export class TestController {
    constructor(
    ) { }

    @Post('test')
    @HttpCode(200)
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
