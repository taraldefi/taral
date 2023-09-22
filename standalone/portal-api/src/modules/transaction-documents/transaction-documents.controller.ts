import { FormDataRequest, MemoryStoredFile } from '@modules/multipart';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateTxDocDto } from './dto/request/create-transaction-document.dto';
import { CreateTxDocResponse } from './dto/response/create-transaction-document-response.dto';
import { TxDocService } from './services/transaction-documents.service';

@ApiTags('TransactionDocs')
@Controller({
  path: 'txDocs',
  version: '1',
})
export class TxDocController {
  constructor(private readonly txDocService: TxDocService) {}

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
  async createFile(@Body() data: CreateTxDocDto): Promise<CreateTxDocResponse> {
    //TODO: add validation
    // if (!fileData || !fileData.file) {
    //   throw triggerError('no-file');
    // }

    const response = await this.txDocService.createTxDoc(data);

    return response;
  }
}
