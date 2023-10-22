import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierInformationRequest } from './create-supplier-info.dto';

export class UpdateSupplierInformationRequest extends PartialType(
  CreateSupplierInformationRequest,
) {}
