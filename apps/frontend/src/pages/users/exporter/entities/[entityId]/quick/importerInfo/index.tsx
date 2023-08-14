import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import {
  exporterQuickApplicationAtom,
  previousPaymentRadioButtonAtom as radioButtonAtom,
} from "@store/applicationStore";

type FormValues = {
  importerInfo: {
    companyName: string;
    phoneNo: string;
    address: string;
    postalCode: string;
    totalRevenue: string;
    previousPaymentHistory: {
      description: string;
      lengthOfPaymentExperience: string;
      noOfDeals: string;
      avgVol: string;
      paymentHistory: string;
    };
  };
};

function Index() {
  const [selectedRadioBtn, setSelectedRadioBtn] = useAtom(radioButtonAtom);

  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedRadioBtn(e.currentTarget.value);
  };

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

  console.info("state:", state);

  const onSubmit = (data: any) => {
    console.info("data:", data);
    if (!selectedRadioBtn) return;
    if (selectedRadioBtn === "No") {
      reset({
        importerInfo: {
          previousPaymentHistory: {
            description: "",
            lengthOfPaymentExperience: "",
            noOfDeals: "",
            avgVol: "",
            paymentHistory: "",
          },
        },
      });
      data.importerInfo.previousPaymentHistory = {
        description: "",
        lengthOfPaymentExperience: "",
        noOfDeals: "",
        avgVol: "",
        paymentHistory: "",
      };
    }
    updateAction(data);

    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/contract`
    );
  };

  const onBack = () => {
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/exporterInfo`
    );
  };

  return (
    <div>
      <ApplicationLayout>
        <div className="exporterInfoContainer">
          <div className="generalInfo">
            <div className="maintitle">GENERAL INFO</div>
            <div>
              <span>Importer&apos;s company name</span>
              <input
                type="text"
                className="inputs"
                placeholder="Company name..."
                defaultValue={state.importerInfo.companyName}
                {...register("importerInfo.companyName", { required: true })}
              />
            </div>
            <div>
              <span>Phone Number</span>
              <input
                type="text"
                className="inputs"
                placeholder="Contact number..."
                defaultValue={state.importerInfo.phoneNo}
                {...register("importerInfo.phoneNo", { required: true })}
              />
            </div>
            <div>
              <span>Address</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 1..."
                defaultValue={state.importerInfo.address}
                {...register("importerInfo.address", { required: true })}
              />
            </div>
            <div>
              <span>Address Line 2</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 2..."
              />
            </div>
            <div>
              <span>Company Post Code</span>
              <input
                type="text"
                className="inputs"
                placeholder="Post code..."
                defaultValue={state.importerInfo.postalCode}
                {...register("importerInfo.postalCode", { required: true })}
              />
            </div>
            <div></div>
          </div>
          <div className="vLine"></div>
          <div className="taxAndRevenue">
            <div className="maintitle">RELATIONSHIP WITH IMPORTER</div>

            <div className="radioBack">
              <span>
                Do you have previous payment experience with the Importers?
              </span>
              <div>
                <div>
                  <input
                    type="radio"
                    id="Audited"
                    name="financials"
                    value="Yes"
                    checked={selectedRadioBtn === "Yes"}
                    onChange={handleRadioClick}
                  />
                  <label htmlFor="Audited">YES</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="In-house"
                    name="financials"
                    value="No"
                    checked={selectedRadioBtn === "No"}
                    onChange={handleRadioClick}
                  />
                  <label htmlFor="In-house">NO</label>
                </div>
              </div>
              {selectedRadioBtn == "Yes" ? (
                <>
                  {" "}
                  <div>
                    <span>Describe your previous payment experience.</span>
                    <input
                      className="inputs"
                      id="greyed"
                      placeholder="Desciption..."
                      defaultValue={
                        state.importerInfo.previousPaymentHistory.description
                      }
                      {...register(
                        "importerInfo.previousPaymentHistory.description",
                        { required: selectedRadioBtn == "Yes" }
                      )}
                    />
                  </div>
                  <div>
                    <span>Length of payment experience</span>
                    <input
                      className="inputs"
                      id="greyed"
                      placeholder="Payment length..."
                      defaultValue={
                        state.importerInfo.previousPaymentHistory
                          .lengthOfPaymentExperience
                      }
                      {...register(
                        "importerInfo.previousPaymentHistory.lengthOfPaymentExperience",
                        { required: selectedRadioBtn == "Yes" }
                      )}
                    />
                  </div>
                  <div>
                    <span>Number of deals</span>
                    <input
                      className="inputs"
                      id="greyed"
                      placeholder="Number of deals..."
                      defaultValue={
                        state.importerInfo.previousPaymentHistory.noOfDeals
                      }
                      {...register(
                        "importerInfo.previousPaymentHistory.noOfDeals",
                        { required: selectedRadioBtn == "Yes" }
                      )}
                    />
                  </div>
                  <div>
                    <span>Average volume of business with your customer</span>
                    <input
                      className="inputs"
                      id="greyed"
                      placeholder="Business volume..."
                      defaultValue={
                        state.importerInfo.previousPaymentHistory.avgVol
                      }
                      {...register(
                        "importerInfo.previousPaymentHistory.avgVol",
                        { required: selectedRadioBtn == "Yes" }
                      )}
                    />
                  </div>
                  <div>
                    <span>Payment history with Supplier</span>
                    <select
                      className="inputs"
                      id="greyed"
                      defaultValue={
                        state.importerInfo.previousPaymentHistory.paymentHistory
                      }
                      {...register(
                        "importerInfo.previousPaymentHistory.paymentHistory",
                        { required: selectedRadioBtn == "Yes" }
                      )}
                    >
                      <option value="">Select type...</option>
                      <option value="Short">Short</option>
                      <option value="Medium">Medium</option>
                      <option value="Short Medium">Short Medium</option>
                    </select>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            {Object.keys(errors).length != 0 && (
              <span className="errorMessage">
                Please fill all the required fields to continue
              </span>
            )}
          </div>

          <div className="otherInfo"></div>
        </div>
        <BottomBar
          onBack={onBack}
          onSubmit={handleSubmit(onSubmit)}
        ></BottomBar>
      </ApplicationLayout>
    </div>
  );
}

export default Index;
