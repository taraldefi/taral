import apiUrls from "@config/apiUrls";
import getAxiosConfig from "@config/axiosConfig";
import CoreUtils from "@utils/coreUtils";
import axios from "axios";
import {
  RegisterResponse,
  TwoFAResponse,
  changePasswordProps,
  resetPasswordProps,
  userProfile,
} from "src/types";

class AuthService {
  /**
   * Login
   * @param username
   * @param password
   * @param remember
   */
  async login(
    username: string,
    password: string,
    remember: boolean
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const url = apiUrls.USER_LOGIN;
      const axiosConfig = getAxiosConfig({ method: "POST" });

      // if (process.env.NODE_ENV !== "production") {
      //   url += "?";
      //   for (let pair of formData.entries()) {
      //     url += `${pair[0]}=${pair[1]}&`;
      //   }

      //   url = url.replace(/^\&|\&$/, "");
      // }

      try {
        const response = await axios.post(
          url,
          JSON.stringify({
            username: username,
            password: password,
            remember: remember,
          }),
          axiosConfig
        );

        const cookie = response.data;

        if (response.status === 201) {
          localStorage.setItem("SITE_DATA_AUTH", JSON.stringify(cookie));

          if (remember) {
            CoreUtils.call(
              "setCookie",
              "SITE_DATA_LOGIN_COOKIE",
              JSON.stringify(cookie),
              "/",
              2
            );
          } else {
            CoreUtils.call(
              "setCookie",
              "SITE_DATA_LOGIN_COOKIE",
              JSON.stringify(cookie),
              "/",
              "Session"
            );
          }
          resolve(true);
        }
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.status || error.response?.data.message);
          reject(error.response?.data.message);
        } else {
          console.log(error.message);
          reject(error.message);
        }
      }
      reject(new Error("Login failed."));
    });
  }
  /**
   *
   * @param username
   * @param email
   * @param password
   * @param name
   */

  async register(
    username: string,
    email: string,
    password: string,
    name: string
  ): Promise<RegisterResponse> {
    return new Promise(async (resolve, reject) => {
      const axiosConfig = getAxiosConfig({ method: "POST" });
      try {
        const response = await axios.post(
          apiUrls.USER_REGISTER,
          JSON.stringify({
            username: username,
            email: email,
            password: password,
            name: name,
          }),
          axiosConfig
        );
        const { data } = response;

        if (response.status === 201) {
          resolve(data);
        }
      } catch (error: any) {
        console.log(error);
        reject(error.response.data.errors.message);
      }
      reject(new Error("Registration failed."));
    });
  }
  /**
   * Toggle 2FA function
   * @param isTwoFAEnabled
   */
  async toggle2FA(isTwoFAEnabled: boolean): Promise<TwoFAResponse> {
    const axiosConfig = getAxiosConfig({ method: "PUT" });
    try {
      const response = await axios.put(
        apiUrls.USER_TOGGLE_2FA,
        {
          isTwoFAEnabled: isTwoFAEnabled,
        },
        axiosConfig
      );
      const { data } = response;
      if (response.status === 204) {
        return data;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        console.log(error.message);
      }
    }
    throw new Error("2FA toggle failed.");
  }

  /**
   * TwoFA authenticate functions
   * @param code
   */
  async authenticateTwoFA(code: string): Promise<any> {
    const axiosConfig = getAxiosConfig({ method: "POST" });
    try {
      const response = await axios.post(
        apiUrls.USER_AUTHENTICATE,
        {
          code: code,
        },
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
    throw new Error("2FA authentication failed.");
  }
  /**
   * activate account function
   * @param token
   * @returns
   */
  async activateAccount(token: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const axiosConfig = getAxiosConfig({ method: "GET" });
      try {
        const response = await axios.get(
          `${apiUrls.USER_ACTIVATE}?token=${token}`,
          axiosConfig
        );
        if (response.status == 204) {
          resolve(true);
        }
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.status || error.message);
          reject(new Error(error.message));
        } else {
          console.log(error.message);
          reject(new Error(error.message));
        }
      }
      reject(new Error("Failed to activate account."));
    });
  }

  /**
   * logout function

   */
  async logout(refreshToken: string): Promise<void> {
    const axiosConfig = getAxiosConfig({ method: "POST" });
    try {
      const response = await axios.post(
        apiUrls.USER_LOGOUT,
        JSON.stringify({
          refreshToken: refreshToken,
        }),
        axiosConfig
      );
      if (response.status == 201) {
        localStorage.removeItem("SITE_DATA_AUTH");
        CoreUtils.call("delCookie", "SITE_DATA_LOGIN_COOKIE", "/");
        return;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        throw new Error(error.message);
      }
    }
    throw new Error("logout failed.");
  }

  // password service functions

  /**
   * forgot password function
   * @param email
   * @returns
   */
  async forgotPassword(email: string): Promise<void> {
    const axiosConfig = getAxiosConfig({ method: "PUT" });
    try {
      const response = await axios.put(
        apiUrls.USER_FORGOT_PASSWORD,
        {
          email: email,
        },
        axiosConfig
      );
      if (response.status == 204) {
        return;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        throw new error.message();
      }
    }
    throw new Error("forgot password function failed!");
  }
  /**
   * reset password function
   * @param token
   * @param password
   * @param confirmPassword
   * @returns
   */
  async resetPassword({
    token,
    password,
    confirmPassword,
  }: resetPasswordProps): Promise<void> {
    const axiosConfig = getAxiosConfig({ method: "PUT" });
    try {
      const response = await axios.put(
        apiUrls.USER_RESET_PASSWORD,
        {
          token: token,
          password: password,
          confirmPassword: confirmPassword,
        },
        axiosConfig
      );

      if (response.status == 204) {
        return;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        console.log(error.message);
      }
    }
    throw new Error("reset password function failed!");
  }
  /**
   * change password function
   * @param oldPassword
   * @param password
   * @param confirmPassword
   * @returns
   */
  async changePassword({
    oldPassword,
    password,
    confirmPassword,
  }: changePasswordProps): Promise<void> {
    const axiosConfig = getAxiosConfig({ method: "PUT" });
    try {
      const response = await axios.put(
        apiUrls.USER_CHANGE_PASSWORD,
        {
          oldPassword: oldPassword,
          password: password,
          confirmPassword: confirmPassword,
        },
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
    throw new Error("change password function failed!");
  }

  // profile functions
  /**
   * function to fetch the profile of the user
   * @returns
   */
  async getProfile(): Promise<RegisterResponse> {
    const axiosConfig = getAxiosConfig({ method: "GET" });
    try {
      const response = await axios.get(apiUrls.USER_PROFILE, axiosConfig);
      const { data } = response;
      if (response.status == 200) {
        return data;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        throw new Error(error.message);
      }
    }
    throw new Error("Failed to fetch profile");
  }

  async updateProfile(userInfo: userProfile): Promise<RegisterResponse> {
    const axiosConfig = getAxiosConfig({ method: "PUT" });
    try {
      const response = await axios.put(
        apiUrls.USER_PROFILE,
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
        throw new Error(error.message);
      }
    }
    throw new Error("updating profile failed!");
  }
}

const authService = new AuthService();

export default authService;
