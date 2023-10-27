import buyerApplicationService from "@services/application/buyerApplicationService";
import { CreateBuyerInformationForBuyerApplication } from "src/types";
import convertDate from "@utils/lib/convertDate";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import debounce from "just-debounce-it";

const useBuyerInformationForm = (applicationID: string) => {
  const [updateMode, setUpdateMode] = useState(false);
  const schemaValidation = Yup.object().shape({
    company: Yup.object().shape({
      companyName: Yup.string().required("Company name is required"),

      dateEstablished: Yup.string().required("Establishment date is required"),

      phoneNumber: Yup.string().required("Phone number is required"),

      registrationNumbers: Yup.string().required(
        "Registration numbers are required"
      ),

      taxAndRevenue: Yup.object().shape({
        lastFiscalYear: Yup.string().required("Last fiscal year is required"),

        totalRevenue: Yup.string().required("Total revenue is required"),

        exportRevenuePercentage: Yup.string()
          .required("Export revenue percentage is required")
          .min(0, "Export revenue percentage must be at least 0")
          .max(100, "Export revenue percentage cannot exceed 100"),
      }),

      address: Yup.object().shape({
        city: Yup.string().required("City is required"),

        addressLine1: Yup.string().required("Address line 1 is required"),

        addressLine2: Yup.string().required("Address line 2 is required"),

        postalCode: Yup.string().required("Postal code is required"),
      }),
    }),
  });
  const getInitialData = async () => {
    console.log("applicationID", applicationID);
    const initialData: CreateBuyerInformationForBuyerApplication = {
      company: {
        companyName: "",
        dateEstablished: "",
        phoneNumber: "",
        registrationNumbers: "",
        taxAndRevenue: {
          lastFiscalYear: "",
          totalRevenue: "",
          exportRevenuePercentage: "",
        },
        address: {
          city: "",
          addressLine1: "",
          addressLine2: "",
          postalCode: "",
        },
      },
    };

    try {
      // Attempt to fetch buyer info from the backend
      const response = await buyerApplicationService.getBuyerInfo(
        applicationID as string
      );
      if (response && response.id) {
        setUpdateMode(true);
      }
      const responseData: CreateBuyerInformationForBuyerApplication = {
        company: {
          companyName: response.companyName,
          dateEstablished: convertDate(response.dateEstablished),
          phoneNumber: response.phoneNumber,
          registrationNumbers: response.registrationNumbers,
          taxAndRevenue: {
            lastFiscalYear: convertDate(response.taxAndRevenue.lastFiscalYear),
            totalRevenue: response.taxAndRevenue.totalRevenue,
            exportRevenuePercentage:
              response.taxAndRevenue.exportRevenuePercentage,
          },
          address: {
            city: response.address.city,
            addressLine1: response.address.addressLine1,
            addressLine2: response.address.addressLine2,
            postalCode: response.address.postalCode,
          },
        },
      };

      // If successful, use the fetched data for the form
      return responseData;
    } catch (error) {
      return initialData; // or return some default data if needed
    }
  };

  const saveChangeToDatabase = async (
    args: CreateBuyerInformationForBuyerApplication
  ) => {
    console.count("payload for patch:" + JSON.stringify(args));
    if (!updateMode) {
      const createBuyerInfo = buyerApplicationService.createBuyerInfo(
        applicationID as string,
        args
      );
      toast.promise(createBuyerInfo, {
        loading: "Loading...",
        success: (data) => {
          setUpdateMode(true);
          return `buyer information created`;
        },
        error: (err) => {
          return `${err}`;
        },
      });
      const response = await createBuyerInfo;
      const responseData: CreateBuyerInformationForBuyerApplication = {
        company: {
          companyName: response.companyName,
          dateEstablished: convertDate(response.dateEstablished),
          phoneNumber: response.phoneNumber,
          registrationNumbers: response.registrationNumbers,
          taxAndRevenue: {
            lastFiscalYear: convertDate(response.taxAndRevenue.lastFiscalYear),
            totalRevenue: response.taxAndRevenue.totalRevenue,
            exportRevenuePercentage:
              response.taxAndRevenue.exportRevenuePercentage,
          },
          address: {
            city: response.address.city,
            addressLine1: response.address.addressLine1,
            addressLine2: response.address.addressLine2,
            postalCode: response.address.postalCode,
          },
        },
      };
      return responseData;
    } else {
      const createBuyerInfo = buyerApplicationService.updateBuyerInfo(
        applicationID as string,
        args
      );
      toast.promise(createBuyerInfo, {
        loading: "Loading...",
        success: (data) => {
          return `buyer information updated`;
        },
        error: (err) => {
          return `${err}`;
        },
      });
      const response = await createBuyerInfo;
      const responseData: CreateBuyerInformationForBuyerApplication = {
        company: {
          companyName: response.companyName,
          dateEstablished: convertDate(response.dateEstablished),
          phoneNumber: response.phoneNumber,
          registrationNumbers: response.registrationNumbers,
          taxAndRevenue: {
            lastFiscalYear: convertDate(response.taxAndRevenue.lastFiscalYear),
            totalRevenue: response.taxAndRevenue.totalRevenue,
            exportRevenuePercentage:
              response.taxAndRevenue.exportRevenuePercentage,
          },
          address: {
            city: response.address.city,
            addressLine1: response.address.addressLine1,
            addressLine2: response.address.addressLine2,
            postalCode: response.address.postalCode,
          },
        },
      };

      return responseData;
    }
  };
  const queryResult = useQuery(["importerInfo"], getInitialData);
  const mutationResult = useMutation(saveChangeToDatabase, {
    onSuccess: (dataTosave: CreateBuyerInformationForBuyerApplication) => {
      console.count("success mutating: " + JSON.stringify(dataTosave));
    },
  });
  const { mutateAsync } = mutationResult;
  const handleDebouncedChange = useMemo(
    () =>
      debounce((data: CreateBuyerInformationForBuyerApplication) => {
        console.log(data);
        mutateAsync(data);
      }, 500),
    [mutateAsync]
  );

  return {
    updateMode,
    getInitialData,
    saveChangeToDatabase,
    schemaValidation,
    queryResult,
    mutationResult,
    handleDebouncedChange,
  };
};

export default useBuyerInformationForm;
