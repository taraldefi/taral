import apiUrls from "@config/apiUrls";
import getAxiosConfig from "@config/axiosConfig";
import roleService from "@services/roleService";
import axios from "axios";

jest.mock("axios");

describe("Role Service", () => {
  const mockAxiosConfigGET = getAxiosConfig("GET");
  const mockAxiosConfigPOST = getAxiosConfig("POST");
  const mockAxiosConfigPATCH = getAxiosConfig("PATCH");
  const mockAxiosConfigDELETE = getAxiosConfig("DELETE");

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllRoles", () => {
    it("should fetch all roles successfully", async () => {
      const mockResponse = {
        statusCode: 200,
        data: [
          // Provide mock role data
        ],
        // Provide other response properties as needed
      };

      (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await roleService.getAllRoles("keywords", 10, 1);

      expect(result).toEqual(mockResponse.data);
      expect(axios.get).toHaveBeenCalledWith(
        `${apiUrls.ROLES}?keywords=keywords&limit=10&page=1`,
        mockAxiosConfigGET
      );
    });

    it("should throw an error when fetching roles fails", async () => {
      const mockErrorResponse = {
        response: {
          statusCode: 500,
          data: {
            // Provide mock error response data
          },
        },
      };

      (axios.get as jest.Mock).mockRejectedValueOnce(mockErrorResponse);

      await expect(roleService.getAllRoles("keywords", 10, 1)).rejects.toThrow(
        "Failed to fetch Roles."
      );
      expect(axios.get).toHaveBeenCalledWith(
        `${apiUrls.ROLES}?keywords=keywords&limit=10&page=1`,
        mockAxiosConfigGET
      );
    });
  });

  describe("getRoleById", () => {
    it("should fetch a role by ID successfully", async () => {
      const roleId = "123";
      const mockResponse = {
        statusCode: 200,
        data: {
          // Provide mock role data
        },
        // Provide other response properties as needed
      };

      (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await roleService.getRoleById(roleId);

      expect(result).toEqual(mockResponse.data);
      expect(axios.get).toHaveBeenCalledWith(
        `${apiUrls.ROLES}/${roleId}`,
        mockAxiosConfigGET
      );
    });

    it("should throw an error when fetching a role by ID fails", async () => {
      const roleId = "123";
      const mockErrorResponse = {
        response: {
          statusCode: 500,
          data: {
            // Provide mock error response data
          },
        },
      };

      (axios.get as jest.Mock).mockRejectedValueOnce(mockErrorResponse);

      await expect(roleService.getRoleById(roleId)).rejects.toThrow(
        "Failed to Fetch Role by ID."
      );
      expect(axios.get).toHaveBeenCalledWith(
        `${apiUrls.ROLES}/${roleId}`,
        mockAxiosConfigGET
      );
    });
  });

  describe("createRole", () => {
    it("should create a role successfully", async () => {
      const mockRoleInfo = {
        name: "string",
        description: "string",
        permissions: [0],
      };

      const mockResponse = {
        statusCode: 201,
        data: {
          // Provide mock created permission data
        },
        // Provide other response properties as needed
      };

      (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await roleService.createRole(mockRoleInfo);

      expect(result).toEqual(mockResponse.data);
      expect(axios.post).toHaveBeenCalledWith(
        apiUrls.ROLES,
        JSON.stringify(mockRoleInfo),
        mockAxiosConfigPOST
      );
    });

    it("should throw an error when creating a role fails", async () => {
      const mockRoleInfo = {
        name: "string",
        description: "string",
        permissions: [0],
      };

      const mockErrorResponse = {
        response: {
          statusCode: 500,
          data: {
            // Provide mock error response data
          },
        },
      };

      (axios.post as jest.Mock).mockRejectedValueOnce(mockErrorResponse);

      await expect(roleService.createRole(mockRoleInfo)).rejects.toThrow(
        "Failed to create Role."
      );
      expect(axios.post).toHaveBeenCalledWith(
        apiUrls.ROLES,
        JSON.stringify(mockRoleInfo),
        mockAxiosConfigPOST
      );
    });
  });

  describe("deleteRoles", () => {
    it("should delete a role successfully", async () => {
      const roleId = "123";

      const mockResponse = {
        statusCode: 204,
        // Provide other response properties as needed
      };

      (axios.delete as jest.Mock).mockResolvedValueOnce(mockResponse);

      await roleService.deleteRole(roleId);

      expect(axios.delete).toHaveBeenCalledWith(
        `${apiUrls.ROLES}/${roleId}`,
        mockAxiosConfigDELETE
      );
    });

    it("should throw an error when deleting a role fails", async () => {
      const roleId = "123";

      const mockErrorResponse = {
        response: {
          statusCode: 500,
          data: {
            // Provide mock error response data
          },
        },
      };

      (axios.delete as jest.Mock).mockRejectedValueOnce(mockErrorResponse);

      await expect(roleService.deleteRole(roleId)).rejects.toThrow(
        "Failed to delete Role."
      );
      expect(axios.delete).toHaveBeenCalledWith(
        `${apiUrls.ROLES}/${roleId}`,
        mockAxiosConfigDELETE
      );
    });
  });

  describe("updateRole", () => {
    it("should update a role successfully", async () => {
      const roleId = "123";
      const mockRoleInfo = {
        name: "string",
        description: "string",
        permissions: [0],
      };

      const mockResponse = {
        statusCode: 200,
        data: {
          // Provide mock updated permission data
        },
        // Provide other response properties as needed
      };

      (axios.patch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await roleService.updateRole(roleId, mockRoleInfo);

      expect(result).toEqual(mockResponse.data);
      expect(axios.patch).toHaveBeenCalledWith(
        `${apiUrls.ROLES}/${roleId}`,
        JSON.stringify(mockRoleInfo),
        mockAxiosConfigPATCH
      );
    });

    it("should throw an error when updating a role fails", async () => {
      const roleId = "123";
      const mockRoleInfo = {
        name: "string",
        description: "string",
        permissions: [0],
      };

      const mockErrorResponse = {
        response: {
          statusCode: 500,
          data: {
            // Provide mock error response data
          },
        },
      };

      (axios.patch as jest.Mock).mockRejectedValueOnce(mockErrorResponse);

      await expect(
        roleService.updateRole(roleId, mockRoleInfo)
      ).rejects.toThrow("Failed to update Role.");
      expect(axios.patch).toHaveBeenCalledWith(
        `${apiUrls.ROLES}/${roleId}`,
        JSON.stringify(mockRoleInfo),
        mockAxiosConfigPATCH
      );
    });
  });
});
