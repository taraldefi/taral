import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TransactionDocumentService } from './services/transaction-documents.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('TransactionDocs')
@Controller({
  path: 'transaction-docs',
  version: '1',
})
export class TransactionDocumentController {
  constructor(
    private readonly transactionDocumentService: TransactionDocumentService,
  ) {}

  @Get('/confirmation-document/:id')
  async checkConfirmationDocument(
    @Param(' applicationId') applicationId: string,
  ): Promise<boolean> {
    const response =
      await this.transactionDocumentService.checkIfConfirmationDocumentExists(
        applicationId,
      );

    return response;
  }

  @Get('/additional-document/:id')
  async checkAdditionalDocument(
    @Param(' applicationId') applicationId: string,
  ): Promise<boolean> {
    const response =
      await this.transactionDocumentService.checkIfAdditionalDocumentExists(
        applicationId,
      );

    return response;
  }

  @Post('/confirmation-document/:id')
  async markConfirmationDocument(
    @Param(' applicationId') applicationId: string,
  ): Promise<string> {
    const response =
      await this.transactionDocumentService.markConfirmationDocumentUploaded(
        applicationId,
      );

    return response;
  }

  @Post('/additional-document/:id')
  async markAdditionalDocument(
    @Param(' applicationId') applicationId: string,
  ): Promise<string> {
    const response =
      await this.transactionDocumentService.markAdditionalDocumentUploaded(
        applicationId,
      );

    return response;
  }
}
