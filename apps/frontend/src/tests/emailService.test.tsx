import emailService from "@services/emailService";
import axios from "axios";
import { IcreateEmailTemplate, IemailTemplate } from "src/types";

jest.mock("axios");

describe("EmailService", () => {
  const emailTemplate: IemailTemplate = {
    title: "string",
    slug: "string",
    sender: "string",
    subject: "string",
    body: "string",
    isDefault: true,
    createdAt: "2023-05-22T14:29:07.655Z",
    updatedAt: "2023-05-22T14:29:07.655Z",
  };
  const emailTemplateId = "1";
  const axiosResponse = {
    data: emailTemplate,
    status: 200,
    statusText: "OK",
    headers: {},
    config: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllEmailTemplates", () => {
    it("should return the email templates when the request is successful", async () => {
      const keywords = "keyword";
      const limit = 10;
      const page = 1;
      (axios.get as jest.Mock).mockResolvedValueOnce(axiosResponse);

      const result = await emailService.getAllEmailTemplates(
        keywords,
        limit,
        page
      );

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(`${keywords}&limit=${limit}&page=${page}`),
        expect.any(Object)
      );
      expect(result).toEqual(emailTemplate);
    });

    it("should throw an error when the request fails", async () => {
      const keywords = "keyword";
      const limit = 10;
      const page = 1;
      const errorMessage = "Failed to fetch email templates.";
      (axios.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        emailService.getAllEmailTemplates(keywords, limit, page)
      ).rejects.toThrowError(errorMessage);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(`${keywords}&limit=${limit}&page=${page}`),
        expect.any(Object)
      );
    });
  });

  describe("getEmailTemplateById", () => {
    it("should return the email template when the request is successful", async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce(axiosResponse);

      const result = await emailService.getEmailTemplateById(emailTemplateId);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(emailTemplateId),
        expect.any(Object)
      );
      expect(result).toEqual(emailTemplate);
    });

    it("should throw an error when the request fails", async () => {
      const errorMessage = "Failed to Fetch Email template by ID.";
      (axios.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        emailService.getEmailTemplateById(emailTemplateId)
      ).rejects.toThrowError(errorMessage);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(emailTemplateId),
        expect.any(Object)
      );
    });
  });

  describe("createEmailTemplate", () => {
    it("should return the created email template when the request is successful", async () => {
      const expectedData = {
        title: "string",
        slug: "string",
        sender: "string",
        subject: "string",
        body: "string",
        isDefault: true,
        createdAt: "2023-05-22T14:29:07.655Z",
        updatedAt: "2023-05-22T14:29:07.655Z",
      };
      const responseMock = { data: expectedData, status: 201 };
      const createTemplateInfo: IcreateEmailTemplate = {
        title: "string",
        sender: "string",
        subject: "string",
        body: "string",
        isDefault: true,
      };
      (axios.post as jest.Mock).mockResolvedValueOnce(responseMock);

      const result = await emailService.createEmailTemplate(createTemplateInfo);

      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify(createTemplateInfo),
        expect.any(Object)
      );
      expect(result).toEqual(emailTemplate);
    });

    it("should throw an error when the request fails", async () => {
      const createTemplateInfo: IcreateEmailTemplate = {
        title: "string",
        sender: "string",
        subject: "string",
        body: "string",
        isDefault: true,
      };
      const errorMessage = "Failed to create Email template.";
      (axios.post as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        emailService.createEmailTemplate(createTemplateInfo)
      ).rejects.toThrowError(errorMessage);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify(createTemplateInfo),
        expect.any(Object)
      );
    });
  });

  describe("deleteEmailTemplate", () => {
    it("should successfully delete the email template when the request is successful", async () => {
      (axios.delete as jest.Mock).mockResolvedValueOnce({ status: 204 });

      await emailService.deleteEmailTemplate(emailTemplateId);

      expect(axios.delete).toHaveBeenCalledTimes(1);
      expect(axios.delete).toHaveBeenCalledWith(
        expect.stringContaining(emailTemplateId),
        expect.any(Object)
      );
    });

    it("should throw an error when the request fails", async () => {
      const errorMessage = "Failed to delete Email template.";
      (axios.delete as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage)
      );

      await expect(
        emailService.deleteEmailTemplate(emailTemplateId)
      ).rejects.toThrowError(errorMessage);
      expect(axios.delete).toHaveBeenCalledTimes(1);
      expect(axios.delete).toHaveBeenCalledWith(
        expect.stringContaining(emailTemplateId),
        expect.any(Object)
      );
    });
  });

  describe("updateEmailTemplate", () => {
    it("should return the updated email template when the request is successful", async () => {
      const updateTemplateInfo: IcreateEmailTemplate = {
        title: "string",
        sender: "string",
        subject: "string",
        body: "string",
        isDefault: true,
      };
      (axios.patch as jest.Mock).mockResolvedValueOnce(axiosResponse);

      const result = await emailService.updateEmailTemplate(
        emailTemplateId,
        updateTemplateInfo
      );

      expect(axios.patch).toHaveBeenCalledTimes(1);
      expect(axios.patch).toHaveBeenCalledWith(
        expect.stringContaining(emailTemplateId),
        JSON.stringify(updateTemplateInfo),
        expect.any(Object)
      );
      expect(result).toEqual(emailTemplate);
    });

    it("should throw an error when the request fails", async () => {
      const updateTemplateInfo: IcreateEmailTemplate = {
        title: "string",
        sender: "string",
        subject: "string",
        body: "string",
        isDefault: true,
      };
      const errorMessage = "Failed to update email template";
      (axios.patch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        emailService.updateEmailTemplate(emailTemplateId, updateTemplateInfo)
      ).rejects.toThrowError(errorMessage);
      expect(axios.patch).toHaveBeenCalledTimes(1);
      expect(axios.patch).toHaveBeenCalledWith(
        expect.stringContaining(emailTemplateId),
        JSON.stringify(updateTemplateInfo),
        expect.any(Object)
      );
    });
  });
});
