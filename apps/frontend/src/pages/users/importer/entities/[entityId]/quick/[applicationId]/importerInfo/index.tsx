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

  const { register, getValues, control, reset, formState, trigger } =
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
    console.log("queryResult.data", queryResult.data);
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
    await trigger();
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
              <span>What is your company name?</span>
              <input
                disabled
                type="text"
                className={"inputs"}
                defaultValue={queryResult.data?.companyName}
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
                <span>Establishment Date</span>
                <input
                  disabled
                  type="date"
                  id="calendar"
                  className={"inputs"}
                  defaultValue={queryResult.data?.dateEstablished}
                />
              </div>
              <div style={{ flexGrow: 1 }} className="form-item">
                <span>
                  Registration Number <b style={{ color: "#f84141" }}>*</b>
                </span>
                <input
                  disabled
                  type="text"
                  className={"inputs"}
                  placeholder={"registration number"}
                  defaultValue={queryResult.data?.registrationNumber}
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
              <PhoneInput
                inputStyle={{
                  width: "100%",
                  height: "44px",
                  border: `1.5px solid #cbd5e1`,
                }}
                disabled
                placeholder={"phone number"}
                defaultCountry="us"
                value={queryResult.data?.phoneNumber}
              />
            </div>

            <div className="form-item">
              <span>
                Address line 1 <b style={{ color: "#f84141" }}>*</b>
              </span>
              <input
                type="text"
                className={
                  errors.address?.addressLine1 ? "inputs inputRed" : "inputs"
                }
                placeholder={
                  errors.address?.addressLine1
                    ? `${errors.address?.addressLine1?.message}`
                    : "Address line 1"
                }
                {...register("address.addressLine1")}
              />
            </div>
            <div className="form-item">
              <span>
                Address line 2 <b style={{ color: "#f84141" }}>*</b>
              </span>
              <input
                type="text"
                className={
                  errors.address?.addressLine2 ? "inputs inputRed" : "inputs"
                }
                placeholder={
                  errors.address?.addressLine2
                    ? `${errors.address?.addressLine2?.message}`
                    : "Address line 2"
                }
                {...register("address.addressLine2")}
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
                    errors.address?.city ? "inputs inputRed" : "inputs"
                  }
                  placeholder={
                    errors.address?.city
                      ? `${errors.address.city.message}`
                      : "city"
                  }
                  {...register("address.city")}
                />
              </div>
              <div style={{ flexGrow: 1 }} className="form-item">
                <span>
                  Company Post Code <b style={{ color: "#f84141" }}>*</b>
                </span>
                <input
                  type="text"
                  className={
                    errors.address?.postalCode ? "inputs inputRed" : "inputs"
                  }
                  placeholder={
                    errors.address?.postalCode
                      ? `${errors.address.postalCode.message}`
                      : "postal code"
                  }
                  {...register("address.postalCode")}
                />
              </div>
            </div>
            <p></p>
          </div>
          <div className="vLine"></div>
          <div className="taxAndRevenue">
            <div className="maintitle">TAX AND REVENUE</div>
            <div className="form-item">
              <span>Last fiscal year</span>
              <input
                disabled
                type="number"
                className={"inputs"}
                defaultValue={queryResult.data?.taxAndRevenue.lastFiscalYear}
              />
            </div>
            <div className="form-item">
              <span>Total revenue last fiscal year </span>
              <input
                disabled
                type="text"
                className={"inputs"}
                defaultValue={queryResult.data?.taxAndRevenue.totalRevenue}
              />
            </div>
            <div className="form-item">
              <span>Percentage of revenue was comprised by exports </span>
              <input
                disabled
                type="text"
                className={"inputs"}
                defaultValue={
                  queryResult.data?.taxAndRevenue.exportRevenuePercentage
                }
                id="percentage"
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
