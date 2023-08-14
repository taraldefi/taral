import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import {
  degressiveInterestRadioButtonAtom,
  exporterQuickApplicationAtom,
  fixedInterestRadioButtonAtom,
  interestRadioButtonAtom,
} from "@store/applicationStore";

type FormValues = {
  paymentTerms: {
    isConcluded: string;
    isPartial: string;
    interest: {
      currency: string;
      rate: string;
      fixedRate: string;
      degressiveRate: string;
    };
    paymentType: string;
    paymentDuration: string;
  };
};

function Index() {
  const [selectedRadioBtn, setSelectedRadioBtn] = useAtom(
    interestRadioButtonAtom
  );
  const [selectedRadioBtn1, setSelectedRadioBtn1] = useAtom(
    fixedInterestRadioButtonAtom
  );
  const [selectedRadioBtn2, setSelectedRadioBtn2] = useAtom(
    degressiveInterestRadioButtonAtom
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const entityID = router.query.entityId;
  const [state, setState] = useAtom(exporterQuickApplicationAtom);

  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedRadioBtn(e.currentTarget.value);
  };

  const handleRadioClick1 = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedRadioBtn1(e.currentTarget.value);
  };

  const handleRadioClick2 = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedRadioBtn2(e.currentTarget.value);
  };

  const updateAction = (payload: any) => {
    setState((prev) => ({ ...prev, ...payload }));
  };
  console.log("state:", state);

  const onSubmit = (data: any) => {
    if (!selectedRadioBtn || !selectedRadioBtn1 || !selectedRadioBtn2) return;
    console.log("data:", data);
    if (selectedRadioBtn === "No") {
      reset({
        paymentTerms: {
          interest: {
            currency: "",
            rate: "",
          },
        },
      });
      data.paymentTerms.interest = {
        ...data.paymentTerms.interest,
        currency: "",
        rate: "",
      };
    }
    if (selectedRadioBtn1 === "No") {
      reset({
        paymentTerms: {
          interest: {
            fixedRate: "",
          },
        },
      });
      data.paymentTerms.interest = {
        ...data.paymentTerms.interest,
        fixedRate: "",
      };
    }
    if (selectedRadioBtn2 === "No") {
      reset({
        paymentTerms: {
          interest: {
            degressiveRate: "",
          },
        },
      });
      data.paymentTerms.interest = {
        ...data.paymentTerms.interest,
        degressiveRate: "",
      };
    }

    updateAction(data);
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/security`
    );
  };

  const onBack = () => {
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/contract`
    );
  };
  return (
    <ApplicationLayout>
      <div className="ptContainer">
        <div className="ptItemsContainer">
          <div className="ptDetails">
            <div className="maintitle">DETAILS</div>
            <div className="radioBack">
              <span>Have payment terms already been concluded?</span>
              <div>
                <div>
                  <input
                    type="radio"
                    value="Yes"
                    defaultChecked={state.paymentTerms.isConcluded == "Yes"}
                    {...register("paymentTerms.isConcluded", {
                      required: true,
                    })}
                    // onChange={}
                  />
                  <label>YES</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="No"
                    defaultChecked={state.paymentTerms.isConcluded == "No"}
                    {...register("paymentTerms.isConcluded", {
                      required: true,
                    })}
                    // onChange={}
                  />
                  <label>NO</label>
                </div>
              </div>
            </div>
            <div className="radioBack">
              <span>Would you accept a partial refinancing?</span>
              <div>
                <div>
                  <input
                    type="radio"
                    value="Yes"
                    defaultChecked={state.paymentTerms.isPartial == "Yes"}
                    {...register("paymentTerms.isPartial")}
                    // onChange={}
                  />
                  <label>YES</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="No"
                    defaultChecked={state.paymentTerms.isPartial == "No"}
                    {...register("paymentTerms.isPartial")}
                    // onChange={}
                  />
                  <label>NO</label>
                </div>
              </div>
            </div>
          </div>
          <div className="vLine"></div>
          <div className="ptInterest">
            <div className="maintitle">INTEREST</div>
            <div className="radioBack">
              <span>
                Is your supplier charging you interest/have you agreed a premium
                for extended payment terms?
              </span>
              <div>
                <div>
                  <input
                    type="radio"
                    name="ptPremiumRadio"
                    value="Yes"
                    checked={selectedRadioBtn === "Yes"}
                    onChange={handleRadioClick}
                  />
                  <label>Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="ptPremiumRadio"
                    value="No"
                    checked={selectedRadioBtn === "No"}
                    onChange={handleRadioClick}
                  />
                  <label>No</label>
                </div>
              </div>
              {selectedRadioBtn == "Yes" ? (
                <>
                  <div className="inputContainer">
                    <span>
                      Which currency is the interest/premium charged in?
                    </span>
                    <select
                      defaultValue={state.paymentTerms.interest.currency}
                      id=""
                      className="inputs"
                      {...register("paymentTerms.interest.currency", {
                        required: selectedRadioBtn == "Yes",
                      })}
                    >
                      <option value="">Select currency</option>
                      <option value="INR">INR</option>
                    </select>
                  </div>
                  <div className="inputContainer">
                    <span>
                      What is the total value of the interest/premium?
                    </span>
                    <input
                      type="text"
                      id="percentage"
                      placeholder="Percentage..."
                      className="inputs"
                      defaultValue={state.paymentTerms.interest.rate}
                      {...register("paymentTerms.interest.rate", {
                        required: selectedRadioBtn == "Yes",
                      })}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="radioBack">
              <span>Is the interest rate/premium fixed?</span>
              <div>
                <div>
                  <input
                    type="radio"
                    name="ptPremiumFixedRadio"
                    value="Yes"
                    checked={selectedRadioBtn1 === "Yes"}
                    onChange={handleRadioClick1}
                  />
                  <label>Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="ptPremiumFixedRadio"
                    value="No"
                    checked={selectedRadioBtn1 === "No"}
                    onChange={handleRadioClick1}
                  />
                  <label>No</label>
                </div>
              </div>
              {selectedRadioBtn1 == "Yes" ? (
                <div className="inputContainer">
                  <span>Fixed interest rate value</span>
                  <input
                    type="text"
                    className="inputs"
                    id="percentage"
                    placeholder="Percentage..."
                    defaultValue={state.paymentTerms.interest.fixedRate}
                    {...register("paymentTerms.interest.fixedRate", {
                      required: selectedRadioBtn1 == "Yes",
                    })}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="radioBack">
              <span>Is the interest rate/premium degressive?</span>
              <div>
                <div>
                  <input
                    type="radio"
                    name="ptPremiumDegressiveRadio"
                    value="Yes"
                    checked={selectedRadioBtn2 === "Yes"}
                    onChange={handleRadioClick2}
                  />
                  <label>Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="ptPremiumDegressiveRadio"
                    value="No"
                    checked={selectedRadioBtn2 === "No"}
                    onChange={handleRadioClick2}
                  />
                  <label>No</label>
                </div>
              </div>
              {selectedRadioBtn2 == "Yes" ? (
                <div className="inputContainer">
                  <span>Degressiv interest rate description</span>
                  <input
                    type="text"
                    className="inputs"
                    placeholder="Degressiv interest rate description"
                    defaultValue={state.paymentTerms.interest.degressiveRate}
                    {...register("paymentTerms.interest.degressiveRate", {
                      required: selectedRadioBtn2 == "Yes",
                    })}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="vLine"></div>
          <div className="ptVID">
            <div className="maintitle">PAYMENT TYPE</div>
            <div className="radioBack">
              <span>
                What is the payment type agreed upon for this transaction?
                (Short, Medium, or Short-Medium)
              </span>
              <div></div>
              <div className="inputContainer">
                <span>Payment Type</span>
                <select
                  className="inputs"
                  id=""
                  defaultValue={state.paymentTerms.paymentType}
                  {...register("paymentTerms.paymentType", { required: true })}
                >
                  <option value="">Payment type...</option>
                  <option value="Short">Short</option>
                  <option value="Medium">Medium</option>
                  <option value="Short Medium">Short Medium</option>
                </select>
              </div>
            </div>
            <div className="inputContainer">
              <span>Payment Duration</span>
              <input
                type="text"
                className="inputs"
                placeholder="Payment duration..."
                defaultValue={state.paymentTerms.paymentDuration}
                {...register("paymentTerms.paymentDuration", {
                  required: true,
                })}
              />
            </div>
            <br />
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
