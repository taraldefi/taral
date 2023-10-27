import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { yupResolver } from "@hookform/resolvers/yup";
import useBuyerInformationForm from "@hooks/buyerApplication/useBuyerInformation";
import { useRouter } from "next/router";
import { NextPageContext } from "next/types";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { toast } from "sonner";
import { CreateBuyerInformationForBuyerApplication } from "src/types";

function Index({ ...props }) {
  const router = useRouter();
  const { query } = props;

  const applicationID = query.applicationId;
  const entityID = query.entityId;

  // const [, setProgress] = useAtom(applicationProgressAtom);
  const { queryResult, handleDebouncedChange, schemaValidation } =
    useBuyerInformationForm(applicationID);

  const { register, getValues, control, reset, formState } =
    useForm<CreateBuyerInformationForBuyerApplication>({
      mode: "all",
      criteriaMode: "all",
      resolver: yupResolver(schemaValidation),
    });

  const { errors } = formState;

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

  // reset form values with prefetched data using custom hook functions
  React.useEffect(() => {
    reset(queryResult.data);
    // const progress = calculateProgress();
    // setProgress(parseInt(progress));
  }, [queryResult.data]);

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

  const onSubmit = async () => {
    const data = getValues();
    try {
      await schemaValidation.validate(data);
      router.push(
        `/users/${
          router.asPath.split("/")[2]
        }/entities/${entityID}/quick/${applicationID}/supplierInfo`
      );
    } catch (error) {
      toast.error("Please fill all the required fields to continue");
    }
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
                      ? `${errors.company.address.city.message}`
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
                      ? `${errors.company.address.postalCode.message}`
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
            <div className="form-item">
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
            <div className="form-item">
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
            <div className="form-item">
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
                {/* <span className="errorMessage">
                  Please fill all the required fields to continue
                </span>
                <br /> */}
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
