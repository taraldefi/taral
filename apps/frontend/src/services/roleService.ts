import apiUrls from "@config/apiUrls";
import getAxiosConfig from "@config/axiosConfig";
import axios from "axios";
import { IcreateRole, IroleResponse } from "src/types";

class RoleService {
  /**
   * function to get all roles
   * @param keywords
   * @param limit
   * @param page
   * @returns
   */
  async getAllRoles(
    keywords: string,
    limit: number,
    page: number
  ): Promise<IroleResponse[]> {
    const axiosConfig = getAxiosConfig({ method: "GET" });
    try {
      const response = await axios.get(
        `${apiUrls.ROLES}?keywords=${keywords}&limit=${limit}&page=${page}`,
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
    throw new Error("Failed to fetch Roles.");
  }

  /**
   * get role by id
   * @param id
   * @returns
   */
  async getRoleById(id: string): Promise<IroleResponse> {
    const axiosConfig = getAxiosConfig({ method: "GET" });
    try {
      const response = await axios.get(`${apiUrls.ROLES}/${id}`, axiosConfig);
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
    throw new Error("Failed to Fetch Role by ID.");
  }

  /**
   * funtion to create role
   * @param roleInfo
   * @returns
   */

  async createRole(roleInfo: IcreateRole): Promise<IroleResponse> {
    const axiosConfig = getAxiosConfig({ method: "POST" });
    try {
      const response = await axios.post(
        apiUrls.ROLES,
        JSON.stringify(roleInfo),
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
    throw new Error("Failed to create Role.");
  }

  /**
   * function delete a role
   * @param id
   * @returns
   */
  async deleteRole(id: string): Promise<void> {
    const axiosConfig = getAxiosConfig({ method: "DELETE" });
    try {
      const response = await axios.delete(
        `${apiUrls.ROLES}/${id}`,
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
    throw new Error("Failed to delete Role.");
  }
  /**
   * function to update a role
   * @param id
   * @param roleInfo
   */
  async updateRole(id: string, roleInfo: IcreateRole): Promise<IroleResponse> {
    const axiosConfig = getAxiosConfig({ method: "PATCH" });
    try {
      const response = await axios.patch(
        `${apiUrls.ROLES}/${id}`,
        JSON.stringify(roleInfo),
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
    throw new Error("Failed to update Role.");
  }
}

const roleService = new RoleService();

export default roleService;
