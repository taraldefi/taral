import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { yupResolver } from "@hookform/resolvers/yup";
import buyerApplicationService from "@services/application/buyerApplicationService";
import { applicationProgressAtom } from "@store/applicationStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import convertDate from "@utils/lib/convertDate";
import { useAtom } from "jotai";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import debounce from "just-debounce-it";
import { useRouter } from "next/router";
import { NextPageContext } from "next/types";
import React from "react";
import { Controller, useForm, useFormState } from "react-hook-form";
import { toast } from "sonner";
import { CreateBuyerInformationForBuyerApplication } from "src/types";
import * as Yup from "yup";

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

function Index({ ...props }) {
  const router = useRouter();
  const { query } = props;

  const applicationID = query.applicationId;
  const entityID = query.entityId;

  const [, setProgress] = useAtom(applicationProgressAtom);
  const [updateMode, setUpdateMode] = React.useState(false);

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

  const { register, getValues, control, watch, reset, formState } =
    useForm<CreateBuyerInformationForBuyerApplication>({
      mode: "all",
      criteriaMode: "all",
      resolver: yupResolver(schemaValidation),
    });

  const queryResult = useQuery(["importerInfo"], getInitialData);
  const mutationResult = useMutation(saveChangeToDatabase, {
    onSuccess: (dataTosave: CreateBuyerInformationForBuyerApplication) => {
      console.count("success mutating: " + JSON.stringify(dataTosave));
    },
  });

  const { errors } = formState;
  const { mutateAsync } = mutationResult;

  // const calculateProgress = () => {
  //   const stringifiedJson = JSON.stringify(dirtyFields);
  //   const regex = new RegExp("true", "g");
  //   const filledFields = stringifiedJson.match(regex);

  //   console.log((filledFields || []).length);
  //   const totalFilledFIelds = (filledFields || []).length;
  //   const totalFields = 9;
  //   const score = totalFilledFIelds / totalFields;
  //   const progressScore = score * 17;
  //   console.log(dirtyFields);
  //   return progressScore.toFixed(0);
  // };

  React.useEffect(() => {
    reset(queryResult.data);
    // const progress = calculateProgress();
    // setProgress(parseInt(progress));
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
      const validated = await schemaValidation.validate(data);
      console.log("valdiations:", validated);
      handleDebouncedChange(validated);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = () => {
    console.log(errors);
    if (errors.company) return;
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
            <div className="form-item">
              <span>
                What is your company name? <b style={{ color: "#f84141" }}>*</b>
              </span>
              <input
                type="text"
                className={
                  errors.company?.companyName ? "inputs inputRed" : "inputs"
                }
                placeholder={
                  errors.company?.companyName
                    ? `${errors.company.companyName.message}`
                    : "company name"
                }
                {...register("company.companyName")}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                gap: "15px",
                justifyContent: "space-between",
              }}
            >
              <div style={{ flexGrow: 1 }} className="form-item">
                <span>
                  Establishment Date <b style={{ color: "#f84141" }}>*</b>
                </span>
                <input
                  type="date"
                  id="calendar"
                  className={
                    errors.company?.dateEstablished
                      ? "inputs inputRed"
                      : "inputs"
                  }
                  placeholder={
                    errors.company?.dateEstablished
                      ? `${errors.company.dateEstablished.message}`
                      : "date established"
                  }
                  {...register("company.dateEstablished")}
                />
              </div>
              <div style={{ flexGrow: 1 }} className="form-item">
                <span>
                  Registration Number <b style={{ color: "#f84141" }}>*</b>
                </span>
                <input
                  type="text"
                  className={
                    errors.company?.registrationNumbers
                      ? "inputs inputRed"
                      : "inputs"
                  }
                  placeholder={
                    errors.company?.registrationNumbers
                      ? `${errors.company.registrationNumbers.message}`
                      : "registration number"
                  }
                  {...register("company.registrationNumbers")}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingBottom: "10px",
                color: "#475569",
                fontSize: "14px",
                fontStyle: "normal",
                gap: "10px",
                width: "100%",
              }}
            >
              <span>
                Phone Number <b style={{ color: "#f84141" }}>*</b>
              </span>
              {/* <input
                type="text"
                className={
                  errors.company?.companyName ? "inputs inputRed" : "inputs"
                }
                placeholder="Contact number..."
                {...register("company.phoneNumber")}
              /> */}
              <Controller
                control={control}
                name="company.phoneNumber"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <PhoneInput
                    inputStyle={
                      errors.company?.phoneNumber
                        ? {
                            width: "100%",
                            height: "44px",
                            border: "1.5px solid red",
                          }
                        : {
                            width: "100%",
                            height: "44px",
                            border: `1.5px solid #cbd5e1`,
                          }
                    }
                    placeholder={
                      errors.company?.phoneNumber
                        ? `${errors.company.phoneNumber.message}`
                        : "phone number"
                    }
                    defaultCountry="us"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>

            <div className="form-item">
              <span>
                Address line 1 <b style={{ color: "#f84141" }}>*</b>
              </span>
              <input
                type="text"
                className={
                  errors.company?.address?.addressLine1
                    ? "inputs inputRed"
                    : "inputs"
                }
                placeholder={
                  errors.company?.address?.addressLine1
                    ? `${errors.company?.address?.addressLine1?.message}`
                    : "Address line 1"
                }
                {...register("company.address.addressLine1")}
              />
            </div>
            <div className="form-item">
              <span>
                Address line 2 <b style={{ color: "#f84141" }}>*</b>
              </span>
              <input
                type="text"
                className={
                  errors.company?.address?.addressLine2
                    ? "inputs inputRed"
                    : "inputs"
                }
                placeholder={
                  errors.company?.address?.addressLine2
                    ? `${errors.company?.address?.addressLine2?.message}`
                    : "Address line 2"
                }
                {...register("company.address.addressLine2")}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                gap: "15px",
                justifyContent: "space-between",
              }}
            >
              <div style={{ flexGrow: 1 }} className="form-item">
                <span>
                  City <b style={{ color: "#f84141" }}>*</b>
                </span>
                <input
                  type="text"
                  className={
                    errors.company?.address?.city ? "inputs inputRed" : "inputs"
                  }
                  placeholder={
                    errors.company?.address?.city
                      ? `${errors.company.address.city}`
                      : "city"
                  }
                  {...register("company.address.city")}
                />
              </div>
              <div style={{ flexGrow: 1 }} className="form-item">
                <span>
                  Company Post Code <b style={{ color: "#f84141" }}>*</b>
                </span>
                <input
                  type="text"
                  className={
                    errors.company?.address?.postalCode
                      ? "inputs inputRed"
                      : "inputs"
                  }
                  placeholder={
                    errors.company?.address?.postalCode
                      ? `${errors.company.address.postalCode}`
                      : "postal code"
                  }
                  {...register("company.address.postalCode")}
                />
              </div>
            </div>
            <p></p>
          </div>
          <div className="vLine"></div>
          <div className="taxAndRevenue">
            <div className="maintitle">TAX AND REVENUE</div>
            <div>
              <span>
                Last fiscal year? <b style={{ color: "#f84141" }}>*</b>
              </span>
              <input
                type="date"
                className={
                  errors.company?.taxAndRevenue?.lastFiscalYear
                    ? "inputs inputRed"
                    : "inputs"
                }
                id="calendar"
                placeholder={
                  errors.company?.taxAndRevenue?.lastFiscalYear
                    ? `${errors.company?.taxAndRevenue?.lastFiscalYear?.message}`
                    : "last fiscal year"
                }
                {...register("company.taxAndRevenue.lastFiscalYear")}
              />
            </div>
            <div>
              <span>
                Total revenue last fiscal year?{" "}
                <b style={{ color: "#f84141" }}>*</b>
              </span>
              <input
                type="text"
                className={
                  errors.company?.taxAndRevenue?.totalRevenue
                    ? "inputs inputRed"
                    : "inputs"
                }
                placeholder={
                  errors.company?.taxAndRevenue?.totalRevenue
                    ? `${errors.company?.taxAndRevenue?.totalRevenue?.message}`
                    : "total revenue"
                }
                {...register("company.taxAndRevenue.totalRevenue")}
              />
            </div>
            <div>
              <span>
                What % of revenue was comprised by exports?{" "}
                <b style={{ color: "#f84141" }}>*</b>
              </span>
              <input
                type="text"
                className={
                  errors.company?.taxAndRevenue?.exportRevenuePercentage
                    ? "inputs inputRed"
                    : "inputs"
                }
                placeholder={
                  errors.company?.taxAndRevenue?.exportRevenuePercentage
                    ? `${errors.company?.taxAndRevenue?.exportRevenuePercentage?.message}`
                    : "revenue percentage"
                }
                id="percentage"
                {...register("company.taxAndRevenue.exportRevenuePercentage")}
              />
            </div>

            {Object.keys(errors).length != 0 && (
              <>
                <span className="errorMessage">
                  Please fill all the required fields to continue
                </span>
                <br />
                <span className="errorMessage">
                  <b style={{ color: "#f84141" }}>*</b> Required fields
                </span>
              </>
            )}
          </div>
          <div className="vLine0"></div>
          <div className="otherInfo"></div>
        </form>
        <BottomBar onBack={onBack} onSubmit={() => onSubmit()}></BottomBar>
      </ApplicationLayout>
    </div>
  );
}
export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  return { props: { query } };
}

export default Index;
