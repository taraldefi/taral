import apiUrls from "@config/apiUrls";
import getAxiosConfig from "@config/axiosConfig";
import axios from "axios";
import { Entity, EntityResponse } from "src/types";

class EntityService {
  /**
   * function to get an entity by ID
   * @param id
   */

  async getEntity(id: string): Promise<EntityResponse> {
    const axiosConfig = getAxiosConfig("GET");
    try {
      const response = await axios.get(`${apiUrls.ENTITY}/${id}`, axiosConfig);
      const { data } = response;

      if (response.statusCode === 200) {
        return data;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        console.log(error.message);
      }
    }
    throw new Error("Fetch Entity by ID failed.");
  }

  /**
   * Create Entity Function
   * @param entity
   */
  async createEntity(entity: Entity): Promise<EntityResponse> {
    const axiosConfig = getAxiosConfig("POST");
    try {
      const response = await axios.post(
        apiUrls.ENTITY,
        JSON.stringify(entity),
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
    throw new Error("Creating entity failed.");
  }

  /**
   * Delete Entity Function
   * @param id
   */
  async deleteEntity(id: string): Promise<void> {
    const axiosConfig = getAxiosConfig("DELETE");
    try {
      const response = await axios.delete(
        `${apiUrls.ENTITY}/${id}`,
        axiosConfig
      );
      const { data } = response;

      if (response.statusCode === 200) {
        return data;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        console.log(error.message);
      }
    }
    throw new Error("Deleting Entity failed.");
  }
  /**
   * Update Entity Function
   * @param id
   * @param entity
   */
  async updateEntity(id: string, entity: Entity): Promise<EntityResponse> {
    const axiosConfig = getAxiosConfig("PATCH");
    try {
      const response = await axios.patch(
        `${apiUrls.ENTITY}/${id}`,
        JSON.stringify(entity),
        axiosConfig
      );
      const { data } = response;

      if (response.statusCode === 200) {
        return data;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        console.log(error.message);
      }
    }
    throw new Error("Updating entity failed.");
  }
}

const entityService = new EntityService();

export default entityService;
