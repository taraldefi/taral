import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import useCollateralForm from "@hooks/buyerApplication/useCollateral";
import usePaymentTermForm from "@hooks/buyerApplication/usePaymentTerms";
import { CreateCollateralInformation } from "src/types/collateral_info";
import { useRouter } from "next/router";
import { NextPageContext } from "next/types";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function Index({ ...props }) {
  const { query } = props;
  const router = useRouter();
  const entityID = query.entityId;
  const applicationID = query.applicationId;
  const {
    queryResult,
    handleDebouncedChange,
    collateralInfluenceBtn,
    collateralPaymentExperienceBtn,
    collateralRadioBtn,
    setCollateralInfluenceBtn,
    setCollateralPaymentExperienceBtn,
    setCollateralRadioBtn,
    schemaValidation,
  } = useCollateralForm(applicationID as string);

  const {
    register,
    setValue,
    reset,
    control,
    handleSubmit,
    trigger,
    watch,
    getValues,
    formState: { errors },
  } = useForm<CreateCollateralInformation>({
    mode: "all",
    criteriaMode: "all",
  });

  React.useEffect(() => {
    reset(queryResult.data);
  }, [queryResult.data]);
  const handleCollateralClick = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (e.currentTarget.value == "NO") {
      setValue("collateralProviderInfluence", null);
      setValue("collateralProviderExperience", null);
    }
    setCollateralRadioBtn(e.currentTarget.value);
  };

  const handleCollateralInfluenceClick = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (e.currentTarget.value == "NO") {
      setValue("collateralProviderInfluence", null);
    }
    setCollateralInfluenceBtn(e.currentTarget.value);
  };

  const handleCollateralPaymentExperienceClick = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (e.currentTarget.value == "NO") {
      setValue("collateralProviderExperience", null);
    }
    setCollateralPaymentExperienceBtn(e.currentTarget.value);
  };

  const onChange = async () => {
    const data = getValues();
    try {
      // validate data
      const validated = await schemaValidation.validate(data);
      handleDebouncedChange(validated as CreateCollateralInformation);
    } catch (e) {
      console.log(e);
    }
  };

  const onBack = () => {
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/${applicationID}/paymentTerms`
    );
  };

  const onSubmit = async () => {
    await trigger();
    try {
      router.push(
        `/users/${
          router.asPath.split("/")[2]
        }/entities/${entityID}/quick/${applicationID}/transactionDocs`
      );
    } catch (e) {
      toast.error(`${e}`);
      console.log(e);
    }
  };

  return (
    <ApplicationLayout>
      <div className="securityContainer">
        <form onChange={onChange} className="securityContent">
          <div className="facility">
            <div className="maintitle">FACILITY</div>
            <div>
              <span>
                Requested Facility Type <b style={{ color: "#f84141" }}>*</b>
              </span>
              <select
                id=""
                className="inputs"
                {...register("facilityType", { required: true })}
              >
                <option value="IMPORTER_FINANCING">Importer Financing</option>
                <option value="EXPORTER_FINANCING">Exporter Financing</option>
              </select>
            </div>
            <div>
              <span>
                Requested Financing Ratio <b style={{ color: "#f84141" }}>*</b>
              </span>
              <input
                type="text"
                className={errors.financingRatio ? "inputs inputRed" : "inputs"}
                placeholder={errors.financingRatio ? "required" : "Ratio..."}
                {...register("financingRatio", { required: true })}
              />
            </div>
            <div>
              <span>
                Please enter the requested facility amount{" "}
                <b style={{ color: "#f84141" }}>*</b>
              </span>
              <input
                type="text"
                className={errors.facilityAmount ? "inputs inputRed" : "inputs"}
                placeholder={errors.facilityAmount ? "required" : "Amount..."}
                {...register("facilityAmount", { required: true })}
              />
            </div>
            <div>
              <span>
                Please enter the requested tenure{" "}
                <b style={{ color: "#f84141" }}>*</b>
              </span>
              <input
                type="date"
                className={
                  errors.requestedTenure ? "inputs inputRed" : "inputs"
                }
                id="calendar"
                {...register("requestedTenure", { required: true })}
              />
            </div>
            <div>
              <span>
                Please enter the requested purpose{" "}
                <b style={{ color: "#f84141" }}>*</b>
              </span>
              <input
                type="text"
                className={
                  errors.requestedPurpose ? "inputs inputRed" : "inputs"
                }
                placeholder={errors.requestedPurpose ? "required" : "purpose"}
                {...register("requestedPurpose", { required: true })}
              />
            </div>
            <div>
              <span>
                Please enter the requested Source of Repayment{" "}
                <b style={{ color: "#f84141" }}>*</b>
              </span>
              <input
                type="text"
                className={
                  errors.repaymentSource ? "inputs inputRed" : "inputs"
                }
                placeholder={
                  errors.repaymentSource ? "required" : "repayment source"
                }
                {...register("repaymentSource", { required: true })}
              />
            </div>
          </div>
          <div className="vLine"></div>
          <div className="collateral">
            <div className="maintitle">INTEREST</div>

            <div className="radioBack">
              <span>Will any collateral be provided? </span>
              <div>
                <div>
                  <input
                    type="radio"
                    id="ECACoverYes"
                    name="otherInfoRadio"
                    value="YES"
                    checked={collateralRadioBtn == "YES"}
                    onChange={handleCollateralClick}
                  />
                  <label htmlFor="ECACoverYes">YES</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="ECACoverNO"
                    name="otherInfoRadio"
                    value="NO"
                    checked={collateralRadioBtn == "NO"}
                    onChange={handleCollateralClick}
                  />
                  <label htmlFor="ECACoverNO">NO</label>
                </div>
              </div>
            </div>

            {collateralRadioBtn == "YES" && (
              <div className="radioBack">
                <span>
                  Do you have significant influence on security/collateral
                </span>
                <div>
                  <div>
                    <input
                      type="radio"
                      id="ECRYes"
                      name="otherInfoRadio1"
                      value="YES"
                      checked={collateralInfluenceBtn == "YES"}
                      onChange={handleCollateralInfluenceClick}
                    />
                    <label htmlFor="ECRYes">YES</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="ECRNO"
                      name="otherInfoRadio1"
                      value="NO"
                      checked={collateralInfluenceBtn == "NO"}
                      onChange={handleCollateralInfluenceClick}
                    />
                    <label htmlFor="ECRNO">NO</label>
                  </div>
                </div>
                {collateralInfluenceBtn == "YES" && (
                  <div className="radioBackIn">
                    <span style={{ display: "flex", flexDirection: "row" }}>
                      Please explain <b style={{ color: "#f84141" }}>*</b>
                    </span>
                    <input
                      type="text"
                      className={
                        errors.collateralProviderInfluence
                          ? "inputs inputRed"
                          : "inputs"
                      }
                      placeholder={
                        errors.collateralProviderInfluence
                          ? "required"
                          : "description"
                      }
                      {...register("collateralProviderInfluence", {
                        required: collateralInfluenceBtn == "YES",
                      })}
                    />
                  </div>
                )}
              </div>
            )}
            {collateralRadioBtn == "YES" && (
              <div className="radioBack">
                <span>
                  Do you have payment experience with security/collateral
                  provider?
                </span>
                <div>
                  <div>
                    <input
                      type="radio"
                      id="ECRYes"
                      value="YES"
                      checked={collateralPaymentExperienceBtn == "YES"}
                      onChange={handleCollateralPaymentExperienceClick}
                    />
                    <label htmlFor="ECRYes1">YES</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="ECRNO"
                      name="otherInfoRadio2"
                      value="NO"
                      checked={collateralPaymentExperienceBtn == "NO"}
                      onChange={handleCollateralPaymentExperienceClick}
                    />
                    <label htmlFor="ECRNO1">NO</label>
                  </div>
                </div>
                {collateralPaymentExperienceBtn == "YES" && (
                  <div className="radioBackIn">
                    <span style={{ display: "flex", flexDirection: "row" }}>
                      Please explain <b style={{ color: "#f84141" }}>*</b>
                    </span>
                    <input
                      type="text"
                      className={
                        errors.collateralProviderExperience
                          ? "inputs inputRed"
                          : "inputs"
                      }
                      placeholder={
                        errors.collateralProviderExperience
                          ? "required"
                          : "description"
                      }
                      {...register("collateralProviderExperience", {
                        required: collateralPaymentExperienceBtn == "YES",
                      })}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
      <BottomBar onBack={onBack} onSubmit={handleSubmit(onSubmit)}></BottomBar>
    </ApplicationLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  return { props: { query } };
}
export default Index;
