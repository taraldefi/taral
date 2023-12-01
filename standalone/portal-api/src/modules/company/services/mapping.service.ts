import { Injectable } from '@nestjs/common';
import { GetApplicationResponse } from '../dto/response/get-application-response.dto';
import { GetEntityDetailsResponse } from '../dto/response/get-entity-details-response.dto';
import { BuyerCompanyEntity } from '../models/buyer.company.entity';
import { SupplierCompanyEntity } from '../models/supplier.company.entity';
import { GetSupplierEntityDetailsResponse } from '../dto/response/get-supplier-entity-response.dto';
import { GetSupplierCompanyAddressRequest } from 'src/modules/company-information/dto/response/supplier/get-supplier-company-address-response.dto';
import { GetSupplierCompanyTaxAndRevenueRequest } from 'src/modules/company-information/dto/response/supplier/get-supplier-company-tax-and-revenue.response.dto';

@Injectable()
export class EntityMappingService {
  public mapEntityDetails(
    entity: BuyerCompanyEntity,
  ): GetEntityDetailsResponse {
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

    if (entity.companyInformation) {
      response.employeeCount = entity.companyInformation.employeeCount;
      response.phoneNumber = entity.companyInformation.phoneNumber;
      response.registrationNumbers =
        entity.companyInformation.registrationNumbers;

      response.address.addressLine1 =
        entity.companyInformation.address.addressLine1;
      response.address.addressLine2 =
        entity.companyInformation.address.addressLine2;
      response.address.city = entity.companyInformation.address.city;
      response.address.postalCode =
        entity.companyInformation.address.postalCode;

      if (entity.companyInformation.taxAndRevenue[0].taxNumber) {
        response.taxAndRevenue.taxNumber =
          entity.companyInformation.taxAndRevenue[0].taxNumber;
      }
      if (entity.companyInformation.taxAndRevenue[0].audited) {
        response.taxAndRevenue.audited =
          entity.companyInformation.taxAndRevenue[0].audited;
      }
      if (entity.companyInformation.taxAndRevenue[0].exportRevenuePercentage) {
        response.taxAndRevenue.exportRevenuePercentage =
          entity.companyInformation.taxAndRevenue[0].exportRevenuePercentage;
      }
      if (entity.companyInformation.taxAndRevenue[0].exportValue) {
        response.taxAndRevenue.exportValue =
          entity.companyInformation.taxAndRevenue[0].exportValue;
      }
      if (entity.companyInformation.taxAndRevenue[0].lastFiscalYear) {
        response.taxAndRevenue.lastFiscalYear =
          entity.companyInformation.taxAndRevenue[0].lastFiscalYear;
      }
      if (entity.companyInformation.taxAndRevenue[0].totalRevenue) {
        response.taxAndRevenue.totalRevenue =
          entity.companyInformation.taxAndRevenue[0].totalRevenue;
      }
    }

    return response;
  }
}
