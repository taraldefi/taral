import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { applicationProgressAtom } from "@store/applicationStore";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";
import buyerApplicationService from "@services/application/buyerApplicationService";
import { CreateBuyerInformationForBuyerApplication } from "src/types";
import debounce from "just-debounce-it";
import { toast } from "sonner";
import { GetServerSideProps, NextPageContext } from "next";

function Index() {
  const router = useRouter();
  const paths = router.asPath.split("/");
  const applicationID = paths[paths.length - 2];
  const entityID = router.query.entityId;

  const [, setProgress] = useAtom(applicationProgressAtom);
  const [updateMode, setUpdateMode] = React.useState(false);

  const schemaValidation = Yup.object().shape({
    company: Yup.object().shape({
      companyName: Yup.string().required("Company name is required"),

      dateEstablished: Yup.string().required("Establishment date is required"),

      phoneNumber: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be a 10-digit number")
        .required("Phone number is required"),

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
          dateEstablished: response.dateEstablished,
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
        },
      };

      // If successful, use the fetched data for the form
      return responseData;
    } catch (error) {
      // If there's an error (e.g., data not found), handle it here
      // You can set a flag to indicate that you're in "update mode" or return default data
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
          return `buyer information created`;
        },
        error: "Error",
      });
      const response = await createBuyerInfo;
      const responseData: CreateBuyerInformationForBuyerApplication = {
        company: {
          companyName: response.companyName,
          dateEstablished: response.dateEstablished,
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
        error: "Error",
      });
      const response = await createBuyerInfo;
      const responseData: CreateBuyerInformationForBuyerApplication = {
        company: {
          companyName: response.companyName,
          dateEstablished: response.dateEstablished,
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
        },
      };

      return responseData;
    }
  };

  const {
    register,
    handleSubmit,
    getValues,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateBuyerInformationForBuyerApplication>();

  const queryResult = useQuery(["importerInfo"], getInitialData);
  const mutationResult = useMutation(saveChangeToDatabase, {
    onSuccess: (dataTosave: CreateBuyerInformationForBuyerApplication) => {
      console.count("success mutating: " + JSON.stringify(dataTosave));
    },
  });
  const { mutateAsync } = mutationResult;
  const { dirtyFields, isDirty } = useFormState({
    control,
  });
  const calculateProgress = () => {
    // convert json to string and count the occurance of true
    // no of true = changed values in the form
    const stringifiedJson = JSON.stringify(dirtyFields);
    const regex = new RegExp("true", "g");
    const filledFields = stringifiedJson.match(regex);

    console.log((filledFields || []).length);
    const totalFilledFIelds = (filledFields || []).length;
    const totalFields = 9;
    const score = totalFilledFIelds / totalFields;
    const progressScore = score * 17;
    console.log(dirtyFields);
    return progressScore.toFixed(0);
  };

  console.log(updateMode);

  React.useEffect(() => {
    reset(queryResult.data);
    const progress = calculateProgress();
    setProgress(parseInt(progress));
  }, [queryResult.data]);

  const handleDebouncedChange = React.useMemo(
    () =>
      debounce((data: CreateBuyerInformationForBuyerApplication) => {
        console.log(data);
        mutateAsync(data);
      }, 500),
    [mutateAsync]
  );

  const onChange = async () => {
    const data = getValues();
    try {
      console.log(errors);
      const validated = await schemaValidation.validate(data);
      console.log("valdiations:", validated);
      handleDebouncedChange(validated);
    } catch (e) {
      console.log(e);
    }
  };

  if (queryResult.isLoading) {
    return <h2>Loading...</h2>;
  }

  const watchAllFields = watch();

  const onSubmit = (data: any) => {
    console.log("data:", data);
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/${applicationID}/supplierInfo`
    );
  };

  const onBack = () => {
    router.push(
      `/users/${router.asPath.split("/")[2]}/entities/${entityID}/applications`
    );
  };
  return (
    <div>
      <ApplicationLayout>
        <form onChange={onChange} className="exporterInfoContainer">
          <div className="generalInfo">
            <div className="maintitle">GENERAL INFO</div>
            <div>
              <span>What is your company name?</span>
              <input
                type="text"
                className="inputs"
                placeholder="Company name..."
                {...register("company.companyName", {
                  required: true,
                })}
              />
            </div>
            <div>
              <span>Establishment Date</span>
              <input
                type="date"
                className="inputs"
                placeholder="Revenue amount..."
                {...register("company.dateEstablished", {
                  required: true,
                })}
              />
            </div>
            <div>
              <span>Phone Number</span>
              <input
                type="text"
                className="inputs"
                placeholder="Contact number..."
                {...register("company.phoneNumber", { required: true })}
              />
            </div>
            <div>
              <span>Registration Number</span>
              <input
                type="text"
                className="inputs"
                placeholder="Registration Number..."
                {...register("company.registrationNumbers", { required: true })}
              />
            </div>
            <div>
              <span>Address line 1</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 1..."
                {...register("company.address.addressLine1", {
                  required: true,
                })}
              />
            </div>
            <div>
              <span>Address line 2</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 2..."
                {...register("company.address.addressLine2", {
                  required: true,
                })}
              />
            </div>
            <div>
              <span>City</span>
              <input
                type="text"
                className="inputs"
                placeholder="city"
                {...register("company.address.city", {
                  required: true,
                })}
              />
            </div>
            <div>
              <span>Company Post Code</span>
              <input
                type="text"
                className="inputs"
                placeholder="Post code..."
                {...register("company.address.postalCode", { required: true })}
              />
            </div>
          </div>
          <div className="vLine"></div>
          <div className="taxAndRevenue">
            <div className="maintitle">TAX AND REVENUE</div>
            <div>
              <span>Last fiscal year?</span>
              <input
                type="date"
                className="inputs"
                placeholder="Revenue amount..."
                {...register("company.taxAndRevenue.lastFiscalYear", {
                  required: true,
                })}
              />
            </div>
            <div>
              <span>Total revenue last fiscal year?</span>
              <input
                type="text"
                className="inputs"
                placeholder="Revenue amount..."
                {...register("company.taxAndRevenue.totalRevenue", {
                  required: true,
                })}
              />
            </div>
            <div>
              <span>What % of revenue was comprised by exports?</span>
              <input
                type="text"
                className="inputs"
                placeholder="Revenue percentage..."
                id="percentage"
                {...register("company.taxAndRevenue.exportRevenuePercentage", {
                  required: true,
                })}
              />
            </div>
            {Object.keys(errors).length != 0 && (
              <span className="errorMessage">
                Please fill all the required fields to continue
              </span>
            )}
          </div>
          <div className="vLine0"></div>
          <div className="otherInfo"></div>
        </form>
        {/* <BottomBar
          onBack={onBack}
          onSubmit={handleSubmit(onSubmit)}
        ></BottomBar> */}
      </ApplicationLayout>
    </div>
  );
}

export default Index;
