import { ApiTags } from "@nestjs/swagger";
import { BuyerService } from "./services/buyer.service";
import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { GetBuyerResponse } from "./dto/response/get-buyer-response.dto";
import { CreateBuyerRequest } from "./dto/request/create-buyer.dto";
import { UpdateBuyerRequest } from "./dto/request/update-buyer.dto";

@ApiTags('Buyers')
@Controller({
  path: 'buyers',
  version: '1',
})
export class EntityController {
  constructor(private readonly buyerService: BuyerService) {

  }

  @Post()
  async createEntity(
    @Body() entity: CreateBuyerRequest,
  ): Promise<GetBuyerResponse> {
    return await this.buyerService.createEntity(entity);
  }

  @Post('/:id')
  async updateEntity(
    @Param('id') id: string,
    @Body() entity: UpdateBuyerRequest,
  ): Promise<GetBuyerResponse> {
    return await this.buyerService.updateEntity(id, entity);
  }

  @Patch('/:id')
  async patchEntity(
    @Param('id') id: string,
    @Body() entity: UpdateBuyerRequest,
  ): Promise<GetBuyerResponse> {
    return await this.buyerService.updateEntity(id, entity);
  }

  @Get('/:id')
  async getEntity(@Param('id') id: string): Promise<GetBuyerResponse> {
    return await this.buyerService.getEntity(id);
  }
}