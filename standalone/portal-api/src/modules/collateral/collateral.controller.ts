import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCollateralDto } from './dto/request/create-collateral.dto';
import { GetCollateralDto } from './dto/response/get-collateral.dto';
import { CollateralService } from './services/collateral.service';

@ApiTags('Collaterals')
@Controller({
  path: 'collaterals',
  version: '1',
})
export class CollateralController {
  constructor(private readonly collateralService: CollateralService) {}
  @Post()
  async createCollateral(
    @Body() collateral: CreateCollateralDto,
  ): Promise<GetCollateralDto> {
    return await this.collateralService.createCollateral(collateral);
  }

  @Get('/:id')
  async getCollateral(@Param('id') id) {
    return await this.collateralService.getCollateral(id);
  }

  @Get()
  async getAllCollaterals(): Promise<GetCollateralDto[]> {
    return await this.collateralService.getAllCollaterals();
  }
}
