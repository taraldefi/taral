import apiUrls from "@config/apiUrls";
import getAxiosConfig from "@config/axiosConfig";
import { getAccessToken } from "@utils/helper";
import { getBase64Src } from "@utils/lib/fetchEntityLogo";
import axios from "axios";
import { EntityCardResponse, SupplierEntityResponse } from "src/types";

class SupplierEntityService {
  /**
   * function to get an entity by ID
   * @param id
   */

  async getEntity(id: string): Promise<SupplierEntityResponse> {
    const accessToken = await getAccessToken();
    try {
      const response = await axios.get(`${apiUrls.SUPPLIER_ENTITY}/${id}`, {
        headers: {
          method: "GET",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "json",
      });

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
  async getAllEntity(): Promise<SupplierEntityResponse[]> {
    const accessToken = await getAccessToken();
    try {
      const response = await axios.get(`${apiUrls.SUPPLIER_ENTITY}`, {
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
    throw new Error("Fetch Entities failed.");
  }

  async getEntityLogo(id: string) {
    const accessToken = await getAccessToken();
    try {
      const response = await axios.get(`${apiUrls.ENTITYLOGO}/${id}`, {
        headers: {
          method: "GET",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "arraybuffer",
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
    throw new Error("Fetch Entity Logo by ID failed.");
  }

  /**
   * Create Entity Function
   * @param entity
   */
  createEntity(entity: FormData): Promise<SupplierEntityResponse> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();

      try {
        const response = await axios.post(apiUrls.SUPPLIER_ENTITY, entity, {
          headers: {
            method: "POST",
            contentType: "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
          responseType: "json",
        });
        const data: SupplierEntityResponse = response.data;

        if (response.status === 201) {
          resolve(data);
        } else {
          reject(new Error("Failed to create entity"));
        }
      } catch (error: any) {
        reject(new Error(error.message));
      }
    });
  }

  /**
   * Delete Entity Function
   * @param id
   */
  deleteEntity(id: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getAccessToken();
      const axiosConfig = getAxiosConfig({ method: "DELETE" });

      try {
        const response = await axios.delete(
          `${apiUrls.SUPPLIER_ENTITY}/${id}`,
          {
            headers: {
              method: "DELETE",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
          }
        );

        if (response.status === 200) {
          resolve(true);
        }
      } catch (error: any) {
        reject(new Error(error.message));
      }
    });
  }
  /**
   * Update Entity Function
   * @param id
   * @param entity
   */
  async updateEntity(
    id: string,
    entity: FormData
  ): Promise<SupplierEntityResponse> {
    const accessToken = await getAccessToken();

    for (const [key, value] of entity.entries()) {
      console.log(key, value);
    }
    try {
      const response = await axios.patch(
        `${apiUrls.SUPPLIER_ENTITY}/${id}`,
        entity,
        {
          headers: {
            method: "PATCH",
            contentType: "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
          responseType: "arraybuffer",
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
    throw new Error("Updating entity failed.");
  }
}

const supplierEntityService = new SupplierEntityService();

export default supplierEntityService;
