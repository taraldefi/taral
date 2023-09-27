import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePaymentTermDto } from './dto/request/create-payment-term.dto';
import { GetPaymentTermResponse } from './dto/response/get-payment-term.response.dto';
import { PaymentTermService } from './services/payment-term.service';
import { UpdatePaymentTermDto } from './dto/request/update-payment-term.dto';

@ApiTags('PaymentTerms')
@Controller({
  path: 'payment-term',
  version: '1',
})
export class PaymentTermController {
  constructor(private readonly paymentTermService: PaymentTermService) {}
  @Post()
  async createPaymentTerm(
    @Body() paymentTerm: CreatePaymentTermDto,
  ): Promise<GetPaymentTermResponse> {
    return await this.paymentTermService.createPaymentTerm(paymentTerm);
  }

  @Get('/:id')
  async getPaymentTerm(@Param('id') id: string) {
    return await this.paymentTermService.getPaymentTerm(id);
  }

  @Patch('/:id')
  async updatePaymentTerm(
    @Param('id') id: string,
    @Body() paymentTerm: UpdatePaymentTermDto,
  ): Promise<GetPaymentTermResponse> {
    return await this.paymentTermService.updatePaymentTerm(id, paymentTerm);
  }

  @Get('')
  async getAllPaymentTerms(): Promise<GetPaymentTermResponse[]> {
    return await this.paymentTermService.getAllPaymentTerms();
  }

  @Delete('/:id')
  async deletePaymentTerm(@Param('id') id: string): Promise<void> {
    return await this.paymentTermService.deletePaymentTerm(id);
  }
}
