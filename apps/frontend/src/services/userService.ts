import apiUrls from "@config/apiUrls";
import getAxiosConfig from "@config/axiosConfig";
import axios from "axios";
import { IcreateUser, IupdateUser, RegisterResponse } from "src/types";

class UserService {
  /**
   * get user function
   * @param keywords
   * @param limit
   * @param page
   */
  async getAllUsers(
    keywords: string,
    limit: number,
    page: number
  ): Promise<RegisterResponse[]> {
    const axiosConfig = getAxiosConfig({ method: "GET" });
    try {
      const response = await axios.get(
        `${apiUrls.USER}?keywords=${keywords}&limit=${limit}&page=${page}`,
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
    throw new Error("Failed to fetch users.");
  }

  /**
   * Function for creating a user
   * @param userInfo
   * @returns
   */
  async createUser(userInfo: IcreateUser): Promise<RegisterResponse> {
    const axiosConfig = getAxiosConfig({ method: "POST" });
    try {
      const response = await axios.post(
        `${apiUrls.USER}`,
        JSON.stringify(userInfo),
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
    throw new Error("Failed to create user.");
  }

  /**
   * get a user by ID
   * @param id
   * @returns
   */
  async getUserById(id: string): Promise<RegisterResponse> {
    const axiosConfig = getAxiosConfig({ method: "GET" });
    try {
      const response = await axios.get(`${apiUrls.USER}/${id}`, axiosConfig);
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
    throw new Error("Failed to fetch user by ID.");
  }

  /**
   * update user by ID
   * @param id
   * @param userInfo
   * @returns
   */
  async updateUser(
    id: string,
    userInfo: IupdateUser
  ): Promise<RegisterResponse> {
    const axiosConfig = getAxiosConfig({ method: "PUT" });
    try {
      const response = await axios.put(
        `${apiUrls.USER}/${id}`,
        JSON.stringify(userInfo),
        axiosConfig
      );
      const { data } = response;
      if (response.status == 200) {
        return data;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        console.log(error.message);
      }
    }
    throw new Error("Failed to update user by ID.");
  }
}

const userService = new UserService();

export default userService;
