import buyerApplicationService from "@services/application/buyerApplicationService";
import {
  CreateBuyerInformationForBuyerApplication,
  GetBuyerInfoResponse,
} from "src/types";
import convertDate from "@utils/lib/convertDate";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import debounce from "just-debounce-it";

const initialData: GetBuyerInfoResponse = {
  id: "",
  companyName: "",
  dateEstablished: "",
  phoneNumber: "",
  registrationNumbers: "",
  employeeCount: null,
  taxAndRevenue: {
    lastFiscalYear: 0,
    totalRevenue: "",
    exportRevenuePercentage: "",
  },
  address: {
    city: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
  },
};

/**
 * @description Validation schema for buyer information
 */

const schemaValidation = Yup.object().shape({
  phoneNumber: Yup.string().required("Phone number is required"),

  registrationNumbers: Yup.string().required(
    "Registration numbers are required"
  ),

  address: Yup.object().shape({
    city: Yup.string().required("City is required"),

    addressLine1: Yup.string().required("Address line 1 is required"),

    addressLine2: Yup.string().required("Address line 2 is required"),

    postalCode: Yup.string().required("Postal code is required"),
  }),
});

const useBuyerInformationForm = (applicationID: string) => {
  const [updateMode, setUpdateMode] = useState(false);

  /**
   * @description fetch initial form data from the backend
   * if data exists in backend switch to update mode or
   * else return default data to the form and switch to create mode
   */
  const getInitialData = async () => {
    console.log("applicationID", applicationID);

    try {
      // Attempt to fetch buyer info from the backend
      const response = await buyerApplicationService.getBuyerInfo(
        applicationID as string
      );
      console.log("response", response);
      if (response && response.address.city) {
        //switching to update mode
        setUpdateMode(true);
      }

      // restructuring the response data to match form schema for react hook forms to function properly
      const responseData: GetBuyerInfoResponse = {
        id: response.id,
        companyName: response.companyName,
        dateEstablished: convertDate(response.dateEstablished),
        employeeCount: response.employeeCount ?? 0,
        phoneNumber: response.phoneNumber,
        registrationNumbers: response.registrationNumbers,
        taxAndRevenue: {
          lastFiscalYear: response.taxAndRevenue.lastFiscalYear,
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
      };

      // If successful, use the fetched data for the form
      return responseData;
    } catch (error) {
      return initialData; // or return some default data
    }
  };

  // function to auto save data to backend
  const saveChangeToDatabase = async (
    args: CreateBuyerInformationForBuyerApplication
  ) => {
    console.count("payload for patch:" + JSON.stringify(args));
    //check for update mode, if on create mode call the hpost api else call the patch api
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
    } else {
      const updateBuyerInfo = buyerApplicationService.updateBuyerInfo(
        applicationID as string,
        args
      );
      toast.promise(updateBuyerInfo, {
        loading: "Loading...",
        success: (data) => {
          return `buyer information updated`;
        },
        error: (err) => {
          return `${err}`;
        },
      });
    }
  };

  // react query utlity functions
  const queryResult = useQuery({
    queryKey: ["importerInfo"],
    queryFn: getInitialData,
  });
  const { mutateAsync } = useMutation({
    mutationFn: saveChangeToDatabase,
  });

  /* debounce function to prevent too many api calls to the backend, 
  current rate of call is 1 call per 500ms of user interaction
   */
  const handleDebouncedChange = useMemo(
    () =>
      debounce((data: CreateBuyerInformationForBuyerApplication) => {
        console.log(data);
        mutateAsync(data);
      }, 500),
    [mutateAsync]
  );

  // export all the hook utilities to be consumed by the parent form
  return {
    schemaValidation,
    queryResult,
    setUpdateMode,
    handleDebouncedChange,
  };
};

export default useBuyerInformationForm;
