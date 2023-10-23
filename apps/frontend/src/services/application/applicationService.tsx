import apiUrls from "@config/apiUrls";
import getAxiosConfig from "@config/axiosConfig";
import { getBase64Src } from "@utils/lib/fetchEntityLogo";
import axios from "axios";
import {
  CreateApplication,
  CreateApplicationResponse,
  EntityResponse,
} from "src/types";

export class ApplicationService {
  /**
   * function to get an application by ID
   * @param id
   */

  async getApplication(id: string) {
    const axiosConfig = getAxiosConfig({ method: "GET" });
    try {
      const response = await axios.get(
        `${apiUrls.APPLICATION}/${id}`,
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
    throw new Error("Fetch Application by ID failed.");
  }

  /**
   * Create Application Function
   * @param application
   */
  async createApplication(
    application: CreateApplication
  ): Promise<CreateApplicationResponse> {
    const axiosConfig = getAxiosConfig({ method: "POST" });
    try {
      const response = await axios.post(
        apiUrls.APPLICATION,
        application,
        axiosConfig
      );
      const { data } = response;
      console.log(response);

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
    throw new Error("Creating application failed.");
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

const applicationService = new ApplicationService();

export default applicationService;
