import { Injectable } from '@nestjs/common';
import { SupplierEntity } from '../models/supplier.entity';
import { GetSupplierResponse } from '../dto/response/get-supplier-response.dto';
import { GetSupplierCompanyAddressRequest } from '../dto/response/get-supplier-company-address-response.dto';
import { GetSupplierCompanyTaxAndRevenueRequest } from '../dto/response/get-supplier-company-tax-and-revenue.response.dto';

@Injectable()
export class EntityMappingService {
  public mapManyEntities(entities: SupplierEntity[]): GetSupplierResponse[] {
    var response = new Array<GetSupplierResponse>();

    entities.forEach((entity) => {
      response.push(this.mapEntityDetails(entity));
    });

    return response;
  }

  public mapEntityDetails(entity: SupplierEntity): GetSupplierResponse {
    var response = new GetSupplierResponse();
    response.address = new GetSupplierCompanyAddressRequest();
    response.taxAndRevenue = new GetSupplierCompanyTaxAndRevenueRequest();

    response.id = entity.id;
    response.companyName = entity.company.companyName;
    response.dateEstablished = entity.company.dateEstablished;
    response.employeeCount = entity.company.employeeCount;
    response.phoneNumber = entity.company.phoneNumber;
    response.registrationNumbers = entity.company.registrationNumbers;

    response.address.addressLine1 = entity.company.address.addressLine1;
    response.address.addressLine2 = entity.company.address.addressLine2;
    response.address.city = entity.company.address.city;
    response.address.postalCode = entity.company.address.postalCode;

    if (entity.company.taxAndRevenue) {
      if (entity.company.taxAndRevenue.taxNumber) {
        response.taxAndRevenue.taxNumber =
          entity.company.taxAndRevenue.taxNumber;
      }
      if (entity.company.taxAndRevenue.audited) {
        response.taxAndRevenue.audited = entity.company.taxAndRevenue.audited;
      }
      if (entity.company.taxAndRevenue.exportRevenuePercentage) {
        response.taxAndRevenue.exportRevenuePercentage =
          entity.company.taxAndRevenue.exportRevenuePercentage;
      }
      if (entity.company.taxAndRevenue.exportValue) {
        response.taxAndRevenue.exportValue =
          entity.company.taxAndRevenue.exportValue;
      }
      if (entity.company.taxAndRevenue.lastFiscalYear) {
        response.taxAndRevenue.lastFiscalYear =
          entity.company.taxAndRevenue.lastFiscalYear;
      }
      if (entity.company.taxAndRevenue.totalRevenue) {
        response.taxAndRevenue.totalRevenue =
          entity.company.taxAndRevenue.totalRevenue;
      }
    }
    return response;
  }
}
