import apiUrls from "@config/apiUrls";
import getAxiosConfig from "@config/axiosConfig";
import permissionService from "@services/permissionService";
import axios from "axios";

jest.mock("axios");

describe("Permission Service", () => {
  const mockAxiosConfigGET = getAxiosConfig({ method: "GET" });
  //const mockAxiosConfigPOST = getAxiosConfig({ method: "POST" });
  const mockAxiosConfigPATCH = getAxiosConfig({ method: "PATCH" });
  const mockAxiosConfigDELETE = getAxiosConfig({ method: "DELETE" });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllPermissions", () => {
    it("should fetch all permissions successfully", async () => {
      const mockResponse = {
        status: 200,
        data: [
          // Provide mock permission data
        ],
        // Provide other response properties as needed
      };

      (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await permissionService.getAllPermissions(
        "keywords",
        10,
        1
      );

      expect(result).toEqual(mockResponse.data);
      expect(axios.get).toHaveBeenCalledWith(
        `${apiUrls.PERMISSIONS}?keywords=keywords&limit=10&page=1`,
        mockAxiosConfigGET
      );
    });

    it("should throw an error when fetching permissions fails", async () => {
      const mockErrorResponse = {
        response: {
          status: 500,
          data: {
            // Provide mock error response data
          },
        },
      };

      (axios.get as jest.Mock).mockRejectedValueOnce(mockErrorResponse);

      await expect(
        permissionService.getAllPermissions("keywords", 10, 1)
      ).rejects.toThrow("Failed to fetch Permissions.");
      expect(axios.get).toHaveBeenCalledWith(
        `${apiUrls.PERMISSIONS}?keywords=keywords&limit=10&page=1`,
        mockAxiosConfigGET
      );
    });
  });

  describe("getPermissionById", () => {
    it("should fetch a permission by ID successfully", async () => {
      const permissionId = "123";
      const mockResponse = {
        status: 200,
        data: {
          // Provide mock permission data
        },
        // Provide other response properties as needed
      };

      (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await permissionService.getPermissionById(permissionId);

      expect(result).toEqual(mockResponse.data);
      expect(axios.get).toHaveBeenCalledWith(
        `${apiUrls.PERMISSIONS}/${permissionId}`,
        mockAxiosConfigGET
      );
    });

    it("should throw an error when fetching a permission by ID fails", async () => {
      const permissionId = "123";
      const mockErrorResponse = {
        response: {
          status: 500,
          data: {
            // Provide mock error response data
          },
        },
      };

      (axios.get as jest.Mock).mockRejectedValueOnce(mockErrorResponse);

      await expect(
        permissionService.getPermissionById(permissionId)
      ).rejects.toThrow("Failed to Fetch Permission by ID.");
      expect(axios.get).toHaveBeenCalledWith(
        `${apiUrls.PERMISSIONS}/${permissionId}`,
        mockAxiosConfigGET
      );
    });
  });

  // describe("createPermission", () => {
  //   it("should create a permission successfully", async () => {
  //     const mockPermissionInfo = {
  //       resource: "string",
  //       description: "string",
  //       path: "string",
  //       method: "get",
  //     };

  //     const mockResponse = {
  //       status: 201,
  //       data: {
  //         // Provide mock created permission data
  //       },
  //       // Provide other response properties as needed
  //     };

  //     (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

  //     const result = await permissionService.createPermission(
  //       mockPermissionInfo
  //     );

  //     expect(result).toEqual(mockResponse.data);
  //     expect(axios.post).toHaveBeenCalledWith(
  //       apiUrls.PERMISSIONS,
  //       JSON.stringify(mockPermissionInfo),
  //       mockAxiosConfigPOST
  //     );
  //   });

  //   it("should throw an error when creating a permission fails", async () => {
  //     const mockPermissionInfo = {
  //       resource: "string",
  //       description: "string",
  //       path: "string",
  //       method: "get",
  //     };

  //     const mockErrorResponse = {
  //       response: {
  //         status: 500,
  //         data: {
  //           // Provide mock error response data
  //         },
  //       },
  //     };

  //     (axios.post as jest.Mock).mockRejectedValueOnce(mockErrorResponse);

  //     await expect(
  //       permissionService.createPermission(mockPermissionInfo)
  //     ).rejects.toThrow("Failed to create Permission.");
  //     expect(axios.post).toHaveBeenCalledWith(
  //       apiUrls.PERMISSIONS,
  //       JSON.stringify(mockPermissionInfo),
  //       mockAxiosConfigPOST
  //     );
  //   });
  // });

  describe("deletePermission", () => {
    it("should delete a permission successfully", async () => {
      const permissionId = "123";

      const mockResponse = {
        status: 204,
        // Provide other response properties as needed
      };

      (axios.delete as jest.Mock).mockResolvedValueOnce(mockResponse);

      await permissionService.deletePermission(permissionId);

      expect(axios.delete).toHaveBeenCalledWith(
        `${apiUrls.PERMISSIONS}/${permissionId}`,
        mockAxiosConfigDELETE
      );
    });

    it("should throw an error when deleting a permission fails", async () => {
      const permissionId = "123";

      const mockErrorResponse = {
        response: {
          status: 500,
          data: {
            // Provide mock error response data
          },
        },
      };

      (axios.delete as jest.Mock).mockRejectedValueOnce(mockErrorResponse);

      await expect(
        permissionService.deletePermission(permissionId)
      ).rejects.toThrow("Failed to delete Permission.");
      expect(axios.delete).toHaveBeenCalledWith(
        `${apiUrls.PERMISSIONS}/${permissionId}`,
        mockAxiosConfigDELETE
      );
    });
  });

  describe("updatePermission", () => {
    it("should update a permission successfully", async () => {
      const permissionId = "123";
      const mockPermissionInfo = {
        resource: "string",
        description: "string",
        path: "string",
        method: "get",
      };

      const mockResponse = {
        status: 200,
        data: {
          // Provide mock updated permission data
        },
        // Provide other response properties as needed
      };

      (axios.patch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await permissionService.updatePermission(
        permissionId,
        mockPermissionInfo
      );

      expect(result).toEqual(mockResponse.data);
      expect(axios.patch).toHaveBeenCalledWith(
        `${apiUrls.PERMISSIONS}/${permissionId}`,
        JSON.stringify(mockPermissionInfo),
        mockAxiosConfigPATCH
      );
    });

    it("should throw an error when updating a permission fails", async () => {
      const permissionId = "123";
      const mockPermissionInfo = {
        resource: "string",
        description: "string",
        path: "string",
        method: "get",
      };

      const mockErrorResponse = {
        response: {
          status: 500,
          data: {
            // Provide mock error response data
          },
        },
      };

      (axios.patch as jest.Mock).mockRejectedValueOnce(mockErrorResponse);

      await expect(
        permissionService.updatePermission(permissionId, mockPermissionInfo)
      ).rejects.toThrow("Failed to update Permission.");
      expect(axios.patch).toHaveBeenCalledWith(
        `${apiUrls.PERMISSIONS}/${permissionId}`,
        JSON.stringify(mockPermissionInfo),
        mockAxiosConfigPATCH
      );
    });
  });
});
