import apiUrls from "@config/apiUrls";
import getAxiosConfig from "@config/axiosConfig";
import { getBase64Src } from "@utils/lib/fetchEntityLogo";
import axios from "axios";
import {
  CreateApplication,
  CreateApplicationResponse,
  CreateBuyerInformationForBuyerApplication,
  EntityResponse,
  GetBuyerInfoResponse,
} from "src/types";
import { ApplicationService } from "./applicationService";

class BuyerApplicationService extends ApplicationService {
  /**
   * function to get an application by ID
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
        reject(new Error(error.response.data.message));
      }
    });
  }

  /**
   * Create Application Function
   * @param application
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
        reject(new Error(error.response.data.message));
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
        reject(new Error(error.response.data.message));
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
