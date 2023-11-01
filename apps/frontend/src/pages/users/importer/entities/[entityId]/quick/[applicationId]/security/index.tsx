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
              <span>Requested Facility Type</span>
              <select
                id=""
                className="inputs"
                {...register("facilityType", { required: true })}
              >
                <option value="" disabled>
                  Select Type...
                </option>
                <option value="IMPORTER_FINANCING">Importer Financing</option>
                <option value="EXPORTER_FINANCING">Exporter Financing</option>
              </select>
            </div>
            <div>
              <span>Requested Financing Ratio</span>
              <input
                type="text"
                className="inputs"
                placeholder="Ratio..."
                {...register("financingRatio", { required: true })}
              />
            </div>
            <div>
              <span>Please enter the requested facility amount</span>
              <input
                type="text"
                className="inputs"
                placeholder="Amount..."
                {...register("facilityAmount", { required: true })}
              />
            </div>
            <div>
              <span>Please enter the requested tenure</span>
              <input
                type="date"
                className="inputs"
                id="calendar"
                {...register("requestedTenure", { required: true })}
              />
            </div>
            <div>
              <span>Please enter the requested purpose</span>
              <input
                type="text"
                className="inputs"
                placeholder="Purpose..."
                {...register("requestedPurpose", { required: true })}
              />
            </div>
            <div>
              <span>Please enter the requested Source of Repayment</span>
              <input
                type="text"
                className="inputs"
                placeholder="Sources..."
                {...register("repaymentSource", { required: true })}
              />
            </div>
          </div>
          <div className="vLine"></div>
          <div className="collateral">
            <div className="maintitle">INTEREST</div>

            <div className="radioBack">
              <span>Will any collateral be provided?</span>
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
                  provider?
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
                    <span>Please explain</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Description"
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
                    <span>Please explain</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Description"
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
