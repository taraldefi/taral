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

  @Get('/:type/:id')
  async checkConfirmationDocument(
    @Param('type') documentType: string,
    @Param('id') applicationId: string,
  ): Promise<boolean> {
    const response =
      await this.transactionDocumentService.checkIfDocumentExists(
        applicationId,
        documentType,
      );

    return response;
  }

  @Post('/:type/:id')
  async markConfirmationDocument(
    @Param('type') documentType: string,
    @Param('id') applicationId: string,
  ): Promise<string> {
    const response =
      await this.transactionDocumentService.markDocumentAsUploaded(
        applicationId,
        documentType,
      );

    return response;
  }
}
