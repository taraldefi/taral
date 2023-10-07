import { Injectable } from '@nestjs/common';
import { GetOrderDetailsResponse } from '../dto/response/get-order-detail-response.dto';
import { OrderDetailEntity } from '../models/order-detail.entity';
import { GetOrderProductResponse } from '../dto/response/get-order-product-response.dto';
import { OrderProductEntity } from '../models/order-product.entity';

@Injectable()
export class OrderDetailMappingService {
  public mapOrderDetails(order: OrderDetailEntity): GetOrderDetailsResponse {
    var response = new GetOrderDetailsResponse();

    response.id = order.id;
    response.importPort = order.importPort;
    response.exportPort = order.exportPort;
    response.applicationId = order.application.id;

    response.products = order.products.map((product) => {
      var productItem = new GetOrderProductResponse();

      productItem.id = product.id;
      productItem.name = product.name;
      productItem.quantity = product.quantity;
      productItem.unitPrice = product.unitPrice;

      return productItem;
    });

    return response;
  }
  public mapOrderProductDetails(
    product: OrderProductEntity,
  ): GetOrderProductResponse {
    var response = new GetOrderProductResponse();

    response.id = product.id;
    response.name = product.name;
    response.quantity = product.quantity;
    response.unitPrice = product.unitPrice;

    return response;
  }
}
