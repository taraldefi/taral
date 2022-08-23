import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Res,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesService } from './services/files.service';
import { FormDataRequest, MemoryStoredFile } from '@modules/multipart';
import { CreateFileDataDto } from './dto/create-file-data.dto';
import { CreateFileResponse } from './dto/create-file-response.dto';
import { UpdateFileDataDto } from './dto/update-file-data.dto';
import { UpdateFileResponse } from './dto/update-file-response.dto';
import { RequestFileDataDto } from './dto/request-file-data.dto';
import { AuthenticationService } from './services/onchain/authentication.service';
import { triggerError } from './utils/trigger.errror';

@ApiTags('Files')
@Controller({
  path: 'files',
  version: '1',
})
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('create-file')
  @FormDataRequest({ storage: MemoryStoredFile })
  async createFile(
    @Body() fileData: CreateFileDataDto,
  ): Promise<CreateFileResponse> {
    if (!fileData || !fileData.file) {
      throw triggerError('no-file');
    }

    const signatureResult = this.authenticationService.guard(
      fileData.signature,
      fileData.signedMessage,
    );

    const response = await this.filesService.createFile(
      fileData,
      signatureResult,
    );

    return response;
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        externalId: {
          type: 'number',
        },
      },
    },
  })
  @Post('update-file')
  @FormDataRequest({ storage: MemoryStoredFile })
  async updateFile(
    @Body() fileData: UpdateFileDataDto,
  ): Promise<UpdateFileResponse> {
    if (!fileData || !fileData.newFile) {
      throw triggerError('no-file');
    }

    const signatureResult = this.authenticationService.guard(
      fileData.signature,
      fileData.signedMessage,
    );

    const response = await this.filesService.updateFile(
      fileData,
      signatureResult,
    );
    return response;
  }

  @Post('request-file')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        externalId: {
          type: 'number',
        },
      },
    },
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async requestFile(
    @Res({ passthrough: true }) res,
    @Body() data: RequestFileDataDto,
  ): Promise<StreamableFile> {
    if (!data.id) {
      throw triggerError('missing-file-id');
    }

    const signatureResult = this.authenticationService.guard(
      data.signature,
      data.signedMessage,
    );

    const requestFileResult = await this.filesService.requestFile(
      data,
      signatureResult,
    );

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${requestFileResult.name}"`,
    });

    return requestFileResult.file;
  }
}
