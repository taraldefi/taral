import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import {
  collateralInfluenceRadioButtonAtom,
  collateralPaymentExpRadioButtonAtom,
  collateralRadioButtonAtom,
  exporterQuickApplicationAtom,
} from "@store/applicationStore";

type FormValues = {
  security: {
    facilityType: string;
    financingRatio: string;
    facilityAmount: string;
    tenure: string;
    purpose: string;
    sourceOfRepayment: string;
    collateralInfluence: string;
    collateralPaymentExp: string;
  };
};

function Index() {
  const [selectedRadioBtn, setSelectedRadioBtn] = useAtom(
    collateralRadioButtonAtom
  );
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn(e.currentTarget.value);
  const [selectedRadioBtn1, setSelectedRadioBtn1] = useAtom(
    collateralInfluenceRadioButtonAtom
  );
  const handleRadioClick1 = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn1(e.currentTarget.value);
  const [selectedRadioBtn2, setSelectedRadioBtn2] = useAtom(
    collateralPaymentExpRadioButtonAtom
  );
  const handleRadioClick2 = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn2(e.currentTarget.value);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const entityID = router.query.entityId;
  const [state, setState] = useAtom(exporterQuickApplicationAtom);
  const updateAction = (payload: any) => {
    setState((prev) => ({ ...prev, ...payload }));
  };

  const onSubmit = (data: any) => {
    if (!selectedRadioBtn) return;
    console.log("data:", data);
    if (selectedRadioBtn === "No") {
      reset({
        security: {
          collateralInfluence: "",
          collateralPaymentExp: "",
        },
      });
      data.security = {
        ...data.security,
        collateralInfluence: "",
        collateralPaymentExp: "",
      };
    }
    if (selectedRadioBtn1 === "No") {
      reset({
        security: {
          collateralInfluence: "",
        },
      });
      data.security = {
        ...data.security,
        collateralInfluence: "",
      };
    }
    if (selectedRadioBtn2 === "No") {
      reset({
        security: {
          collateralPaymentExp: "",
        },
      });
      data.security = {
        ...data.security,
        collateralPaymentExp: "",
      };
    }

    updateAction(data);
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/transactionDocs`
    );
  };

  const onBack = () => {
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/paymentTerms`
    );
  };
  return (
    <ApplicationLayout>
      <div className="securityContainer">
        <div className="securityContent">
          <div className="facility">
            <div className="maintitle">FACILITY</div>
            <div>
              <span>Requested Facility Type</span>
              <select
                id=""
                {...register("security.facilityType", { required: true })}
                defaultValue={state.security.facilityType}
                className="inputs"
              >
                <option value="">Select Type...</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <div>
              <span>Requested Financing Ratio</span>
              <input
                type="text"
                className="inputs"
                placeholder="Ratio..."
                defaultValue={state.security.financingRatio}
                {...register("security.financingRatio", { required: true })}
              />
            </div>
            <div>
              <span>Please enter the requested facility amount</span>
              <input
                type="text"
                className="inputs"
                placeholder="Amount..."
                defaultValue={state.security.facilityAmount}
                {...register("security.facilityAmount", { required: true })}
              />
            </div>
            <div>
              <span>Please enter the requested tenure</span>
              <input
                type="date"
                className="inputs"
                id="calendar"
                defaultValue={state.security.tenure}
                {...register("security.tenure", { required: true })}
              />
            </div>
            <div>
              <span>Please enter the requested purpose</span>
              <input
                type="text"
                className="inputs"
                placeholder="Purpose..."
                defaultValue={state.security.purpose}
                {...register("security.purpose", { required: true })}
              />
            </div>
            <div>
              <span>Please enter the requested Source of Repayment</span>
              <input
                type="text"
                className="inputs"
                placeholder="Sources..."
                defaultValue={state.security.sourceOfRepayment}
                {...register("security.sourceOfRepayment", { required: true })}
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
                    value="Yes"
                    onChange={handleRadioClick}
                    checked={selectedRadioBtn == "Yes"}
                  />
                  <label htmlFor="ECACoverYes">Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="ECACoverNO"
                    name="otherInfoRadio"
                    value="No"
                    onChange={handleRadioClick}
                    checked={selectedRadioBtn == "No"}
                  />
                  <label htmlFor="ECACoverNO">No</label>
                </div>
              </div>
            </div>

            {selectedRadioBtn == "Yes" ? (
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
                      value="Yes"
                      onChange={handleRadioClick1}
                      checked={selectedRadioBtn1 == "Yes"}
                    />
                    <label htmlFor="ECRYes">YES</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="ECRNO"
                      name="otherInfoRadio1"
                      value="No"
                      onChange={handleRadioClick1}
                      checked={selectedRadioBtn1 == "No"}
                    />
                    <label htmlFor="ECRNO">NO</label>
                  </div>
                </div>
                {selectedRadioBtn1 == "Yes" ? (
                  <div className="radioBackIn">
                    <span>Please explain</span>
                    <input
                      {...register("security.collateralInfluence", {
                        required: selectedRadioBtn1 == "Yes",
                      })}
                      type="text"
                      className="inputs"
                      placeholder="Description"
                      defaultValue={state.security.collateralInfluence}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
            {selectedRadioBtn == "Yes" ? (
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
                      name="otherInfoRadio2"
                      value="Yes"
                      onChange={handleRadioClick2}
                      checked={selectedRadioBtn2 == "Yes"}
                    />
                    <label htmlFor="ECRYes1">YES</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="ECRNO"
                      name="otherInfoRadio2"
                      value="No"
                      onChange={handleRadioClick2}
                      checked={selectedRadioBtn2 == "No"}
                    />
                    <label htmlFor="ECRNO1">NO</label>
                  </div>
                </div>
                {selectedRadioBtn2 == "Yes" ? (
                  <div className="radioBackIn">
                    <span>Please explain</span>
                    <input
                      type="text"
                      className="inputs"
                      {...register("security.collateralPaymentExp", {
                        required: selectedRadioBtn2 == "Yes",
                      })}
                      defaultValue={state.security.collateralPaymentExp}
                      placeholder="Description"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
            {Object.keys(errors).length != 0 && (
              <span className="errorMessage">
                Please fill all the required fields to continue
              </span>
            )}
          </div>
        </div>
      </div>
      <BottomBar onBack={onBack} onSubmit={handleSubmit(onSubmit)}></BottomBar>
    </ApplicationLayout>
  );
}

export default Index;
