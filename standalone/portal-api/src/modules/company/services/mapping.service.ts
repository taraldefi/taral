import { Injectable } from '@nestjs/common';
import { GetApplicationResponse } from '../dto/response/get-application-response.dto';
import { GetEntityDetailsResponse } from '../dto/response/get-entity-details-response.dto';
import { BuyerCompanyEntity } from '../models/buyer.company.entity';
import { SupplierCompanyEntity } from '../models/supplier.company.entity';
import { GetSupplierEntityDetailsResponse } from '../dto/response/get-supplier-entity-response.dto';
import { GetSupplierCompanyAddressRequest } from 'src/modules/company-information/dto/response/supplier/get-supplier-company-address-response.dto';
import { GetSupplierCompanyTaxAndRevenueRequest } from 'src/modules/company-information/dto/response/supplier/get-supplier-company-tax-and-revenue.response.dto';
import { SupplierCompanyTaxAndRevenueEntity } from '../models/supplier.company.tax.and.revenue.entity';
import { BuyerCompanyTaxAndRevenueEntity } from '../models/buyer.company.tax.and.revenue.entity';
import { GetBuyerCompanyTaxAndRevenueRequest } from 'src/modules/company-information/dto/response/buyer/get-buyer-company-tax-and-revenue.response.dto';
import { BaseService } from 'src/common/services/base.service';
import CoreLoggerService from 'src/common/logging/CoreLoggerService';

@Injectable()
export class EntityMappingService extends BaseService {

  constructor(public logger: CoreLoggerService) {
    super(logger);
  }

  public mapEntityDetails(
    entity: BuyerCompanyEntity,
    latestTaxAndRevenue: BuyerCompanyTaxAndRevenueEntity,
  ): GetEntityDetailsResponse {
    var response = new GetEntityDetailsResponse();
    response.taxAndRevenue = new GetBuyerCompanyTaxAndRevenueRequest();

    response.stripeId = entity.stripeId;
    response.email = entity.email;

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

    response.phoneNumber = entity.phoneNumber;
    response.registrationNumber = entity.registrationNumber;

    response.nationality = entity.nationality;

    response.taxAndRevenue.audited = latestTaxAndRevenue.audited;
    response.taxAndRevenue.exportRevenuePercentage =
      latestTaxAndRevenue.exportRevenuePercentage;
    response.taxAndRevenue.exportValue = latestTaxAndRevenue.exportValue;
    response.taxAndRevenue.lastFiscalYear = latestTaxAndRevenue.lastFiscalYear;
    response.taxAndRevenue.taxNumber = latestTaxAndRevenue.taxNumber;
    response.taxAndRevenue.totalRevenue = latestTaxAndRevenue.totalRevenue;

    // response.products = entity.legalProducts.map((entity) => {
    //   var entityItem = new GetProductResponse();

    //   entityItem.id = entity.id;
    //   entityItem.amount = entity.amount;
    //   entityItem.issuanceDate = entity.issuanceDate;
    //   entityItem.maturityDate = entity.maturityDate;
    //   entityItem.title = entity.title;

    //   return entityItem;
    // });

    response.applications = entity.applications.map((application) => {
      var applicationItem = new GetApplicationResponse();

      applicationItem.id = application.id;
      applicationItem.issuanceDate = application.issuanceDate;
      applicationItem.title = application.title;

      return applicationItem;
    });

    return response;
  }

  public mapSupplierEntityDetails(
    entity: SupplierCompanyEntity,
    latestTaxAndRevenue: SupplierCompanyTaxAndRevenueEntity,
  ): GetSupplierEntityDetailsResponse {
    var response = new GetSupplierEntityDetailsResponse();
    response.address = new GetSupplierCompanyAddressRequest();
    response.taxAndRevenue = new GetSupplierCompanyTaxAndRevenueRequest();

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

    response.phoneNumber = entity.phoneNumber;
    response.registrationNumber = entity.registrationNumber;

    if (entity.companyInformation) {
      response.employeeCount = entity.companyInformation.employeeCount;

      response.address.addressLine1 =
        entity.companyInformation.address.addressLine1;
      response.address.addressLine2 =
        entity.companyInformation.address.addressLine2;
      response.address.city = entity.companyInformation.address.city;
      response.address.postalCode =
        entity.companyInformation.address.postalCode;

      if (latestTaxAndRevenue.taxNumber) {
        response.taxAndRevenue.taxNumber = latestTaxAndRevenue.taxNumber;
      }
      if (latestTaxAndRevenue.audited) {
        response.taxAndRevenue.audited = latestTaxAndRevenue.audited;
      }
      if (latestTaxAndRevenue.exportRevenuePercentage) {
        response.taxAndRevenue.exportRevenuePercentage =
          latestTaxAndRevenue.exportRevenuePercentage;
      }
      if (latestTaxAndRevenue.exportValue) {
        response.taxAndRevenue.exportValue = latestTaxAndRevenue.exportValue;
      }
      if (latestTaxAndRevenue.lastFiscalYear) {
        response.taxAndRevenue.lastFiscalYear =
          latestTaxAndRevenue.lastFiscalYear;
      }
      if (latestTaxAndRevenue.totalRevenue) {
        response.taxAndRevenue.totalRevenue = latestTaxAndRevenue.totalRevenue;
      }
    }

    return response;
  }
}
