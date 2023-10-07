import { Injectable } from '@nestjs/common';
import { GetApplicationResponse } from '../dto/response/get-application-response.dto';
import { GetEntityDetailsResponse } from '../dto/response/get-entity-details-response.dto';
import { LegalBuyerEntity } from '../models/legal-entity.entity';

@Injectable()
export class EntityMappingService {
  public mapEntityDetails(entity: LegalBuyerEntity): GetEntityDetailsResponse {
    var response = new GetEntityDetailsResponse();

    response.abbreviation = entity.abbreviation;
    response.beneficialOwner = entity.beneficialOwner;
    response.coreBusiness = entity.coreBusiness;
    response.headquarters = entity.headquarters;

    response.id = entity.id;
    response.incorporationDate = entity.incorporationDate;
    response.industryType = entity.industryType;

    response.legalForm = entity.legalForm;
    response.logo = entity.logo;
    response.name = entity.name;

    response.nationality = entity.nationality;

    // response.products = entity.legalProducts.map((entity) => {
    //   var entityItem = new GetProductResponse();

    //   entityItem.id = entity.id;
    //   entityItem.amount = entity.amount;
    //   entityItem.issuanceDate = entity.issuanceDate;
    //   entityItem.maturityDate = entity.maturityDate;
    //   entityItem.title = entity.title;

    //   return entityItem;
    // });

    response.applications = entity.legalApplications.map((application) => {
      var applicationItem = new GetApplicationResponse();

      applicationItem.id = application.id;
      applicationItem.issuanceDate = application.issuanceDate;
      applicationItem.title = application.title;

      return applicationItem;
    });

    return response;
  }
}
