import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentTermDto } from './create-payment-term.dto';

export class UpdatePaymentTermDto extends PartialType(CreatePaymentTermDto) {}
