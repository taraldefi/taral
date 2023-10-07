import { Injectable } from '@nestjs/common';
import { BuyerEntity } from '../models/buyer.entity';
import { GetBuyerResponse } from '../dto/response/get-buyer-response.dto';

@Injectable()
export class EntityMappingService {
  public mapManyEntities(entities: BuyerEntity[]): GetBuyerResponse[] {
    var response = new Array<GetBuyerResponse>();

    entities.forEach((entity) => {
      response.push(this.mapEntityDetails(entity));
    });

    return response;
  }

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
