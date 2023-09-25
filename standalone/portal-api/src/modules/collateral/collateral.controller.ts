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
import { GetCollateralResponse } from './dto/response/get-collateral-response.dto';
import { CollateralService } from './services/collateral.service';
import { UpdateCollateralDto } from './dto/request/update-collateral.dto';

@ApiTags('Collaterals')
@Controller({
  path: 'collateral',
  version: '1',
})
export class CollateralController {
  constructor(private readonly collateralService: CollateralService) {}
  @Post()
  async createCollateral(
    @Body() collateral: CreateCollateralDto,
  ): Promise<GetCollateralResponse> {
    return await this.collateralService.createCollateral(collateral);
  }

  @Get('/:id')
  async getCollateral(@Param('id') id: string) {
    return await this.collateralService.getCollateral(id);
  }

  @Patch('/:id')
  async updateCollateral(
    @Param('id') id: string,
    @Body() collateral: UpdateCollateralDto,
  ) {
    return await this.collateralService.updateCollateral(id, collateral);
  }

  @Delete('/:id')
  async deleteCollateral(@Param('id') id: string) {
    return await this.collateralService.deleteCollateral(id);
  }

  @Get()
  async getAllCollaterals(): Promise<GetCollateralResponse[]> {
    return await this.collateralService.getAllCollaterals();
  }
}
