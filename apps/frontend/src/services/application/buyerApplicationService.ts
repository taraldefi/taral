import apiUrls from "@config/apiUrls";
import getAxiosConfig from "@config/axiosConfig";
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
} from "@types/payment_terms_types";

class BuyerApplicationService extends ApplicationService {
  /**
   * function to get buyer information of an application by application ID
   * @param id
   */

  getBuyerInfo(applicationId: string): Promise<GetBuyerInfoResponse> {
    return new Promise(async (resolve, reject) => {
      const axiosConfig = getAxiosConfig({ method: "GET" });
      try {
        const response = await axios.get(
          `${apiUrls.APPLICATION}/${applicationId}/buyer-info`,
          axiosConfig
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
      const axiosConfig = getAxiosConfig({ method: "POST" });
      try {
        const response = await axios.post(
          `${apiUrls.APPLICATION}/${applicationId}/buyer-info`,
          JSON.stringify(buyerInfo),
          axiosConfig
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
      const axiosConfig = getAxiosConfig({ method: "PATCH" });
      try {
        const response = await axios.patch(
          `${apiUrls.APPLICATION}/${applicationId}/buyer-info`,
          JSON.stringify(buyerInfo),
          axiosConfig
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
      const axiosConfig = getAxiosConfig({ method: "GET" });
      try {
        const response = await axios.get(
          `${apiUrls.APPLICATION}/${applicationId}/supplier-info`,
          axiosConfig
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
      const axiosConfig = getAxiosConfig({ method: "POST" });
      try {
        const response = await axios.post(
          `${apiUrls.APPLICATION}/${applicationId}/supplier-info`,
          JSON.stringify(supplierInfo),
          axiosConfig
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
      const axiosConfig = getAxiosConfig({ method: "PATCH" });
      try {
        const response = await axios.patch(
          `${apiUrls.APPLICATION}/${applicationId}/supplier-info`,
          JSON.stringify(supplierInfo),
          axiosConfig
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
      const axiosConfig = getAxiosConfig({ method: "GET" });
      try {
        const response = await axios.get(
          `${apiUrls.APPLICATION}/${applicationId}/order-details`,
          axiosConfig
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
      const axiosConfig = getAxiosConfig({ method: "POST" });
      try {
        const response = await axios.post(
          `${apiUrls.APPLICATION}/${applicationId}/order-details`,
          JSON.stringify(orderInfo),
          axiosConfig
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
      const axiosConfig = getAxiosConfig({ method: "PATCH" });
      try {
        const response = await axios.patch(
          `${apiUrls.APPLICATION}/${applicationId}/order-details`,
          JSON.stringify(orderInfo),
          axiosConfig
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
      const axiosConfig = getAxiosConfig({ method: "POST" });
      try {
        const response = await axios.post(
          `${apiUrls.APPLICATION}/${applicationId}/order-products`,
          JSON.stringify(productInfo),
          axiosConfig
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
      const axiosConfig = getAxiosConfig({ method: "PATCH" });
      try {
        const response = await axios.patch(
          `${apiUrls.APPLICATION}/${applicationId}/${productId}/order-products`,
          JSON.stringify(productInfo),
          axiosConfig
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
      const axiosConfig = getAxiosConfig({ method: "DELETE" });
      try {
        const response = await axios.delete(
          `${apiUrls.APPLICATION}/${applicationId}/${productId}/order-products`,

          axiosConfig
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
      const axiosConfig = getAxiosConfig({ method: "GET" });
      try {
        const response = await axios.get(
          `${apiUrls.APPLICATION}/${applicationId}/payment-terms`,
          axiosConfig
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
  ): Promise<GetSupplierInfoResponse> {
    return new Promise(async (resolve, reject) => {
      const axiosConfig = getAxiosConfig({ method: "POST" });
      try {
        const response = await axios.post(
          `${apiUrls.APPLICATION}/${applicationId}/payment-terms`,
          JSON.stringify(paymentTermInfo),
          axiosConfig
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
  ): Promise<GetSupplierInfoResponse> {
    return new Promise(async (resolve, reject) => {
      const axiosConfig = getAxiosConfig({ method: "PATCH" });
      try {
        const response = await axios.patch(
          `${apiUrls.APPLICATION}/${applicationId}/payment-terms`,
          JSON.stringify(paymentTermInfo),
          axiosConfig
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

  /**
   * function to submit an application by ID
   * @param id
   */

  async submitApplication(id: string) {
    const axiosConfig = getAxiosConfig({ method: "POST" });
    try {
      const response = await axios.get(
        `${apiUrls.APPLICATION}/${id}/submit`,
        axiosConfig
      );

      const { data } = response;

      if (response.status === 200) {
        return data;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        console.log(error.message);
      }
    }
    throw new Error("Submitting Application failed.");
  }
}

const buyerApplicationService = new BuyerApplicationService();

export default buyerApplicationService;
