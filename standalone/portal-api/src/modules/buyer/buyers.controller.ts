import { ApiTags } from "@nestjs/swagger";
import { BuyerService } from "./services/buyer.service";
import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { GetBuyerResponse } from "./dto/response/get-buyer-response.dto";
import { CreateBuyerRequest } from "./dto/request/create-buyer.dto";
import { UpdateBuyerRequest } from "./dto/request/update-buyer.dto";
import { EntityMappingService } from "./services/mapping.service";

@ApiTags('Buyers')
@Controller({
  path: 'buyers',
  version: '1',
})
export class BuyersEntityController {
  constructor(private readonly buyerService: BuyerService, private readonly mappingService: EntityMappingService) {

  }

  @Post()
  async createEntity(
    @Body() entity: CreateBuyerRequest,
  ): Promise<GetBuyerResponse> {
    const createdEntity = await this.buyerService.createEntity(entity);

    return this.mappingService.mapEntityDetails(createdEntity);
  }

  @Put('/:id')
  async updateEntity(
    @Param('id') id: string,
    @Body() entity: UpdateBuyerRequest,
  ): Promise<GetBuyerResponse> {
    const updatedEntity = await this.buyerService.updateEntity(id, entity);

    return this.mappingService.mapEntityDetails(updatedEntity);
  }

  @Patch('/:id')
  async patchEntity(
    @Param('id') id: string,
    @Body() entity: UpdateBuyerRequest,
  ): Promise<GetBuyerResponse> {
    const updatedEntity = await this.buyerService.updateEntity(id, entity);

    return this.mappingService.mapEntityDetails(updatedEntity);
  }

  @Get('/:id')
  async getEntity(@Param('id') id: string): Promise<GetBuyerResponse> {
    const entity = await this.buyerService.getEntity(id);

    return this.mappingService.mapEntityDetails(entity);
  }

  @Get()
  async getAll(): Promise<GetBuyerResponse[]> {
    return await this.buyerService.getAll();
  }
}