import { FormDataRequest, MemoryStoredFile } from '@modules/multipart';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDocumentDto } from './dto/request/create-transaction-document.dto';
import { CreateTransactionDocumentResponse } from './dto/response/create-transaction-document-response.dto';
import { TransactionDocService } from './services/transaction-documents.service';

@ApiTags('TransactionDocs')
@Controller({
  path: 'txDocs',
  version: '1',
})
export class TransactionDocController {
  constructor(private readonly txDocService: TransactionDocService) {}

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
    @Body() data: CreateTransactionDocumentDto,
  ): Promise<CreateTransactionDocumentResponse> {
    //TODO: add validation
    // if (!fileData || !fileData.file) {
    //   throw triggerError('no-file');
    // }

    const response = await this.txDocService.createTransactionDoc(data);

    return response;
  }
}
