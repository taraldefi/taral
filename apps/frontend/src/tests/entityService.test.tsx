import apiUrls from "@config/apiUrls";
import axios from "axios";
import entityService from "@services/entityService";
import { Entity } from "src/types";

// Use Jest to mock axios and CoreUtils modules
jest.mock("axios");

describe("EntityService", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });
  it("should be able fetch an entity by ID", async () => {
    const mockResponse = {
      statusCode: 200,
      data: {
        id: "05159674-06ea-4bc2-b750-603b0f454025",
        logo: "05159674-06ea-4bc2-b750-603b0f454025.png",
        name: "Engelbrecht Ltd",
        beneficialOwner: "John Smith",
        abbreviation: "55-NB",
        nationality: "German",
        headquaters: "Berlin",
        industryType: "Information Technology",
        coreBusiness: "Software Development",
        incorporationDate: "12-12-2022",
        legalForm: "Limited",
        products: {
          id: "05159674-06ea-4bc2-b750-603b0f454025",
          title: "Product Title",
          issuanceDate: "12-12-2022",
          maturityDate: "12-12-2022",
          amount: 650000,
        },
        applications: {
          id: "05159674-06ea-4bc2-b750-603b0f454025",
          title: "Application Title",
          issuanceDate: "12-12-2022",
        },
      },
    };

    const id = "05159674-06ea-4bc2-b750-603b0f454025";

    (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await entityService.getEntity(id);

    expect(axios.get).toHaveBeenCalledWith(
      `${apiUrls.ENTITY}/${id}`,
      expect.any(Object)
    );

    expect(result).toEqual(mockResponse.data);
  });

  it("should throw an error when fetching entity fails", async () => {
    const mockErrorResponse = {
      response: {
        statusCode: 500,
        data: {
          // Provide mock error response data
        },
      },
    };

    (axios.get as jest.Mock).mockRejectedValueOnce(mockErrorResponse);
    const id = "05159674-06ea-4bc2-b750-603b0f454025";
    await expect(entityService.getEntity(id)).rejects.toThrow(
      "Fetch Entity by ID failed."
    );

    expect(axios.get).toHaveBeenCalledWith(
      `${apiUrls.ENTITY}/${id}`,
      expect.any(Object)
    );
  });

  it("should be able to create an entity", async () => {
    const mockResponse = {
      statusCode: 201,
      data: {
        id: "05159674-06ea-4bc2-b750-603b0f454025",
        logo: "05159674-06ea-4bc2-b750-603b0f454025.png",
        name: "Engelbrecht Ltd",
        beneficialOwner: "John Smith",
        abbreviation: "55-NB",
        nationality: "German",
        headquaters: "Berlin",
        industryType: "Information Technology",
        coreBusiness: "Software Development",
        incorporationDate: "12-12-2022",
        legalForm: "Limited",
      },
    };

    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);
    // provide test data
    const requestBody: Entity = {
      logo: "05159674-06ea-4bc2-b750-603b0f454025.png",
      name: "Engelbrecht Ltd",
      beneficialOwner: "John Smith",
      abbreviation: "55-NB",
      nationality: "German",
      headquarters: "Berlin",
      industryType: "Information Technology",
      coreBusiness: "Software Development",
      incorporationDate: "12-12-2022",
      legalForm: "Limited",
    };

    const result = await entityService.createEntity(requestBody);
    expect(axios.post).toHaveBeenCalledWith(
      `${apiUrls.ENTITY}`,
      JSON.stringify(requestBody),
      expect.any(Object)
    );
    expect(result).toEqual(mockResponse.data);
  });

  it("should throw an error when creating entity fails", async () => {
    const mockErrorResponse = {
      response: {
        statusCode: 500,
        data: {
          // Provide mock error response data
        },
      },
    };

    const requestBody: Entity = {
      logo: "05159674-06ea-4bc2-b750-603b0f454025.png",
      name: "Engelbrecht Ltd",
      beneficialOwner: "John Smith",
      abbreviation: "55-NB",
      nationality: "German",
      headquarters: "Berlin",
      industryType: "Information Technology",
      coreBusiness: "Software Development",
      incorporationDate: "12-12-2022",
      legalForm: "Limited",
    };

    (axios.post as jest.Mock).mockRejectedValueOnce(mockErrorResponse);
    await expect(entityService.createEntity(requestBody)).rejects.toThrow(
      "Creating entity failed."
    );

    expect(axios.post).toHaveBeenCalledWith(
      apiUrls.ENTITY,
      JSON.stringify(requestBody),
      expect.any(Object)
    );
  });

  it("should be able update an entity by ID", async () => {
    const mockResponse = {
      statusCode: 200,
      data: {
        id: "05159674-06ea-4bc2-b750-603b0f454025",
        logo: "05159674-06ea-4bc2-b750-603b0f454025.png",
        name: "Engelbrecht Ltd",
        beneficialOwner: "John Smith",
        abbreviation: "55-NB",
        nationality: "German",
        headquaters: "Berlin",
        industryType: "Information Technology",
        coreBusiness: "Software Development",
        incorporationDate: "12-12-2022",
        legalForm: "Limited",
        products: {
          id: "05159674-06ea-4bc2-b750-603b0f454025",
          title: "Product Title",
          issuanceDate: "12-12-2022",
          maturityDate: "12-12-2022",
          amount: 650000,
        },
        applications: {
          id: "05159674-06ea-4bc2-b750-603b0f454025",
          title: "Application Title",
          issuanceDate: "12-12-2022",
        },
      },
    };

    const id = "05159674-06ea-4bc2-b750-603b0f454025";
    const requestBody: Entity = {
      logo: "05159674-06ea-4bc2-b750-603b0f454025.png",
      name: "Engelbrecht Ltd",
      beneficialOwner: "John Smith",
      abbreviation: "55-NB",
      nationality: "German",
      headquarters: "Berlin",
      industryType: "Mechanical",
      coreBusiness: "Software Development",
      incorporationDate: "12-12-2022",
      legalForm: "Limited",
    };

    (axios.patch as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await entityService.updateEntity(id, requestBody);

    expect(axios.patch).toHaveBeenCalledWith(
      `${apiUrls.ENTITY}/${id}`,
      JSON.stringify(requestBody),
      expect.any(Object)
    );

    expect(result).toEqual(mockResponse.data);
  });

  it("should throw an error when updating entity fails", async () => {
    const mockErrorResponse = {
      response: {
        statusCode: 500,
        data: {
          // Provide mock error response data
        },
      },
    };
    const id = "05159674-06ea-4bc2-b750-603b0f454025";
    const requestBody: Entity = {
      logo: "05159674-06ea-4bc2-b750-603b0f454025.png",
      name: "Engelbrecht Ltd",
      beneficialOwner: "John Smith",
      abbreviation: "55-NB",
      nationality: "German",
      headquarters: "Berlin",
      industryType: "Information Technology",
      coreBusiness: "Software Development",
      incorporationDate: "12-12-2022",
      legalForm: "Limited",
    };

    (axios.patch as jest.Mock).mockRejectedValueOnce(mockErrorResponse);

    await expect(entityService.updateEntity(id, requestBody)).rejects.toThrow(
      "Updating entity failed."
    );

    expect(axios.patch).toHaveBeenCalledWith(
      `${apiUrls.ENTITY}/${id}`,
      JSON.stringify(requestBody),
      expect.any(Object)
    );
  });

  it("should be able delete an entity by ID", async () => {
    const mockResponse = {
      statusCode: 200,
      data: {
        message: "OK",
      },
    };

    const id = "05159674-06ea-4bc2-b750-603b0f454025";

    (axios.delete as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await entityService.deleteEntity(id);

    expect(axios.delete).toHaveBeenCalledWith(
      `${apiUrls.ENTITY}/${id}`,
      expect.any(Object)
    );

    expect(result).toEqual(mockResponse.data);
  });

  it("should throw an error when deleting entity fails", async () => {
    const mockErrorResponse = {
      response: {
        statusCode: 500,
        data: {
          // Provide mock error response data
        },
      },
    };
    const id = "05159674-06ea-4bc2-b750-603b0f454025";

    (axios.delete as jest.Mock).mockRejectedValueOnce(mockErrorResponse);

    await expect(entityService.deleteEntity(id)).rejects.toThrow(
      "Deleting Entity failed."
    );

    expect(axios.delete).toHaveBeenCalledWith(
      `${apiUrls.ENTITY}/${id}`,
      expect.any(Object)
    );
  });
});
