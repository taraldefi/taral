import apiUrls from "@config/apiUrls";

import { getAccessToken } from "@utils/helper";
import axios from "axios";
import { IfileResponse } from "src/types";

class FileService {
  /**
   * Function to create a file
   * @param File object
   */
  async createFile(formData: FormData): Promise<IfileResponse[]> {
    const accessToken = await getAccessToken();
    try {
      const response = await axios.post(`${apiUrls.CREATE_FILE}`, formData, {
        headers: {
          method: "POST",
          contentType: "multipart/ form-data",
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "json",
      });
      const { data } = response;

      if (response.status === 201) {
        return data;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        console.log(error.message);
      }
    }
    throw new Error("Failed to create File.");
  }
  /**
   * Function to update a file
   * @param file
   * @param externalId
   * @returns
   */
  async updateFile(file: File, externalId: number): Promise<IfileResponse> {
    const accessToken = await getAccessToken();
    try {
      const response = await axios.post(
        `${apiUrls.UPDATE_FILE}`,
        { file: file, externalId: externalId },
        {
          headers: {
            method: "POST",
            contentType: "multipart/ form-data",
            Authorization: `Bearer ${accessToken}`,
          },
          responseType: "json",
        }
      );
      const { data } = response;

      if (response.status === 201) {
        return data;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        console.log(error.message);
      }
    }
    throw new Error("Failed to update File.");
  }
  /**
   * Function to request a file resource by ID
   * @param externalId
   * @returns
   */
  async requestFile(externalId: number): Promise<IfileResponse> {
    const accessToken = await getAccessToken();

    try {
      const response = await axios.post(
        `${apiUrls.REQUEST_FILE}`,
        { externalId: externalId },
        {
          headers: {
            method: "POST",
            contentType: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          responseType: "json",
        }
      );
      const { data } = response;

      if (response.status === 201) {
        return data;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        console.log(error.message);
      }
    }
    throw new Error("Failed to request File.");
  }

  async markTransactionDocument(
    type: string,
    applicationId: string
  ): Promise<void> {
    const accessToken = await getAccessToken();

    try {
      const response = await axios.post(
        `${apiUrls.TRANSACTION_DOCUMENTS}/${type}/${applicationId}`,
        JSON.stringify({}),
        {
          headers: {
            method: "POST",
            contentType: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          responseType: "json",
        }
      );
      const { data } = response;

      if (response.status === 201) {
        return data;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        console.log(error.message);
      }
    }
    throw new Error("Failed to mark transaction document.");
  }

  async getTransactionDocument(
    type: string,
    applicationId: string
  ): Promise<void> {
    const accessToken = await getAccessToken();

    try {
      console.log("getTransactionDocument", type, applicationId);
      const response = await axios.get(
        `${apiUrls.TRANSACTION_DOCUMENTS}/${type}/${applicationId}`,
        {
          headers: {
            method: "GET",
            contentType: "application/json",
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
    throw new Error("Failed to fetch transaction documents status.");
  }
}

const fileService = new FileService();

export default fileService;
