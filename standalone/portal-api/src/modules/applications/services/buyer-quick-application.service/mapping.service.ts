import { Injectable } from '@nestjs/common';
import { SupplierEntity } from 'src/modules/supplier/models/supplier.entity';
import { SupplierInformationResponse } from '../../dto/response/get-supplier-information-response.dto';
import { EntityMappingService } from 'src/modules/relationship/services/mapping.service';
import { GetBuyerCompanyAddressRequest } from 'src/modules/buyer/dto/response/get-buyer-company-address-response.dto';
import { GetSupplierResponse } from 'src/modules/supplier/dto/response/get-supplier-response.dto';
import { CollaborationRelationshipEntity } from 'src/modules/relationship/models/collaboration.relationship.entity';

@Injectable()
export class BuyerQuickApplicationMappingService {
  constructor(
    private readonly relationshipMappingService: EntityMappingService,
  ) {}

  public mapSupplierInformationForImporterApplication(
    entity: SupplierEntity,
    relationshipEntity: CollaborationRelationshipEntity,
  ): SupplierInformationResponse {
    var response = new SupplierInformationResponse();
    response.supplier = new GetSupplierResponse();
    response.supplier.address = new GetBuyerCompanyAddressRequest();

    response.id = entity.id;

    response.supplier.companyName = entity.company.companyName;
    response.supplier.dateEstablished = entity.company.dateEstablished;
    response.supplier.registrationNumbers = entity.company.registrationNumbers;
    response.supplier.phoneNumber = entity.company.phoneNumber;

    response.supplier.address.addressLine1 =
      entity.company.address.addressLine1;
    response.supplier.address.addressLine2 =
      entity.company.address.addressLine2;
    response.supplier.address.city = entity.company.address.city;
    response.supplier.address.postalCode = entity.company.address.postalCode;

    response.relationshipWithSupplier =
      this.relationshipMappingService.mapEntityDetails(relationshipEntity);

    return response;
  }
}
