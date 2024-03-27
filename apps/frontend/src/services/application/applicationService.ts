import apiUrls from "@config/apiUrls";
import { getAccessToken } from "@utils/helper";
import axios from "axios";
import { CreateApplication, CreateApplicationResponse } from "src/types";

export class ApplicationService {
  async getAllApplications(entityId: string) {
    const accessToken = await getAccessToken();
    try {
      const response = await axios.get(
        `${apiUrls.APPLICATION}/all-applications/${entityId}`,
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
        return data;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        console.log(error.message);
      }
    }
    throw new Error("Fetch Application by ID failed.");
  }
  /**
   * function to get an application by ID
   * @param id
   */

  async getApplication(id: string) {
    const accessToken = await getAccessToken();
    try {
      const response = await axios.get(`${apiUrls.APPLICATION}/${id}`, {
        headers: {
          method: "GET",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "json",
      });

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
    throw new Error("Fetch Application by ID failed.");
  }

  /**
   * Create Application Function
   * @param application
   */
  createApplication(
    application: CreateApplication
  ): Promise<CreateApplicationResponse> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();

      try {
        const response = await axios.post(apiUrls.APPLICATION, application, {
          headers: {
            method: "POST",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          responseType: "json",
        });
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

  /**
   * function to submit an application by ID
   * @param id
   */

  async submitApplication(id: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();

      try {
        const response = await axios.post(
          `${apiUrls.APPLICATION}/${id}/submit`,
          JSON.stringify({}),
          {
            headers: {
              method: "POST",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );

        if (response.status === 201) {
          resolve(true);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  async submitApplicationForCreditCard(
    id: string,
    entityName: string,
    entityId: string
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();

      try {
        const response = await axios.post(
          `${apiUrls.APPLICATION}/${id}/submit-for-credit-card`,
          JSON.stringify({
            entityName: entityName,
            entityId: entityId,
          }),
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

        if (response.status === 201) {
          resolve(data);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }

  async submitTransactionId(id: string, txId: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = await getAccessToken();
        const response = await axios.post(
          `${apiUrls.APPLICATION}/${id}/${txId}/submit-transaction`,
          JSON.stringify({}),
          {
            headers: {
              method: "POST",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );

        if (response.status === 201) {
          resolve(true);
        }
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  }
}

const applicationService = new ApplicationService();

export default applicationService;
