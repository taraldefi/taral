import { Injectable } from '@nestjs/common';
import { GetRelationshipResponse } from '../dto/response/get-relationship-response.dto';
import { CollaborationRelationshipEntity } from '../models/collaboration.relationship.entity';
import { GetPaymentExperienceResponse } from '../dto/response/get-payment-experience-response.dto';
import { BaseService } from 'src/common/services/base.service';
import CoreLoggerService from 'src/common/logging/CoreLoggerService';

@Injectable()
export class EntityMappingService extends BaseService {
  constructor(public logger: CoreLoggerService) {
    super(logger);
  }

  public mapManyEntities(
    entities: CollaborationRelationshipEntity[],
  ): GetRelationshipResponse[] {
    var response = new Array<GetRelationshipResponse>();

    entities.forEach((entity) => {
      response.push(this.mapEntityDetails(entity));
    });

    return response;
  }

  public mapEntityDetails(
    entity: CollaborationRelationshipEntity,
  ): GetRelationshipResponse {
    var response = new GetRelationshipResponse();
    response.paymentExperience = new GetPaymentExperienceResponse();

    response.id = entity.id;

    response.paymentExperience.exists = true;
    if (entity.paymentExperience.description == null) {
      response.paymentExperience.exists = false;
    }

    response.paymentExperience.avgBusinessVol =
      entity.paymentExperience.avgBusinessVol;
    response.paymentExperience.delays = entity.paymentExperience.Delays;
    response.paymentExperience.description =
      entity.paymentExperience.description;
    response.paymentExperience.history = entity.paymentExperience.History;
    response.paymentExperience.length = entity.paymentExperience.length;
    response.paymentExperience.noOfDeals = entity.paymentExperience.noOfDeals;
    response.paymentExperience.currency = entity.paymentExperience.currency;

    return response;
  }
}
