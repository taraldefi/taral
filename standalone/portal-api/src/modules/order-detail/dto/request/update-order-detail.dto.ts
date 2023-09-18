import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDetailDto } from './create-order-detail.dto';

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {}
