import buyerApplicationService from "@services/application/buyerApplicationService";
import supplierEntityService from "@services/supplierEntityService";
import { useMutation, useQuery } from "@tanstack/react-query";
import convertDate from "@utils/lib/convertDate";
import { useAtom } from "jotai";
import debounce from "just-debounce-it";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Company,
  CreateSupplierInformationForBuyerApplication,
} from "src/types/supplier_info_for_buyer";
import * as Yup from "yup";

// All functions are similar to buyer information for more details check buyer information
const initialData: CreateSupplierInformationForBuyerApplication = {
  supplierId: "",

  relationshipWithSupplier: {
    shareHoldingRelationship: null,
    influence: null,
    paymentExperience: {
      exists: true,
      description: null,
      length: null,
      noOfDeals: null,
      avgBusinessVol: null,
      history: null,
      delays: null,
      currency: null,
    },
  },
};

const schemaValidation = Yup.object({
  supplierId: Yup.string().required("Company name is required"),

  relationshipWithSupplier: Yup.object({
    shareHoldingRelationship: Yup.string().nullable(),
    influence: Yup.string().nullable(),
    paymentExperience: Yup.object({
      exists: Yup.boolean().required(),
      description: Yup.string().when("exists", {
        is: true,
        then: () => Yup.string().required("Required"),
        otherwise: () => Yup.string().nullable(),
      }),
      length: Yup.string().when("exists", {
        is: true,
        then: () => Yup.string().required("Required"),
        otherwise: () => Yup.string().nullable(),
      }),
      noOfDeals: Yup.number().when("exists", {
        is: true,
        then: () =>
          Yup.number().typeError("must be a number").required("Required"),
        otherwise: () => Yup.number().nullable(),
      }),
      avgBusinessVol: Yup.string().when("exists", {
        is: true,
        then: () => Yup.string().required("Required"),
        otherwise: () => Yup.string().nullable(),
      }),
      history: Yup.string().when("exists", {
        is: true,
        then: () => Yup.string().required("Required"),
        otherwise: () => Yup.string().nullable(),
      }),
      delays: Yup.string().nullable(),
    }),
  }),
});

const useSupplierInformationForm = (applicationID: string) => {
  const [updateMode, setUpdateMode] = useState(false);
  const [companyInformation, setCompanyInformation] = useState<Company>();

  const getInitialData = async () => {
    try {
      const response = await buyerApplicationService.getSupplierInfo(
        applicationID as string
      );
      if (response && response.supplierId) {
        const companyData = await supplierEntityService.getEntity(
          response.supplierId
        );
        setCompanyInformation({
          dateEstablished: convertDate(companyData.incorporationDate),
          phoneNumber: companyData.phoneNumber,
          registrationNumber: companyData.registrationNumber,
          address: companyData.address,
        });
        setUpdateMode(true);
      }
      const responseData: CreateSupplierInformationForBuyerApplication = {
        supplierId: response.supplierId,

        relationshipWithSupplier: {
          shareHoldingRelationship:
            response.relationshipWithSupplier.shareHoldingRelationship ?? null,
          influence: response.relationshipWithSupplier.influence ?? null,
          paymentExperience: {
            exists: response.relationshipWithSupplier.paymentExperience.exists,
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
            currency:
              response.relationshipWithSupplier.paymentExperience.currency ??
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
      const createSupplierInfo =
        await buyerApplicationService.createSupplierInfo(
          applicationID as string,
          args
        );
      const companyData = await supplierEntityService.getEntity(
        createSupplierInfo.supplierId
      );
      setCompanyInformation({
        dateEstablished: convertDate(companyData.incorporationDate),
        phoneNumber: companyData.phoneNumber,
        registrationNumber: companyData.registrationNumber,
        address: companyData.address,
      });
      if (createSupplierInfo.supplierId) {
        setUpdateMode(true);
        toast.success(`Supplier information created`);
      }
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
    companyInformation,
    setCompanyInformation,
  };
};

export default useSupplierInformationForm;
