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
import { CreateCollateralDto } from './dto/request/create-collateral.dto';
import { UpdateCollateralDto } from './dto/request/update-collateral.dto';
import { GetCollateralResponse } from './dto/response/get-collateral-response.dto';
import { CollateralService } from './services/collateral.service';

@ApiTags('Collaterals')
@Controller({
  path: 'collateral',
  version: '1',
})
export class CollateralController {
  constructor(private readonly collateralService: CollateralService) {}
  @Post()
  async create(
    @Body() collateral: CreateCollateralDto,
  ): Promise<GetCollateralResponse> {
    return await this.collateralService.create(collateral);
  }

  @Get('/:id')
  async get(@Param('id') id: string) {
    return await this.collateralService.get(id);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() collateral: UpdateCollateralDto,
  ) {
    return await this.collateralService.update(id, collateral);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.collateralService.delete(id);
  }

  @Get()
  async getAll(): Promise<GetCollateralResponse[]> {
    return await this.collateralService.getAll();
  }
}
