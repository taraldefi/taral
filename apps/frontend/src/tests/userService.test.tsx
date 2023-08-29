import axios from "axios";
import userService from "@services/userService";
import { IcreateUser, IupdateUser } from "src/types";
import apiUrls from "@config/apiUrls";
import getAxiosConfig from "@config/axiosConfig";

jest.mock("axios");

describe("UserService", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAllUsers", () => {
    it("should fetch all users successfully", async () => {
      const expectedData = {
        message: "OK",
      };
      const responseMock = { data: expectedData, status: 200 };
      (axios.get as jest.Mock).mockResolvedValueOnce(responseMock);

      const keywords = "example";
      const limit = 10;
      const page = 1;

      const result = await userService.getAllUsers(keywords, limit, page);
      const axiosConfig = getAxiosConfig({ method: "GET" });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(
          `keywords=${keywords}&limit=${limit}&page=${page}`
        ),
        axiosConfig
      );
      expect(result).toEqual(expectedData);
    });

    it("should handle error during fetch", async () => {
      const errorMessage = "Failed to fetch users.";
      const errorMock = new Error(errorMessage);
      (axios.get as jest.Mock).mockRejectedValueOnce(errorMock);

      const keywords = "example";
      const limit = 10;
      const page = 1;

      await expect(
        userService.getAllUsers(keywords, limit, page)
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe("createUser", () => {
    it("should create a user successfully", async () => {
      const expectedData = {
        /* expected response data */
      };
      const responseMock = { data: expectedData, status: 201 };
      (axios.post as jest.Mock).mockResolvedValueOnce(responseMock);

      const userInfo: IcreateUser = {
        status: "active",
        roleId: 0,
        username: "testUser",
        email: "test@123.com",
        name: "user",
      };

      const result = await userService.createUser(userInfo);

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining(apiUrls.USER),
        expect.any(String),
        expect.any(Object)
      );
      expect(result).toEqual(expectedData);
    });

    it("should handle error during user creation", async () => {
      const errorMessage = "Failed to create user.";
      const errorMock = new Error(errorMessage);
      (axios.post as jest.Mock).mockRejectedValueOnce(errorMock);

      const userInfo: IcreateUser = {
        status: "active",
        roleId: 0,
        username: "testUser",
        email: "test@123.com",
        name: "user",
      };

      await expect(userService.createUser(userInfo)).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe("getUserById", () => {
    it("should fetch a user by ID successfully", async () => {
      const expectedData = {
        /* expected response data */
      };
      const responseMock = { data: expectedData, status: 200 };
      (axios.get as jest.Mock).mockResolvedValueOnce(responseMock);

      const id = "12345";

      const result = await userService.getUserById(id);
      const axiosConfig = getAxiosConfig({ method: "GET" });
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(`${apiUrls.USER}/${id}`),
        axiosConfig
      );
      expect(result).toEqual(expectedData);
    });

    it("should handle error during fetch by ID", async () => {
      const errorMessage = "Failed to fetch user by ID.";
      const errorMock = new Error(errorMessage);
      (axios.get as jest.Mock).mockRejectedValueOnce(errorMock);

      const id = "12345";

      await expect(userService.getUserById(id)).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe("updateUser", () => {
    it("should update a user by ID successfully", async () => {
      const expectedData = {
        /* expected response data */
      };
      const responseMock = { data: expectedData, status: 200 };
      (axios.put as jest.Mock).mockResolvedValueOnce(responseMock);

      const id = "12345";
      const userInfo: IupdateUser = {
        username: "test",
        email: "test",
        name: "test",
        address: "test",
        contact: "test",
        status: "active",
        roleId: 0,
      };

      const result = await userService.updateUser(id, userInfo);
      const axiosConfig = getAxiosConfig({ method: "PUT" });
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining(`${apiUrls.USER}/${id}`),
        JSON.stringify(userInfo),
        axiosConfig
      );
      expect(result).toEqual(expectedData);
    });

    it("should handle error during user update by ID", async () => {
      const errorMessage = "Failed to update user by ID.";
      const errorMock = new Error(errorMessage);
      (axios.put as jest.Mock).mockRejectedValueOnce(errorMock);

      const id = "12345";
      const userInfo: IupdateUser = {
        username: "test",
        email: "test",
        name: "test",
        address: "test",
        contact: "test",
        status: "active",
        roleId: 0,
      };

      await expect(userService.updateUser(id, userInfo)).rejects.toThrowError(
        errorMessage
      );
    });
  });
});
