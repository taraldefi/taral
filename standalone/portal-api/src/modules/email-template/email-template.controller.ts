import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EmailTemplateService } from 'src/modules/email-template/email-template.service';
import { CreateEmailTemplateDto } from 'src/modules/email-template/dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from 'src/modules/email-template/dto/update-email-template.dto';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import { Pagination } from 'src/modules/paginate';
import { EmailTemplate } from 'src/modules/email-template/serializer/email-template.serializer';
import { EmailTemplatesSearchFilterDto } from 'src/modules/email-template/dto/email-templates-search-filter.dto';
import JwtTwoFactorGuard from 'src/common/guard/jwt-two-factor.guard';

@ApiTags('email-templates')
@UseGuards(JwtTwoFactorGuard, PermissionGuard)
@Controller('email-templates')
export class EmailTemplateController {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Post()
  create(
    @Body()
    createEmailTemplateDto: CreateEmailTemplateDto
  ): Promise<EmailTemplate> {
    return this.emailTemplateService.create(createEmailTemplateDto);
  }

  @Get()
  findAll(
    @Query()
    filter: EmailTemplatesSearchFilterDto
  ): Promise<Pagination<EmailTemplate>> {
    return this.emailTemplateService.findAll(filter);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ): Promise<EmailTemplate> {
    return this.emailTemplateService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    updateEmailTemplateDto: UpdateEmailTemplateDto
  ): Promise<EmailTemplate> {
    return this.emailTemplateService.update(+id, updateEmailTemplateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id')
    id: string
  ): Promise<void> {
    return this.emailTemplateService.remove(+id);
  }
}
