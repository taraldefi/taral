import buyerApplicationService from "@services/application/buyerApplicationService";
import { useMutation, useQuery } from "@tanstack/react-query";
import convertDate from "@utils/lib/convertDate";
import debounce from "just-debounce-it";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CreateSupplierInformationForBuyerApplication } from "src/types/supplier_info_for_buyer";
import * as Yup from "yup";

// All functions are similar to buyer information for more details check buyer information
const initialData: CreateSupplierInformationForBuyerApplication = {
  supplierInformation: {
    company: {
      companyName: "",
      dateEstablished: "",
      phoneNumber: "",
      registrationNumbers: "",
      address: {
        city: "",
        addressLine1: "",
        addressLine2: "",
        postalCode: "",
      },
    },
  },
  relationshipWithSupplier: {
    shareHoldingRelationship: null,
    influence: null,
    paymentExperience: {
      description: null,
      length: null,
      noOfDeals: null,
      avgBusinessVol: null,
      history: null,
      delays: null,
    },
  },
};

const schemaValidation = Yup.object({
  supplierInformation: Yup.object({
    company: Yup.object({
      companyName: Yup.string().required("Company name is required"),

      dateEstablished: Yup.string().required("Establishment date is required"),

      phoneNumber: Yup.string().required("Phone number is required"),

      registrationNumbers: Yup.string().required(
        "Registration numbers are required"
      ),

      address: Yup.object({
        city: Yup.string().required("City is required"),

        addressLine1: Yup.string().required("Address line 1 is required"),

        addressLine2: Yup.string().required("Address line 2 is required"),

        postalCode: Yup.string().required("Postal code is required"),
      }),
    }),
  }),
  relationshipWithSupplier: Yup.object({
    shareHoldingRelationship: Yup.string().nullable(),
    influence: Yup.string().nullable(),
    paymentExperience: Yup.object({
      description: Yup.string().nullable(),
      length: Yup.string().nullable(),
      noOfDeals: Yup.string().nullable(),
      avgBusinessVol: Yup.string().nullable(),
      history: Yup.string().nullable(),
      delays: Yup.string().nullable(),
    }),
  }),
});

const useSupplierInformationForm = (applicationID: string) => {
  const [updateMode, setUpdateMode] = useState(false);

  const getInitialData = async () => {
    console.log("applicationID", applicationID);

    try {
      const response = await buyerApplicationService.getSupplierInfo(
        applicationID as string
      );
      if (response && response.id) {
        setUpdateMode(true);
      }
      const responseData: CreateSupplierInformationForBuyerApplication = {
        supplierInformation: {
          company: {
            companyName: response.supplier.companyName,
            dateEstablished: convertDate(response.supplier.dateEstablished),
            phoneNumber: response.supplier.phoneNumber,
            registrationNumbers: response.supplier.registrationNumbers,
            address: {
              city: response.supplier.address.city,
              addressLine1: response.supplier.address.addressLine1,
              addressLine2: response.supplier.address.addressLine2,
              postalCode: response.supplier.address.postalCode,
            },
          },
        },
        relationshipWithSupplier: {
          shareHoldingRelationship:
            response.relationshipWithSupplier.shareHoldingRelationship ?? null,
          influence: response.relationshipWithSupplier.influence ?? null,
          paymentExperience: {
            description:
              response.relationshipWithSupplier.paymentExperience.description ??
              null,
            length:
              response.relationshipWithSupplier.paymentExperience.length ??
              null,
            noOfDeals:
              response.relationshipWithSupplier.paymentExperience.noOfDeals ??
              null,
            avgBusinessVol:
              response.relationshipWithSupplier.paymentExperience
                .avgBusinessVol ?? null,
            history:
              response.relationshipWithSupplier.paymentExperience.history ??
              null,
            delays:
              response.relationshipWithSupplier.paymentExperience.delays ??
              null,
          },
        },
      };

      return responseData;
    } catch (error) {
      return initialData;
    }
  };

  const saveChangeToDatabase = async (
    args: CreateSupplierInformationForBuyerApplication
  ) => {
    console.count("payload for patch:" + JSON.stringify(args));
    if (!updateMode) {
      const createSupplierInfo = buyerApplicationService.createSupplierInfo(
        applicationID as string,
        args
      );
      toast.promise(createSupplierInfo, {
        loading: "Loading...",
        success: (data) => {
          setUpdateMode(true);
          return `supplier information created`;
        },
        error: (err) => {
          return `${err}`;
        },
      });
    } else {
      const updateSupplierInfo = buyerApplicationService.updateSupplierInfo(
        applicationID as string,
        args
      );

      toast.promise(updateSupplierInfo, {
        loading: "Loading...",
        success: (data) => {
          return `supplier information updated`;
        },
        error: (err) => {
          return `${err}`;
        },
      });
    }
  };
  const queryResult = useQuery({
    queryKey: ["supplierInfo"],
    queryFn: getInitialData,
  });
  const { mutateAsync } = useMutation({
    mutationFn: saveChangeToDatabase,
  });

  const handleDebouncedChange = useMemo(
    () =>
      debounce((data: CreateSupplierInformationForBuyerApplication) => {
        console.log(data);
        mutateAsync(data);
      }, 500),
    [mutateAsync]
  );

  return {
    schemaValidation,
    queryResult,
    handleDebouncedChange,
  };
};

export default useSupplierInformationForm;
