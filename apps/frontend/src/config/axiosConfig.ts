import CoreUtils from "@utils/coreUtils";
import { AxiosRequestConfig } from "axios";

/**
 * axios config
 * @param method
 * @returns
 */
export default function getAxiosConfig(method: string, contentType?: string) {
  const authHeader = CoreUtils.return("authHeader");
  const config: AxiosRequestConfig = {
    headers: {
      method: method,
      "Content-Type": contentType ? contentType : "application/json",
      Authorization: authHeader.Authorization,
    },
  };

  return config;
}
