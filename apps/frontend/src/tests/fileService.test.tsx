import apiUrls from "@config/apiUrls";
import getAxiosConfig from "@config/axiosConfig";
import fileService from "@services/fileService";
import axios from "axios";

jest.mock("axios");

describe("FileService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createFile", () => {
    it("should create a file successfully", async () => {
      const mockFile = new File(["file content"], "filename");
      const axiosConfig = getAxiosConfig({
        method: "POST",
        contentType: "multipart/ form-data",
      });
      const mockResponse = {
        status: 201,
        data: [
          // Provide mock file response data
        ],
        // Provide other response properties as needed
      };

      (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await fileService.createFile(mockFile);

      expect(result).toEqual(mockResponse.data);
      expect(axios.post).toHaveBeenCalledWith(
        `${apiUrls.CREATE_FILE}`,
        { file: mockFile },
        axiosConfig
      );
    });

    it("should throw an error when creating a file fails", async () => {
      const mockFile = new File(["file content"], "filename");
      const axiosConfig = getAxiosConfig({
        method: "POST",
        contentType: "multipart/ form-data",
      });
      const mockErrorResponse = {
        response: {
          status: 500,
          data: {
            // Provide mock error response data
          },
        },
      };

      (axios.post as jest.Mock).mockRejectedValueOnce(mockErrorResponse);

      await expect(fileService.createFile(mockFile)).rejects.toThrow(
        "Failed to create File."
      );
      expect(axios.post).toHaveBeenCalledWith(
        `${apiUrls.CREATE_FILE}`,
        { file: mockFile },
        axiosConfig
      );
    });
  });

  describe("updateFile", () => {
    it("should update a file successfully", async () => {
      const axiosConfig = getAxiosConfig({
        method: "POST",
        contentType: "multipart/ form-data",
      });
      const mockFile = new File(["file content"], "filename");
      const externalId = 123;

      const mockResponse = {
        status: 201,
        data: {
          // Provide mock updated file data
        },
        // Provide other response properties as needed
      };

      (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await fileService.updateFile(mockFile, externalId);

      expect(result).toEqual(mockResponse.data);
      expect(axios.post).toHaveBeenCalledWith(
        `${apiUrls.UPDATE_FILE}`,
        { file: mockFile, externalId: externalId },
        axiosConfig
      );
    });

    it("should throw an error when updating a file fails", async () => {
      const mockFile = new File(["file content"], "filename");
      const externalId = 123;
      const axiosConfig = getAxiosConfig({
        method: "POST",
        contentType: "multipart/ form-data",
      });
      const mockErrorResponse = {
        response: {
          status: 500,
          data: {
            // Provide mock error response data
          },
        },
      };

      (axios.post as jest.Mock).mockRejectedValueOnce(mockErrorResponse);

      await expect(
        fileService.updateFile(mockFile, externalId)
      ).rejects.toThrow("Failed to update File.");
      expect(axios.post).toHaveBeenCalledWith(
        `${apiUrls.UPDATE_FILE}`,
        { file: mockFile, externalId: externalId },
        axiosConfig
      );
    });
  });

  describe("requestFile", () => {
    it("should request a file successfully", async () => {
      const externalId = 123;
      const axiosConfig = getAxiosConfig({ method: "POST" });
      const mockResponse = {
        status: 201,
        data: {
          // Provide mock file data
        },
        // Provide other response properties as needed
      };

      (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await fileService.requestFile(externalId);

      expect(result).toEqual(mockResponse.data);
      expect(axios.post).toHaveBeenCalledWith(
        `${apiUrls.REQUEST_FILE}`,
        { externalId: externalId },
        axiosConfig
      );
    });

    it("should throw an error when requesting a file fails", async () => {
      const externalId = 123;
      const axiosConfig = getAxiosConfig({ method: "POST" });
      const mockErrorResponse = {
        response: {
          status: 500,
          data: {
            // Provide mock error response data
          },
        },
      };

      (axios.post as jest.Mock).mockRejectedValueOnce(mockErrorResponse);

      await expect(fileService.requestFile(externalId)).rejects.toThrow(
        "Failed to request File."
      );
      expect(axios.post).toHaveBeenCalledWith(
        `${apiUrls.REQUEST_FILE}`,
        { externalId: externalId },
        axiosConfig
      );
    });
  });
});
