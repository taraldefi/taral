import { ApiTags } from "@nestjs/swagger";
import { BuyerService } from "./services/buyer.service";
import { Body, Controller, Post } from "@nestjs/common";
import { GetBuyerResponse } from "./dto/response/get-buyer-response.dto";
import { CreateBuyerRequest } from "./dto/request/create-buyer-request.dto";

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

  
}