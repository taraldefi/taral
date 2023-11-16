import { Injectable } from '@nestjs/common';
import { CollateralMappingService } from 'src/modules/collateral/services/mapping.service';
import { PaymentTermMappingService } from 'src/modules/payment-term/services/mapping.service';
import { CollaborationRelationshipEntity } from 'src/modules/relationship/models/collaboration.relationship.entity';
import { EntityMappingService } from 'src/modules/relationship/services/mapping.service';
import { GetSupplierResponse } from 'src/modules/supplier/dto/response/get-supplier-response.dto';
import { SupplierCompanyEntity } from 'src/modules/company/models/supplier.company.entity';
import { SupplierInformationResponse } from '../../dto/response/get-supplier-information-response.dto';
import { GetBuyerCompanyAddressRequest } from 'src/modules/company-information/dto/response/get-buyer-company-address-response.dto';

@Injectable()
export class BuyerQuickApplicationMappingService {
  constructor(
    private readonly relationshipMappingService: EntityMappingService,
    private readonly collateralMappingService: CollateralMappingService,
    private readonly paymentTermMappingService: PaymentTermMappingService,
  ) {}

  public mapSupplierInformationForImporterApplication(
    entity: SupplierCompanyEntity,
    relationshipEntity: CollaborationRelationshipEntity,
  ): SupplierInformationResponse {
    var response = new SupplierInformationResponse();
    response.supplier = new GetSupplierResponse();
    response.supplier.address = new GetBuyerCompanyAddressRequest();

    response.id = entity.id;

    response.supplier.companyName = entity.name;
    response.supplier.dateEstablished = entity.incorporationDate;
    response.supplier.registrationNumbers =
      entity.companyInformation.registrationNumbers;
    response.supplier.phoneNumber = entity.companyInformation.phoneNumber;

    response.supplier.address.addressLine1 =
      entity.companyInformation.address.addressLine1;
    response.supplier.address.addressLine2 =
      entity.companyInformation.address.addressLine2;
    response.supplier.address.city = entity.companyInformation.address.city;
    response.supplier.address.postalCode =
      entity.companyInformation.address.postalCode;

    response.relationshipWithSupplier =
      this.relationshipMappingService.mapEntityDetails(relationshipEntity);

    return response;
  }
}
