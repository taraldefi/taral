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
import { FilesService } from './files.service';
import { FormDataRequest, MemoryStoredFile } from 'src/core/modules/multipart';
import { CreateFileDataDto } from './dto/create-file-data.dto';
import { CreateFileResponse } from './dto/create-file-response.dto';
import { UpdateFileDataDto } from './dto/update-file-data.dto';
import { UpdateFileResponse } from './dto/update-file-response.dto';
import { RequestFileDataDto } from './dto/request-file-data.dto';
import { createReadStream } from 'graceful-fs';

@ApiTags('Files')
@Controller({
  path: 'files',
  version: '1',
})
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

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
    const response = await this.filesService.createFile(fileData);
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
    const response = await this.filesService.updateFile(fileData);
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
    const fileVersion = await this.filesService.getLatestFileVersion(
      data.externalId,
    );

    const file = createReadStream(fileVersion.path);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileVersion.name}"`,
    });

    return new StreamableFile(file);
  }
}
