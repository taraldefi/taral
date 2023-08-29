import CoreUtils from "@utils/coreUtils";
import { AxiosRequestConfig } from "axios";

/**
 * axios config
 * @param method
 * @returns
 */

interface axiosConfigType {
  method: string;
  contentType?: string;
  responseType?: any;
}
export default function getAxiosConfig({
  method,
  contentType,
  responseType,
}: axiosConfigType) {
  const authHeader = CoreUtils.return("authHeader");
  const config: AxiosRequestConfig = {
    headers: {
      method: method,
      "Content-Type": contentType ? contentType : "application/json",
      Authorization: authHeader.Authorization,
    },
    responseType: responseType ? responseType : "json",
  };

  return config;
}
