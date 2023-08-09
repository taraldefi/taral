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
  ): Promise<void> {
    const url = apiUrls.USER_LOGIN;
    const axiosConfig = getAxiosConfig("POST");

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
        {
          username: username,
          password: password,
          remember: remember,
        },
        axiosConfig
      );
      const cookieName = "Authentication";
      const cookie = (response.headers["set-cookie"] as string[])
        .find((cookie) => cookie.includes(cookieName))
        ?.match(new RegExp(`^${cookieName}=(.+?);`))?.[1];

      if (response.statusCode === 204) {
        localStorage.setItem(
          "SITE_DATA_AUTH",
          JSON.stringify({
            token: cookie,
          })
        );

        if (remember) {
          CoreUtils.call(
            "setCookie",
            "SITE_DATA_LOGIN_COOKIE",
            cookie,
            "/",
            14
          );
        } else {
          CoreUtils.call(
            "setCookie",
            "SITE_DATA_LOGIN_COOKIE",
            cookie,
            "/",
            "Session"
          );
        }
        return;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        console.log(error.message);
      }
    }
    throw new Error("Login failed.");
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
    const axiosConfig = getAxiosConfig("POST");
    try {
      const response = await axios.post(
        apiUrls.USER_REGISTER,
        {
          username: username,
          email: email,
          password: password,
          name: name,
        },
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
    throw new Error("Registration failed.");
  }
  /**
   * Toggle 2FA function
   * @param isTwoFAEnabled
   */
  async toggle2FA(isTwoFAEnabled: boolean): Promise<TwoFAResponse> {
    const axiosConfig = getAxiosConfig("PUT");
    try {
      const response = await axios.put(
        apiUrls.USER_TOGGLE_2FA,
        {
          isTwoFAEnabled: isTwoFAEnabled,
        },
        axiosConfig
      );
      const { data } = response;
      if (response.statusCode === 204) {
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
    const axiosConfig = getAxiosConfig("POST");
    try {
      const response = await axios.post(
        apiUrls.USER_AUTHENTICATE,
        {
          code: code,
        },
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
    throw new Error("2FA authentication failed.");
  }
  /**
   * activate account function
   * @param token
   * @returns
   */
  async activateAccount(token: string): Promise<void> {
    const axiosConfig = getAxiosConfig("GET");
    try {
      const response = await axios.get(
        `${apiUrls.USER_ACTIVATE}?token=${token}`,
        axiosConfig
      );
      if (response.statusCode == 204) {
        return;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status || error.message);
      } else {
        console.log(error.message);
      }
    }
    throw new Error("Failed to activate account.");
  }

  /**
   * logout function

   */
  async logout(): Promise<void> {
    const axiosConfig = getAxiosConfig("POST");
    try {
      const response = await axios.post(apiUrls.USER_LOGOUT, axiosConfig);
      if (response.statusCode == 201) {
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
    const axiosConfig = getAxiosConfig("PUT");
    try {
      const response = await axios.put(
        apiUrls.USER_FORGOT_PASSWORD,
        {
          email: email,
        },
        axiosConfig
      );
      if (response.statusCode == 204) {
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
    const axiosConfig = getAxiosConfig("PUT");
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

      if (response.statusCode == 204) {
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
    const axiosConfig = getAxiosConfig("PUT");
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
      if (response.statusCode == 200) {
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
    const axiosConfig = getAxiosConfig("GET");
    try {
      const response = await axios.get(apiUrls.USER_PROFILE, axiosConfig);
      const { data } = response;
      if (response.statusCode == 200) {
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
    const axiosConfig = getAxiosConfig("PUT");
    try {
      const response = await axios.put(
        apiUrls.USER_PROFILE,
        JSON.stringify(userInfo),
        axiosConfig
      );
      const { data } = response;
      if (response.statusCode == 200) {
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
