import { PartialType } from '@nestjs/mapped-types';
import { CreateCollateralDto } from './create-collateral.dto';

export class UpdateCollateralDto extends PartialType(CreateCollateralDto) {}
