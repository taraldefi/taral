import { Injectable } from '@nestjs/common';
import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';
import { EntityMappingService as RelationshipEntityMappingService } from 'src/modules/relationship/services/mapping.service';
import { GetBuyerResponse } from '../dto/response/buyer/get-buyer-response.dto';
import { GetBuyerCompanyAddressRequest } from '../dto/response/buyer/get-buyer-company-address-response.dto';
import { GetBuyerCompanyTaxAndRevenueRequest } from '../dto/response/buyer/get-buyer-company-tax-and-revenue.response.dto';
import { SupplierCompanyEntity } from 'src/modules/company/models/supplier.company.entity';
import { CollaborationRelationshipEntity } from 'src/modules/relationship/models/collaboration.relationship.entity';
import { SupplierInformationResponse } from '../dto/response/supplier/get-supplier-response.dto';
import { GetSupplierCompanyAddressRequest } from '../dto/response/supplier/get-supplier-company-address-response.dto';
import { BuyerCompanyInformationEntity } from '../models/buyer.company.information.entity';
import { CompanyTaxAndRevenueEntity } from '../models/company.information.tax.and.revenue.entity';

@Injectable()
export class EntityMappingService {
  constructor(
    private readonly relationshipMappingService: RelationshipEntityMappingService,
  ) {}

  public mapSupplierInformationForImporterApplication(
    supplierId: string,
    relationshipEntity: CollaborationRelationshipEntity,
  ): SupplierInformationResponse {
    var response = new SupplierInformationResponse();

    response.supplierId = supplierId;

    response.relationshipWithSupplier =
      this.relationshipMappingService.mapEntityDetails(relationshipEntity);

    return response;
  }

  public mapEntityDetails(
    entity: BuyerCompanyEntity,
    buyerInfo: BuyerCompanyInformationEntity,
    latestTaxAndRevenue: CompanyTaxAndRevenueEntity,
  ): GetBuyerResponse {
    var response = new GetBuyerResponse();
    response.address = new GetBuyerCompanyAddressRequest();
    response.taxAndRevenue = new GetBuyerCompanyTaxAndRevenueRequest();

    response.id = entity.id;
    response.companyName = entity.name;
    response.dateEstablished = entity.incorporationDate;

    if (entity.companyInformation && buyerInfo) {
      response.employeeCount = entity.companyInformation.employeeCount;
      response.phoneNumber = entity.companyInformation.phoneNumber;
      response.registrationNumbers =
        entity.companyInformation.registrationNumbers;

      response.address.addressLine1 = buyerInfo.address.addressLine1;
      response.address.addressLine2 = buyerInfo.address.addressLine2;
      response.address.city = buyerInfo.address.city;
      response.address.postalCode = buyerInfo.address.postalCode;

      if (latestTaxAndRevenue) {
        response.taxAndRevenue.taxNumber = latestTaxAndRevenue.taxNumber;
        response.taxAndRevenue.audited = latestTaxAndRevenue.audited;
        response.taxAndRevenue.exportRevenuePercentage =
          latestTaxAndRevenue.exportRevenuePercentage;
        response.taxAndRevenue.exportValue = latestTaxAndRevenue.exportValue;
        response.taxAndRevenue.lastFiscalYear =
          latestTaxAndRevenue.lastFiscalYear;
        response.taxAndRevenue.totalRevenue = latestTaxAndRevenue.totalRevenue;
      }
    }

    return response;
  }
}
