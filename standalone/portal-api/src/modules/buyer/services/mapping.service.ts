import { Injectable } from '@nestjs/common';
import { BuyerEntity } from '../models/buyer.entity';
import { GetBuyerResponse } from '../dto/get-buyer-response.dto';

@Injectable()
export class EntityMappingService {
  public mapEntityDetails(entity: BuyerEntity): GetBuyerResponse {
    var response = new GetBuyerResponse();

    response.id = entity.id;
    response.companyName = entity.company.companyName;
    response.dateEstablished = entity.company.dateEstablished;
    response.employeeCount = entity.company.employeeCount;
    response.registrationNumbers = entity.company.registrationNumbers;
    
    return response;
  }
}
