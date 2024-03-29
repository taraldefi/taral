import { Injectable } from '@nestjs/common';
import { BuyerCompanyEntity } from 'src/modules/company/models/buyer.company.entity';
import { EntityMappingService as RelationshipEntityMappingService } from 'src/modules/relationship/services/mapping.service';
import { GetBuyerResponse } from '../dto/response/buyer/get-buyer-response.dto';
import { GetBuyerCompanyAddressRequest } from '../dto/response/buyer/get-buyer-company-address-response.dto';
import { GetBuyerCompanyTaxAndRevenueRequest } from '../dto/response/buyer/get-buyer-company-tax-and-revenue.response.dto';
import { SupplierCompanyEntity } from 'src/modules/company/models/supplier.company.entity';
import { CollaborationRelationshipEntity } from 'src/modules/relationship/models/collaboration.relationship.entity';
import { SupplierInformationResponse } from '../dto/response/supplier/get-supplier-response.dto';
import { BuyerCompanyInformationEntity } from '../models/buyer.company.information.entity';
import { BuyerCompanyTaxAndRevenueEntity } from 'src/modules/company/models/buyer.company.tax.and.revenue.entity';
import { BaseService } from 'src/common/services/base.service';
import CoreLoggerService from 'src/common/logging/CoreLoggerService';

@Injectable()
export class EntityMappingService extends BaseService {
  constructor(
    public logger: CoreLoggerService,
    private readonly relationshipMappingService: RelationshipEntityMappingService,
  ) {
    super(logger);
  }

  public mapSupplierInformationForImporterApplication(
    supplier: SupplierCompanyEntity,
    relationshipEntity: CollaborationRelationshipEntity,
  ): SupplierInformationResponse {
    var response = new SupplierInformationResponse();

    response.supplierId = supplier.id;
    response.supplierName = supplier.name;

    response.relationshipWithSupplier =
      this.relationshipMappingService.mapEntityDetails(relationshipEntity);

    return response;
  }

  public mapEntityDetails(
    entity: BuyerCompanyEntity,
    buyerInfo: BuyerCompanyInformationEntity,
    latestTaxAndRevenue: BuyerCompanyTaxAndRevenueEntity,
  ): GetBuyerResponse {
    var response = new GetBuyerResponse();
    response.address = new GetBuyerCompanyAddressRequest();
    response.taxAndRevenue = new GetBuyerCompanyTaxAndRevenueRequest();

    console.log(
      'tax and revenue info',
      latestTaxAndRevenue,
      response.taxAndRevenue,
    );

    response.id = entity.id;
    response.companyName = entity.name;
    response.dateEstablished = entity.incorporationDate;

    response.phoneNumber = entity.phoneNumber;
    response.registrationNumber = entity.registrationNumber;

    response.taxAndRevenue.taxNumber = latestTaxAndRevenue.taxNumber;
    response.taxAndRevenue.audited = latestTaxAndRevenue.audited;
    response.taxAndRevenue.exportRevenuePercentage =
      latestTaxAndRevenue.exportRevenuePercentage;
    response.taxAndRevenue.exportValue = latestTaxAndRevenue.exportValue;
    response.taxAndRevenue.lastFiscalYear = latestTaxAndRevenue.lastFiscalYear;
    response.taxAndRevenue.totalRevenue = latestTaxAndRevenue.totalRevenue;

    if (entity.companyInformation && buyerInfo) {
      response.employeeCount = entity.companyInformation.employeeCount;
      response.address.addressLine1 = buyerInfo.address.addressLine1;
      response.address.addressLine2 = buyerInfo.address.addressLine2;
      response.address.city = buyerInfo.address.city;
      response.address.postalCode = buyerInfo.address.postalCode;
    }

    return response;
  }
}
