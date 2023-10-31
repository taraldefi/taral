import buyerApplicationService from "@services/application/buyerApplicationService";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreatePaymentTerm,
  InterestType,
  PaymentTypes,
} from "src/types/payment_terms";
import debounce from "just-debounce-it";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import * as Yup from "yup";

const initialData: CreatePaymentTerm = {
  isConcluded: false,
  partialRefinancing: false,
  interestExists: false,
  interestPercentage: null,
  interestCurrency: null,
  interestType: InterestType.NONE,
  interestFixedRate: null,
  interestDegressiveRate: null,
  paymentType: PaymentTypes.SHORT,
  paymentDuration: "",
};

const schemaValidation = Yup.object({
  isConcluded: Yup.boolean().required("required"),
  partialRefinancing: Yup.boolean().required("required"),
  interestExists: Yup.boolean().required("required"),
  interestPercentage: Yup.string().when("interestExists", {
    is: true,
    then: () => Yup.string().required(" interest percentage required"),
    otherwise: () => Yup.string().nullable(),
  }),
  interestCurrency: Yup.string().when("interestExists", {
    is: true,
    then: () => Yup.string().required(" interest currency required"),
    otherwise: () => Yup.string().nullable(),
  }),
  interestType: Yup.string().when("interestExists", {
    is: true,
    then: () =>
      Yup.string()
        .equals([InterestType.FIXED, InterestType.DEGRESSIVE])
        .required(" interest type required"),
    otherwise: () => Yup.string().nullable(),
  }),
  interestFixedRate: Yup.string().when("interestType", {
    is: (val: InterestType) => val === InterestType.FIXED,
    then: () => Yup.string().required(" interest fixed rate required"),
    otherwise: () => Yup.string().nullable(),
  }),
  interestDegressiveRate: Yup.string().when("interestType", {
    is: (val: InterestType) => val === InterestType.DEGRESSIVE,
    then: () => Yup.string().required(" interest degressive rate required"),
    otherwise: () => Yup.string().nullable(),
  }),
  paymentType: Yup.string()
    .default(PaymentTypes.SHORT)
    .required(" payment type required"),
  paymentDuration: Yup.string().required("required"),
});

const usePaymentTermForm = (applicationID: string) => {
  const [updateMode, setUpdateMode] = useState(false);

  const getInitialData = async () => {
    console.log("applicationID", applicationID);

    try {
      const response = await buyerApplicationService.getPaymentTerms(
        applicationID as string
      );
      if (response && response.id) {
        setUpdateMode(true);
      }
      const responseData: CreatePaymentTerm = {
        isConcluded: response.isConcluded,
        partialRefinancing: response.partialRefinancing,
        interestExists: response.interestExists,
        interestPercentage: response.interestPercentage,
        interestCurrency: response.interestCurrency,
        interestType: response.interestType,
        interestFixedRate: response.interestFixedRate,
        interestDegressiveRate: response.interestDegressiveRate,
        paymentType: response.paymentType,
        paymentDuration: response.paymentDuration,
      };

      return responseData;
    } catch (error) {
      return initialData;
    }
  };

  const saveChangeToDatabase = async (args: CreatePaymentTerm) => {
    console.count("payload for patch:" + JSON.stringify(args));
    if (!updateMode) {
      const createPaymentTerm = buyerApplicationService.createPaymentTerms(
        applicationID as string,
        args
      );
      toast.promise(createPaymentTerm, {
        loading: "Loading...",
        success: (data) => {
          setUpdateMode(true);
          return `payment term created`;
        },
        error: (err) => {
          return `${err}`;
        },
      });
    } else {
      const updatePaymentTerm = buyerApplicationService.updatePaymentTerms(
        applicationID as string,
        args
      );

      toast.promise(updatePaymentTerm, {
        loading: "Loading...",
        success: (data) => {
          return `payment term updated`;
        },
        error: (err) => {
          return `${err}`;
        },
      });
    }
  };
  const queryResult = useQuery({
    queryKey: ["paymentTerms"],
    queryFn: getInitialData,
  });
  const { mutateAsync } = useMutation({
    mutationFn: saveChangeToDatabase,
  });

  const handleDebouncedChange = useMemo(
    () =>
      debounce((data: CreatePaymentTerm) => {
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

export default usePaymentTermForm;
