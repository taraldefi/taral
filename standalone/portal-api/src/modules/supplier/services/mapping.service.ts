import { Injectable } from '@nestjs/common';
import { SupplierEntity } from '../models/supplier.entity';
import { GetSupplierResponse } from '../dto/response/get-supplier-response.dto';

@Injectable()
export class EntityMappingService {

  public mapManyEntities(entities: SupplierEntity[]): GetSupplierResponse[] {
    var response = new Array<GetSupplierResponse>();

    entities.forEach(entity => {
      response.push(this.mapEntityDetails(entity));
    });

    return response;
  }

  public mapEntityDetails(entity: SupplierEntity): GetSupplierResponse {
    var response = new GetSupplierResponse();

    response.id = entity.id;
    response.companyName = entity.company.companyName;
    response.dateEstablished = entity.company.dateEstablished;
    response.employeeCount = entity.company.employeeCount;
    response.registrationNumbers = entity.company.registrationNumbers;
    
    return response;
  }
}
