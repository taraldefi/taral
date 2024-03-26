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
  const config: AxiosRequestConfig = {
    headers: {
      method: method,
      "Content-Type": contentType ? contentType : "application/json",
    },
    responseType: responseType ? responseType : "json",
  };

  return config;
}
