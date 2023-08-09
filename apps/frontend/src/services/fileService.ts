import apiUrls from "@config/apiUrls";
import getAxiosConfig from "@config/axiosConfig";
import axios from "axios";
import { IfileResponse } from "src/types";

class FileService {
  /**
   * Function to create a file
   * @param File object
   */
  async createFile(file: File): Promise<IfileResponse[]> {
    const axiosConfig = getAxiosConfig("POST", "multipart/ form-data");
    try {
      const response = await axios.post(
        `${apiUrls.CREATE_FILE}`,
        { file: file },
        axiosConfig
      );
      const { data } = response;

      if (response.statusCode === 201) {
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
    const axiosConfig = getAxiosConfig("POST", "multipart/ form-data");
    try {
      const response = await axios.post(
        `${apiUrls.UPDATE_FILE}`,
        { file: file, externalId: externalId },
        axiosConfig
      );
      const { data } = response;

      if (response.statusCode === 201) {
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
    const axiosConfig = getAxiosConfig("POST");
    try {
      const response = await axios.post(
        `${apiUrls.REQUEST_FILE}`,
        { externalId: externalId },
        axiosConfig
      );
      const { data } = response;

      if (response.statusCode === 201) {
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
}

const fileService = new FileService();

export default fileService;
