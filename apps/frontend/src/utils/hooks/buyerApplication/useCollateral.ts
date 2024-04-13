import buyerApplicationService from "@services/application/buyerApplicationService";
import { useMutation, useQuery } from "@tanstack/react-query";
import convertDate from "@utils/lib/convertDate";
import debounce from "just-debounce-it";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  CreateCollateralInformation,
  FacilityType,
} from "src/types/collateral_info";
import * as Yup from "yup";
// All functions are similar to buyer information for more details check buyer information
const initialData: CreateCollateralInformation = {
  facilityType: FacilityType.IMPORTER_FINANCING,
  financingRatio: "",
  facilityAmount: "",
  requestedTenure: "",
  requestedPurpose: "",
  repaymentSource: "",
  collateralProviderInfluence: null,
  collateralProviderExperience: null,
};

const schemaValidation = Yup.object({
  facilityType: Yup.string()
    .equals([FacilityType.EXPORTER_FINANCING, FacilityType.IMPORTER_FINANCING])
    .required("required"),
  financingRatio: Yup.string().required("required"),
  facilityAmount: Yup.string().required("required"),
  requestedTenure: Yup.string()
    .required("required")
    .test(
      "is-valid-deadline",
      "Tenure should be set at maximum 90 days from submission date",
      (val: any) => {
        // value should be less than 90 days from now
        const today = new Date();
        const deadline = new Date(val);
        const diffTime = Math.abs(deadline.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log("diffDays", diffDays);
        return diffDays <= 90;
      }
    ),
  requestedPurpose: Yup.string().required("required"),
  repaymentSource: Yup.string().required("required"),
  collateralProviderInfluence: Yup.string().nullable(),
  collateralProviderExperience: Yup.string().nullable(),
});

const useCollateralForm = (applicationID: string) => {
  const [updateMode, setUpdateMode] = useState(false);

  const [collateralRadioBtn, setCollateralRadioBtn] = useState("YES");

  const [collateralInfluenceBtn, setCollateralInfluenceBtn] = useState("YES");

  const [collateralPaymentExperienceBtn, setCollateralPaymentExperienceBtn] =
    useState("YES");

  const getInitialData = async () => {
    console.log("applicationID", applicationID);

    try {
      const response = await buyerApplicationService.getCollateralInfo(
        applicationID as string
      );
      if (response && response.id) {
        setUpdateMode(true);
      }
      if (!response.collateralProviderInfluence) {
        setCollateralInfluenceBtn("NO");
      }
      if (!response.collateralProviderExperience) {
        setCollateralPaymentExperienceBtn("NO");
      }
      if (
        !response.collateralProviderInfluence &&
        !response.collateralProviderExperience
      ) {
        setCollateralRadioBtn("NO");
      }
      const responseData: CreateCollateralInformation = {
        facilityType: response.facilityType,
        financingRatio: response.financingRatio,
        facilityAmount: response.facilityAmount,
        requestedTenure: convertDate(response.requestedTenure),
        requestedPurpose: response.requestedPurpose,
        repaymentSource: response.repaymentSource,
        collateralProviderInfluence: response.collateralProviderInfluence,
        collateralProviderExperience: response.collateralProviderExperience,
      };

      return responseData;
    } catch (error) {
      return initialData;
    }
  };

  const saveChangeToDatabase = async (args: CreateCollateralInformation) => {
    console.count("payload for patch:" + JSON.stringify(args));
    if (!updateMode) {
      const createCollateralInfo = buyerApplicationService.createCollateralInfo(
        applicationID as string,
        args
      );
      toast.promise(createCollateralInfo, {
        loading: "Loading...",
        success: (data) => {
          setUpdateMode(true);
          return `collateral information created`;
        },
        error: (err) => {
          return `${err}`;
        },
      });
    } else {
      const updateCollateralInfo = buyerApplicationService.updateCollateralInfo(
        applicationID as string,
        args
      );

      toast.promise(updateCollateralInfo, {
        loading: "Loading...",
        success: (data) => {
          return `collateral information updated`;
        },
        error: (err) => {
          return `${err}`;
        },
      });
    }
  };
  const queryResult = useQuery({
    queryKey: ["collatrealInfo"],
    queryFn: getInitialData,
  });
  const { mutateAsync } = useMutation({
    mutationFn: saveChangeToDatabase,
  });

  const handleDebouncedChange = useMemo(
    () =>
      debounce((data: CreateCollateralInformation) => {
        console.log(data);
        mutateAsync(data);
      }, 500),
    [mutateAsync]
  );

  return {
    queryResult,
    handleDebouncedChange,
    collateralInfluenceBtn,
    setCollateralInfluenceBtn,
    collateralPaymentExperienceBtn,
    setCollateralPaymentExperienceBtn,
    collateralRadioBtn,
    setCollateralRadioBtn,
    schemaValidation,
  };
};

export default useCollateralForm;
