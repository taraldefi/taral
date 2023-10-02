import apiUrls from "@config/apiUrls";
import getAxiosConfig from "@config/axiosConfig";
import { getBase64Src } from "@utils/lib/fetchEntityLogo";
import axios from "axios";
import { Entity, EntityCardResponse, EntityResponse } from "src/types";

class EntityService {
  /**
   * function to get an entity by ID
   * @param id
   */

  async getEntity(id: string): Promise<EntityResponse> {
    const axiosConfig = getAxiosConfig({ method: "GET" });
    try {
      const response = await axios.get(`${apiUrls.ENTITY}/${id}`, axiosConfig);

      const { data } = response;

      if (response.status === 200) {
        const logo = await this.getEntityLogo(data.logo);
        data.logo = getBase64Src(logo);
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
  async getAllEntity(): Promise<EntityCardResponse[]> {
    const axiosConfig = getAxiosConfig({ method: "GET" });
    try {
      const response = await axios.get(`${apiUrls.ENTITY}`, axiosConfig);

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
    throw new Error("Fetch Entities failed.");
  }

  async getEntityLogo(id: string) {
    const axiosConfig = getAxiosConfig({
      method: "GET",
      responseType: "arraybuffer",
    });
    try {
      const response = await axios.get(
        `${apiUrls.ENTITYLOGO}/${id}`,
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
    throw new Error("Fetch Entity Logo by ID failed.");
  }

  /**
   * Create Entity Function
   * @param entity
   */
  async createEntity(entity: FormData): Promise<EntityResponse> {
    const axiosConfig = getAxiosConfig({ method: "POST" });
    try {
      const response = await axios.post(apiUrls.ENTITY, entity, axiosConfig);
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
    throw new Error("Creating entity failed.");
  }

  /**
   * Delete Entity Function
   * @param id
   */
  async deleteEntity(id: string): Promise<boolean> {
    const axiosConfig = getAxiosConfig({ method: "DELETE" });
    try {
      const response = await axios.delete(
        `${apiUrls.ENTITY}/${id}`,
        axiosConfig
      );

      if (response.status === 200) {
        return true;
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
  async updateEntity(
    id: string,
    entity: Partial<Entity>
  ): Promise<EntityResponse> {
    const axiosConfig = getAxiosConfig({ method: "PATCH" });
    try {
      const response = await axios.patch(
        `${apiUrls.ENTITY}/${id}`,
        JSON.stringify(entity),
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
    throw new Error("Updating entity failed.");
  }
}

const entityService = new EntityService();

export default entityService;
