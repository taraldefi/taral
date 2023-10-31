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
  // @Post()
  // async create(
  //   @Body() paymentTerm: CreatePaymentTermDto,
  // ): Promise<GetPaymentTermResponse> {
  //   return await this.paymentTermService.create(paymentTerm);
  // }

  @Get('/:id')
  async get(@Param('id') id: string) {
    return await this.paymentTermService.get(id);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() paymentTerm: UpdatePaymentTermDto,
  ): Promise<GetPaymentTermResponse> {
    return await this.paymentTermService.update(id, paymentTerm);
  }

  @Get('')
  async getAll(): Promise<GetPaymentTermResponse[]> {
    return await this.paymentTermService.getAll();
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.paymentTermService.delete(id);
  }
}
