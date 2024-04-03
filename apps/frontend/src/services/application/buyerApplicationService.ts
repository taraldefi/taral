import apiUrls from "@config/apiUrls";
import axios from "axios";
import {
  CreateBuyerInformationForBuyerApplication,
  GetBuyerInfoResponse,
} from "src/types";
import {
  CreateProduct,
  GetOrderDetailsResponse,
  OrderDetails,
  Product,
} from "src/types/order_details";
import {
  CreateSupplierInformationForBuyerApplication,
  GetSupplierInfoResponse,
} from "src/types/supplier_info_for_buyer";
import { ApplicationService } from "./applicationService";
import {
  CreatePaymentTerm,
  GetPaymentTermResponse,
} from "src/types/payment_terms";
import {
  CreateCollateralInformation,
  GetCollateralResponse,
} from "src/types/collateral_info";
import { getAccessToken } from "@utils/helper";

class BuyerApplicationService extends ApplicationService {
  /**
   * function to get buyer information of an application by application ID
   * @param id
   */

  getBuyerInfo(applicationId: string): Promise<GetBuyerInfoResponse> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();
      try {
        const response = await axios.get(
          `${apiUrls.APPLICATION}/${applicationId}/buyer-info`,
          {
            headers: {
              method: "GET",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );

        const { data } = response;

        if (response.status === 200) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  /**
   * function to create buyer information of an application by application ID
   * @param applicationId
   * @param buyerInfo
   */
  createBuyerInfo(
    applicationId: string,
    buyerInfo: CreateBuyerInformationForBuyerApplication
  ): Promise<GetBuyerInfoResponse> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();
      try {
        const response = await axios.post(
          `${apiUrls.APPLICATION}/${applicationId}/buyer-info`,
          JSON.stringify(buyerInfo),
          {
            headers: {
              method: "POST",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );
        const { data } = response;
        console.log(response);

        if (response.status === 201) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  updateBuyerInfo(
    applicationId: string,
    buyerInfo: CreateBuyerInformationForBuyerApplication
  ): Promise<GetBuyerInfoResponse> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();
      try {
        const response = await axios.patch(
          `${apiUrls.APPLICATION}/${applicationId}/buyer-info`,
          JSON.stringify(buyerInfo),
          {
            headers: {
              method: "PATCH",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );
        const { data } = response;
        console.log(response);

        if (response.status === 200) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  getSupplierInfo(applicationId: string): Promise<GetSupplierInfoResponse> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();
      try {
        const response = await axios.get(
          `${apiUrls.APPLICATION}/${applicationId}/supplier-info`,
          {
            headers: {
              method: "GET",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );

        const { data } = response;

        if (response.status === 200) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  createSupplierInfo(
    applicationId: string,
    supplierInfo: CreateSupplierInformationForBuyerApplication
  ): Promise<GetSupplierInfoResponse> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();
      try {
        const response = await axios.post(
          `${apiUrls.APPLICATION}/${applicationId}/supplier-info`,
          JSON.stringify(supplierInfo),
          {
            headers: {
              method: "POST",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );
        const { data } = response;
        console.log(response);

        if (response.status === 201) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  updateSupplierInfo(
    applicationId: string,
    supplierInfo: CreateSupplierInformationForBuyerApplication
  ): Promise<GetSupplierInfoResponse> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();

      try {
        const response = await axios.patch(
          `${apiUrls.APPLICATION}/${applicationId}/supplier-info`,
          JSON.stringify(supplierInfo),
          {
            headers: {
              method: "PATCH",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );
        const { data } = response;
        console.log(response);

        if (response.status === 200) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  getOrderDetailInfo(applicationId: string): Promise<GetOrderDetailsResponse> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();
      try {
        const response = await axios.get(
          `${apiUrls.APPLICATION}/${applicationId}/order-details`,
          {
            headers: {
              method: "GET",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );

        const { data } = response;

        if (response.status === 200) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  createOrderInfo(
    applicationId: string,
    orderInfo: OrderDetails
  ): Promise<GetOrderDetailsResponse> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();
      try {
        const response = await axios.post(
          `${apiUrls.APPLICATION}/${applicationId}/order-details`,
          JSON.stringify(orderInfo),
          {
            headers: {
              method: "POST",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );
        const { data } = response;

        console.log(response);

        if (response.status === 201) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  updateOrderInfo(
    applicationId: string,
    orderInfo: OrderDetails
  ): Promise<GetOrderDetailsResponse> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();
      console.log("DEBUG ORDER", orderInfo, accessToken);

      try {
        const response = await axios.patch(
          `${apiUrls.APPLICATION}/${applicationId}/order-details`,
          JSON.stringify(orderInfo),

          {
            headers: {
              method: "PATCH",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );
        const { data } = response;

        console.log(response);

        if (response.status === 200) {
          console.log("DEBUG", response);
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  createProductInfo(
    applicationId: string,
    productInfo: CreateProduct
  ): Promise<Product> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();
      try {
        const response = await axios.post(
          `${apiUrls.APPLICATION}/${applicationId}/order-products`,
          JSON.stringify(productInfo),
          {
            headers: {
              method: "POST",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );
        const { data } = response;

        console.log(response);

        if (response.status === 201) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  updateProductInfo(
    applicationId: string,
    productId: string,
    productInfo: CreateProduct
  ): Promise<Product> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();
      try {
        const response = await axios.patch(
          `${apiUrls.APPLICATION}/${applicationId}/${productId}/order-products`,
          JSON.stringify(productInfo),
          {
            headers: {
              method: "PATCH",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );
        const { data } = response;

        console.log(response);

        if (response.status === 200) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  deleteProductInfo(applicationId: string, productId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();
      try {
        const response = await axios.delete(
          `${apiUrls.APPLICATION}/${applicationId}/${productId}/order-products`,

          {
            headers: {
              method: "DELETE",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );
        const { data } = response;

        console.log(response);

        if (response.status === 200) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  getPaymentTerms(applicationId: string): Promise<GetPaymentTermResponse> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();
      try {
        const response = await axios.get(
          `${apiUrls.APPLICATION}/${applicationId}/payment-terms`,
          {
            headers: {
              method: "GET",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );

        const { data } = response;

        if (response.status === 200) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  createPaymentTerms(
    applicationId: string,
    paymentTermInfo: CreatePaymentTerm
  ): Promise<GetPaymentTermResponse> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();

      try {
        const response = await axios.post(
          `${apiUrls.APPLICATION}/${applicationId}/payment-terms`,
          JSON.stringify(paymentTermInfo),
          {
            headers: {
              method: "POST",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );
        const { data } = response;
        console.log(response);

        if (response.status === 201) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  updatePaymentTerms(
    applicationId: string,
    paymentTermInfo: CreatePaymentTerm
  ): Promise<GetPaymentTermResponse> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();
      try {
        const response = await axios.patch(
          `${apiUrls.APPLICATION}/${applicationId}/payment-terms`,
          JSON.stringify(paymentTermInfo),
          {
            headers: {
              method: "PATCH",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );
        const { data } = response;
        console.log(response);

        if (response.status === 200) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  getCollateralInfo(applicationId: string): Promise<GetCollateralResponse> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();
      try {
        const response = await axios.get(
          `${apiUrls.APPLICATION}/${applicationId}/security`,
          {
            headers: {
              method: "GET",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );

        const { data } = response;

        if (response.status === 200) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  createCollateralInfo(
    applicationId: string,
    collateralInfo: CreateCollateralInformation
  ): Promise<GetCollateralResponse> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();
      try {
        const response = await axios.post(
          `${apiUrls.APPLICATION}/${applicationId}/security`,
          JSON.stringify(collateralInfo),
          {
            headers: {
              method: "POST",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );
        const { data } = response;
        console.log(response);

        if (response.status === 201) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  updateCollateralInfo(
    applicationId: string,
    collateralInfo: CreateCollateralInformation
  ): Promise<GetCollateralResponse> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();
      try {
        const response = await axios.patch(
          `${apiUrls.APPLICATION}/${applicationId}/security`,
          JSON.stringify(collateralInfo),
          {
            headers: {
              method: "PATCH",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );
        const { data } = response;
        console.log(response);

        if (response.status === 200) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }
}

const buyerApplicationService = new BuyerApplicationService();

export default buyerApplicationService;
