import apiUrls from "@config/apiUrls";
import getAxiosConfig from "@config/axiosConfig";
import axios from "axios";
import { IcreateEmailTemplate, IemailTemplate } from "src/types";

class EmailService {
  /**
   * function to get all email templates
   * @param keywords
   * @param limit
   * @param page
   * @returns
   */
  async getAllEmailTemplates(
    keywords: string,
    limit: number,
    page: number
  ): Promise<any> {
    const axiosConfig = getAxiosConfig({ method: "GET" });
    try {
      const response = await axios.get(
        `${apiUrls.EMAIL_TEMPLATE}?keywords=${keywords}&limit=${limit}&page=${page}`,
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
    throw new Error("Failed to fetch email templates.");
  }

  /**
   * get email template by id
   * @param id
   * @returns
   */
  async getEmailTemplateById(id: string): Promise<IemailTemplate> {
    const axiosConfig = getAxiosConfig({ method: "GET" });
    try {
      const response = await axios.get(
        `${apiUrls.EMAIL_TEMPLATE}/${id}`,
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
    throw new Error("Failed to Fetch Email template by ID.");
  }

  /**
   * create an Email template
   * @param templateInfo
   * @returns
   */

  async createEmailTemplate(
    templateInfo: IcreateEmailTemplate
  ): Promise<IemailTemplate> {
    const axiosConfig = getAxiosConfig({ method: "POST" });
    try {
      const response = await axios.post(
        apiUrls.EMAIL_TEMPLATE,
        JSON.stringify(templateInfo),
        axiosConfig
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
    throw new Error("Failed to create Email template.");
  }

  /**
   * delete Email Template
   * @param id
   * @returns
   */
  async deleteEmailTemplate(id: string): Promise<void> {
    const axiosConfig = getAxiosConfig({ method: "DELETE" });
    try {
      const response = await axios.delete(
        `${apiUrls.EMAIL_TEMPLATE}/${id}`,
        axiosConfig
      );

      if (response.status === 204) {
        return;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        console.log(error.message);
      }
    }
    throw new Error("Failed to delete Email template.");
  }
  /**
   * function to update an email template
   * @param id
   * @param templateInfo
   */
  async updateEmailTemplate(
    id: string,
    templateInfo: IcreateEmailTemplate
  ): Promise<IemailTemplate> {
    const axiosConfig = getAxiosConfig({ method: "PATCH" });
    try {
      const response = await axios.patch(
        `${apiUrls.EMAIL_TEMPLATE}/${id}`,
        JSON.stringify(templateInfo),
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
    throw new Error("Failed to update email template");
  }
}

const emailService = new EmailService();

export default emailService;
