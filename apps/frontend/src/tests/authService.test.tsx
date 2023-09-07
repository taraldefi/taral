import apiUrls from "@config/apiUrls";
import authService from "@services/authService";
import axios from "axios";

// Use Jest to mock axios and CoreUtils modules
jest.mock("axios");

describe("AuthService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should be able to login a user", async () => {
      const mockResponse = {
        status: 204,
        data: {},
        headers: {
          "set-cookie": [
            "Authentication=token123; Path=/; Expires=Wed, 24 May 2023 12:00:00 GMT; Secure; HttpOnly; SameSite=None",
          ],
        },
      };

      (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await authService.login("username", "password", true);

      expect(axios.post).toHaveBeenCalledWith(
        apiUrls.USER_LOGIN,
        {
          username: "username",
          password: "password",
          remember: true,
        },
        expect.any(Object)
      );

      expect(result).toEqual(undefined);
    });

    it("should throw an error when login fails", async () => {
      const errorMessage = "Login failed.";
      const mockResponse = {
        status: 400,
        data: {},
      };
      (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Call the login function and expect it to throw an error
      await expect(
        authService.login("username", "password", true)
      ).rejects.toThrow(errorMessage);

      // Check if axios.post was called with the correct parameters
      expect(axios.post).toHaveBeenCalledWith(
        apiUrls.USER_LOGIN,
        {
          username: "username",
          password: "password",
          remember: true,
        },
        expect.any(Object)
      );
    });
  });

  describe("register", () => {
    it("should register a user successfully", async () => {
      const mockResponse = {
        status: 201,
        data: {
          username: "string",
          email: "string",
          name: "string",
          address: "string",
          isTwoFAEnabled: true,
          contact: "string",
          avatar: "string",
          status: "string",
          createdAt: "2023-05-19T12:46:55.070Z",
          updatedAt: "2023-05-19T12:46:55.070Z",
        },
      };
      (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse); // Mock the axios.post method to return the mockResponse

      // Provide test data
      const username = "testuser";
      const email = "test@example.com";
      const password = "testpassword";
      const name = "Test User";

      // Call the register function
      const result = await authService.register(
        username,
        email,
        password,
        name
      );

      // Check if the result matches the expected output
      expect(result).toEqual(mockResponse.data);

      // Check if axios.post was called with the correct parameters
      expect(axios.post).toHaveBeenCalledWith(
        apiUrls.USER_REGISTER,
        {
          username: username,
          email: email,
          password: password,
          name: name,
        },
        expect.any(Object)
      );
    });

    it("should throw an error when registration fails", async () => {
      const errorMessage = "Registration failed.";

      const mockResponse = {
        status: 400,
        data: {
          message: "something went wrong",
        },
      };
      (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Provide test data
      const username = "testuser";
      const email = "test@example.com";
      const password = "testpassword";
      const name = "Test User";

      // Call the register function and expect it to throw an error
      await expect(
        authService.register(username, email, password, name)
      ).rejects.toThrow(errorMessage);

      // Check if axios.post was called with the correct parameters
      expect(axios.post).toHaveBeenCalledWith(
        apiUrls.USER_REGISTER,
        {
          username: username,
          email: email,
          password: password,
          name: name,
        },
        expect.any(Object)
      );
    });
  });

  describe("TwoFA", () => {
    it("should toggle TwoFA", async () => {
      const mockResponse = {
        status: 204,
        data: {
          success: true,
          qrCodeUri: "qrCodeData",
        },
      };
      (axios.put as jest.Mock).mockResolvedValueOnce(mockResponse); // Mock the axios.post method to return the mockResponse

      // Provide test data
      const isTwoFAEnabled = true;

      // Call the register function
      const result = await authService.toggle2FA(isTwoFAEnabled);

      // Check if the result matches the expected output
      expect(result).toEqual(mockResponse.data);

      // Check if axios.put was called with the correct parameters
      expect(axios.put).toHaveBeenCalledWith(
        apiUrls.USER_TOGGLE_2FA,
        {
          isTwoFAEnabled,
        },
        expect.any(Object)
      );
    });

    it("should throw an error when toggle fails", async () => {
      const errorMessage = "2FA toggle failed.";
      const mockResponse = {
        status: 400,
        data: {
          message: "already enabled",
        },
      };
      (axios.put as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Provide test data
      const isTwoFAEnabled = true;

      // Call the register function and expect it to throw an error
      await expect(authService.toggle2FA(isTwoFAEnabled)).rejects.toThrow(
        errorMessage
      );

      // Check if axios.put was called with the correct parameters
      expect(axios.put).toHaveBeenCalledWith(
        apiUrls.USER_TOGGLE_2FA,
        {
          isTwoFAEnabled: isTwoFAEnabled,
        },
        expect.any(Object)
      );
    });

    it("should be able to authenticate 2FA", async () => {
      const mockResponse = {
        status: 200,
        data: {
          success: true,
        },
      };
      (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse); // Mock the axios.post method to return the mockResponse

      // Provide test data
      const code = "testCode";

      // Call the register function
      const result = await authService.authenticateTwoFA(code);

      // Check if the result matches the expected output
      expect(result).toEqual(mockResponse.data);

      // Check if axios.post was called with the correct parameters
      expect(axios.post).toHaveBeenCalledWith(
        apiUrls.USER_AUTHENTICATE,
        {
          code: code,
        },
        expect.any(Object)
      );
    });

    it("should throw an error when 2FA authentication fails", async () => {
      const errorMessage = "2FA authentication failed.";
      const mockResponse = {
        status: 400,
        data: {
          message: "invalid Code",
        },
      };
      (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Provide test data
      const code = "testCode";

      // Call the register function and expect it to throw an error
      await expect(authService.authenticateTwoFA(code)).rejects.toThrow(
        errorMessage
      );

      // Check if axios.post was called with the correct parameters
      expect(axios.post).toHaveBeenCalledWith(
        apiUrls.USER_AUTHENTICATE,
        {
          code: code,
        },
        expect.any(Object)
      );
    });
  });

  describe("User Account", () => {
    it("should logout successfully", async () => {
      const responseMock = { status: 201 };
      (axios.post as jest.Mock).mockResolvedValueOnce(responseMock);

      const result = await authService.logout();

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining(apiUrls.USER_LOGOUT),
        expect.any(Object)
      );

      expect(result).toEqual(undefined); // No data expected, as status is 201
    });

    it("should handle error during logout", async () => {
      const errorMessage = "Failed to logout.";
      const errorMock = new Error(errorMessage);
      (axios.post as jest.Mock).mockRejectedValueOnce(errorMock);

      await expect(authService.logout()).rejects.toThrowError(errorMessage);
    });

    it("should handle network error during logout", async () => {
      const errorMessage = "logout failed.";
      const errorMock = {
        isAxiosError: true,
        response: undefined,
        message: errorMessage,
      };
      (axios.post as jest.Mock).mockRejectedValueOnce(errorMock);

      await expect(authService.logout()).rejects.toThrowError(errorMessage);
    });

    it("should activate an account successfully", async () => {
      const token = "example_token";
      const responseMock = { status: 204 };
      (axios.get as jest.Mock).mockResolvedValueOnce(responseMock);

      const result = await authService.activateAccount(token);

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(`${apiUrls.USER_ACTIVATE}?token=${token}`),
        expect.any(Object)
      );
      expect(result).toEqual(undefined); // No data expected, as status is 204
    });

    it("should handle error during account activation", async () => {
      const errorMessage = "Failed to activate account.";
      const errorMock = new Error(errorMessage);
      (axios.get as jest.Mock).mockRejectedValueOnce(errorMock);

      const token = "example_token";

      await expect(authService.activateAccount(token)).rejects.toThrowError(
        errorMessage
      );
    });

    it("should handle network error during account activation", async () => {
      const errorMessage = "Failed to activate account.";
      const errorMock = {
        isAxiosError: true,
        response: undefined,
        message: errorMessage,
      };
      (axios.get as jest.Mock).mockRejectedValueOnce(errorMock);

      const token = "example_token";

      await expect(authService.activateAccount(token)).rejects.toThrowError(
        errorMessage
      );
    });

    it("should fetch the profile successfully", async () => {
      const responseMock = {
        status: 200,
        data: {
          /* profile data */
        },
      };
      (axios.get as jest.Mock).mockResolvedValueOnce(responseMock);

      const result = await authService.getProfile();

      expect(axios.get).toHaveBeenCalledWith(
        apiUrls.USER_PROFILE,
        expect.any(Object)
      );
      expect(result).toEqual(responseMock.data);
    });

    it("should handle error during profile fetch", async () => {
      const errorMessage = "Failed to fetch profile.";
      const errorMock = new Error(errorMessage);
      (axios.get as jest.Mock).mockRejectedValueOnce(errorMock);

      await expect(authService.getProfile()).rejects.toThrowError(errorMessage);
    });

    it("should handle network error during profile fetch", async () => {
      const errorMessage = "Network error occurred.";
      const errorMock = {
        isAxiosError: true,
        response: undefined,
        message: errorMessage,
      };
      (axios.get as jest.Mock).mockRejectedValueOnce(errorMock);

      await expect(authService.getProfile()).rejects.toThrowError(errorMessage);
    });

    it("should update the profile successfully", async () => {
      const userInfo = {
        username: "test",
        email: "test",
        name: "test",
        address: "test",
        contact: "test",
        avatar: "test",
      };
      const responseMock = {
        status: 200,
        data: {
          /* updated profile data */
        },
      };
      (axios.put as jest.Mock).mockResolvedValueOnce(responseMock);

      const result = await authService.updateProfile(userInfo);

      expect(axios.put).toHaveBeenCalledWith(
        apiUrls.USER_PROFILE,
        JSON.stringify(userInfo),
        expect.any(Object)
      );
      expect(result).toEqual(responseMock.data);
    });

    it("should handle error during profile update", async () => {
      const errorMessage = "Failed to update profile.";
      const errorMock = new Error(errorMessage);
      (axios.put as jest.Mock).mockRejectedValueOnce(errorMock);

      const userInfo = {
        username: "test",
        email: "test",
        name: "test",
        address: "test",
        contact: "test",
        avatar: "test",
      };

      await expect(authService.updateProfile(userInfo)).rejects.toThrowError(
        errorMessage
      );
    });

    it("should handle network error during profile update", async () => {
      const errorMessage = "Network error occurred.";
      const errorMock = {
        isAxiosError: true,
        response: undefined,
        message: errorMessage,
      };
      (axios.put as jest.Mock).mockRejectedValueOnce(errorMock);

      const userInfo = {
        username: "test",
        email: "test",
        name: "test",
        address: "test",
        contact: "test",
        avatar: "test",
      };

      await expect(authService.updateProfile(userInfo)).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe("Password", () => {
    it("should be able to change password", async () => {
      const mockResponse = {
        status: 200,
        data: {
          message: "OK",
        },
      };
      (axios.put as jest.Mock).mockResolvedValueOnce(mockResponse); // Mock the axios.post method to return the mockResponse

      // Provide test data
      const oldPassword = "/\\sU#;@4H^1&O/";
      const password = "/\\sU#;@4H^1&O/a";
      const confirmPassword = "/\\sU#;@4H^1&O/a";

      // Call the register function
      const result = await authService.changePassword({
        oldPassword,
        password,
        confirmPassword,
      });

      // Check if the result matches the expected output
      expect(result).toEqual(mockResponse.data);

      // Check if axios.put was called with the correct parameters
      expect(axios.put).toHaveBeenCalledWith(
        apiUrls.USER_CHANGE_PASSWORD,
        {
          oldPassword: oldPassword,
          password: password,
          confirmPassword: confirmPassword,
        },
        expect.any(Object)
      );
    });

    it("should be able to reset password", async () => {
      const mockResponse = {
        status: 204,
        data: {},
      };
      (axios.put as jest.Mock).mockResolvedValueOnce(mockResponse); // Mock the axios.post method to return the mockResponse

      // Provide test data
      const token = "testToken";
      const password = "/\\sU#;@4H^1&O/a";
      const confirmPassword = "/\\sU#;@4H^1&O/a";

      // Call the register function
      const result = await authService.resetPassword({
        token,
        password,
        confirmPassword,
      });

      // Check if the result matches the expected output
      expect(result).toEqual(undefined);

      // Check if axios.put was called with the correct parameters
      expect(axios.put).toHaveBeenCalledWith(
        apiUrls.USER_RESET_PASSWORD,
        {
          token: token,
          password: password,
          confirmPassword: confirmPassword,
        },
        expect.any(Object)
      );
    });

    it("forgot password works properly", async () => {
      const mockResponse = {
        status: 204,
        data: {},
      };
      (axios.put as jest.Mock).mockResolvedValueOnce(mockResponse); // Mock the axios.post method to return the mockResponse

      // Provide test data
      const email = "test@123.com";

      // Call the register function
      const result = await authService.forgotPassword(email);

      // Check if the result matches the expected output
      expect(result).toEqual(undefined);

      // Check if axios.put was called with the correct parameters
      expect(axios.put).toHaveBeenCalledWith(
        apiUrls.USER_FORGOT_PASSWORD,
        {
          email: email,
        },
        expect.any(Object)
      );
    });

    it("should throw an error when any of the above functions fail", async () => {
      const errorMessage = [
        "forgot password function failed!",
        "reset password function failed!",
        "change password function failed!",
      ];

      const mockResponse = {
        status: 500,
        data: {
          message: "internal server error",
        },
      };
      (axios.put as jest.Mock).mockResolvedValueOnce(mockResponse);
      (axios.put as jest.Mock).mockResolvedValueOnce(mockResponse);
      (axios.put as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Provide test data
      const email = "test@123.com";
      const oldPassword = "/\\sU#;@4H^1&O/";
      const token = "testToken";
      const password = "/\\sU#;@4H^1&O/a";
      const confirmPassword = "/\\sU#;@4H^1&O/a";

      // Call the register function and expect it to throw an error
      await expect(authService.forgotPassword(email)).rejects.toThrow(
        errorMessage[0]
      );
      await expect(
        authService.resetPassword({ token, password, confirmPassword })
      ).rejects.toThrow(errorMessage[1]);
      await expect(
        authService.changePassword({ oldPassword, password, confirmPassword })
      ).rejects.toThrow(errorMessage[2]);

      // Check if axios.post was called with the correct parameters
      expect(axios.put).toHaveBeenCalledWith(
        apiUrls.USER_FORGOT_PASSWORD,
        {
          email: email,
        },
        expect.any(Object)
      );
      expect(axios.put).toHaveBeenCalledWith(
        apiUrls.USER_RESET_PASSWORD,
        {
          token: token,
          password: password,
          confirmPassword: confirmPassword,
        },
        expect.any(Object)
      );
      expect(axios.put).toHaveBeenCalledWith(
        apiUrls.USER_CHANGE_PASSWORD,
        {
          oldPassword: oldPassword,
          password: password,
          confirmPassword: confirmPassword,
        },
        expect.any(Object)
      );
    });
  });
});
