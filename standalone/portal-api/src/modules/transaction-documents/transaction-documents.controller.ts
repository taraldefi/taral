import { FormDataRequest, MemoryStoredFile } from '@modules/multipart';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateFileDataDto } from '../files/dto/create-file-data.dto';
import { CreateFileResponse } from '../files/dto/create-file-response.dto';
import { TransactionDocumentService } from './services/transaction-documents.service';
import { triggerError } from '../files/utils/trigger.errror';

@ApiTags('TransactionDocs')
@Controller({
  path: 'transaction-docs',
  version: '1',
})
export class TransactionDocumentController {
  constructor(
    private readonly transactionDocumentService: TransactionDocumentService,
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
  @Post('create-doc')
  @FormDataRequest({ storage: MemoryStoredFile })
  async create(@Body() data: CreateFileDataDto): Promise<CreateFileResponse> {
    if (!data || !data.file) {
      throw triggerError('no-file');
    }

    const response =
      await this.transactionDocumentService.createConfirmationDocument(data);

    return response;
  }
}
