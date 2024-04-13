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
  isConcluded: true,
  partialRefinancing: true,
  interestExists: true,
  interestPercentage: null,
  interestCurrency: null,
  interestType: InterestType.FIXED,
  interestFixedRate: null,
  interestDegressiveRate: null,
  paymentType: PaymentTypes.SHORT,
  downpaymentCurrency: "",
  downpaymentAmount: 0,
  downpaymentDescription: "",
  balanceCurrency: "",
  balanceAmount: 0,
  balancePaymentDeadline: "",
  paymentVehicleDescription: "",
  paymentDuration: "",
};
const patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;
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
  paymentDuration: Yup.string()
    .required("required")
    .test(
      "is-valid-duration",
      "Payment duration should be less than or equal to 90 days",
      (val: any) => {
        if (val != undefined) {
          return parseInt(val) <= 90;
        }
        return true;
      }
    ),
  downpaymentCurrency: Yup.string().required("required"),
  downpaymentAmount: Yup.number()
    .required("required")
    .test(
      "is-decimal",
      "The amount should be a decimal with maximum two digits after comma",
      (val: any) => {
        if (val != undefined) {
          return patternTwoDigisAfterComma.test(val);
        }
        return true;
      }
    )
    .typeError("Enter a value greater than 0"),
  downpaymentDescription: Yup.string().required("required"),
  balanceCurrency: Yup.string().required("required"),
  balanceAmount: Yup.number()
    .required("Required")
    .moreThan(Yup.ref("downpaymentAmount"))
    .typeError("Must be of type number")
    .test(
      "is-decimal",
      "The amount should be a decimal with maximum two digits after comma",
      (val: any) => {
        if (val != undefined) {
          return patternTwoDigisAfterComma.test(val);
        }
        return true;
      }
    ),
  balancePaymentDeadline: Yup.string()
    .required("Required")
    .test(
      "is-valid-deadline",
      "Deadline should be set at maximum 90 days from submission date",
      (val: any) => {
        // value should be less than 90 days from now
        const today = new Date();
        const deadline = new Date(val);
        const diffTime = Math.abs(deadline.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 90;
      }
    ),
  paymentVehicleDescription: Yup.string().required("Required"),
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
        downpaymentCurrency: response.downpaymentCurrency,
        downpaymentAmount: parseFloat(response.downpaymentAmount),
        downpaymentDescription: response.downpaymentDescription,
        balanceCurrency: response.balanceCurrency,
        balanceAmount: parseFloat(response.balanceAmount),
        balancePaymentDeadline: response.balancePaymentDeadline,
        paymentVehicleDescription: response.paymentVehicleDescription,
        paymentDuration: response.paymentDuration,
      };

      return responseData;
    } catch (error) {
      return initialData;
    }
  };

  const saveChangeToDatabase = async (args: CreatePaymentTerm) => {
    console.count("payload for patch:" + JSON.stringify(args));
    const payload = {
      ...args,
      downpaymentAmount: (args.downpaymentAmount as any).toString(),
      balanceAmount: (args.balanceAmount as any).toString(),
    };

    if (!updateMode) {
      const createPaymentTerm = buyerApplicationService.createPaymentTerms(
        applicationID as string,
        payload
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
        payload
      );

      toast.promise(updatePaymentTerm, {
        loading: "Loading...",
        success: (data) => {
          return `Payment term updated`;
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
