import apiUrls from "@config/apiUrls";
import getAxiosConfig from "@config/axiosConfig";
import axios from "axios";
import { IcreatePermission, IpermissionResponse } from "src/types";

class PermissionService {
  /**
   * function to get all Permissions
   * @param keywords
   * @param limit
   * @param page
   * @returns
   */
  async getAllPermissions(
    keywords: string,
    limit: number,
    page: number
  ): Promise<IpermissionResponse[]> {
    const axiosConfig = getAxiosConfig({ method: "GET" });
    try {
      const response = await axios.get(
        `${apiUrls.PERMISSIONS}?keywords=${keywords}&limit=${limit}&page=${page}`,
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
    throw new Error("Failed to fetch Permissions.");
  }

  /**
   * get Permission by id
   * @param id
   * @returns
   */
  async getPermissionById(id: string): Promise<IpermissionResponse> {
    const axiosConfig = getAxiosConfig({ method: "GET" });
    try {
      const response = await axios.get(
        `${apiUrls.PERMISSIONS}/${id}`,
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
    throw new Error("Failed to Fetch Permission by ID.");
  }

  /**
   * funtion to create Permission
   * @param PermissionInfo
   * @returns
   */

  async createPermission(
    PermissionInfo: IcreatePermission
  ): Promise<IpermissionResponse> {
    const axiosConfig = getAxiosConfig({ method: "POST" });
    try {
      const response = await axios.post(
        apiUrls.PERMISSIONS,
        JSON.stringify(PermissionInfo),
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
    throw new Error("Failed to create Permission.");
  }

  /**
   * function delete a Permission
   * @param id
   * @returns
   */
  async deletePermission(id: string): Promise<void> {
    const axiosConfig = getAxiosConfig({ method: "DELETE" });
    try {
      const response = await axios.delete(
        `${apiUrls.PERMISSIONS}/${id}`,
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
    throw new Error("Failed to delete Permission.");
  }
  /**
   * function to update a Permission
   * @param id
   * @param PermissionInfo
   */
  async updatePermission(
    id: string,
    PermissionInfo: IcreatePermission
  ): Promise<IpermissionResponse> {
    const axiosConfig = getAxiosConfig({ method: "PATCH" });
    try {
      const response = await axios.patch(
        `${apiUrls.PERMISSIONS}/${id}`,
        JSON.stringify(PermissionInfo),
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
    throw new Error("Failed to update Permission.");
  }
}

const permissionService = new PermissionService();

export default permissionService;
