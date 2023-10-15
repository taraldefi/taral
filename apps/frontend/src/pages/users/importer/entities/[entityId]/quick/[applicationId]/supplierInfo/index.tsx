import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

function Index() {
  const [selectedRadioBtn, setSelectedRadioBtn] = React.useState("No");
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn(e.currentTarget.value);

  const router = useRouter();
  const entityID = router.query.entityId;
  const applicationID = router.query.applicationId;

  type FormValues = {
    supplierInformation: {
      company: {
        companyName: "";
        dateEstablished: "";
        phoneNumber: "";
        registrationNumbers: "";
        address: {
          city: "";
          addressLine1: "";
          addressLine2: "";
          postalCode: "";
        };
      };
    };
    relationshipWithSupplier: {
      shareHoldingRelationship: "";
      influence: "";
      paymentExperience: {
        description: "";
        length: "";
        noOfDeals: "";
        avgBusinessVol: "";
        history: "";
        delays: "";
      };
    };
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: any) => {
    console.log("data:", data);
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/${applicationID}/orderDetails`
    );
  };

  const onBack = () => {
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/${applicationID}/importerInfo`
    );
  };
  return (
    <div>
      <ApplicationLayout>
        <div className="exporterInfoContainer">
          <div className="generalInfo">
            <div className="maintitle">GENERAL INFO</div>
            <div>
              <span>Supplier&apos;s company name</span>
              <input
                type="text"
                className="inputs"
                placeholder="Company name..."
                {...register("supplierInformation.company.companyName", {
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
                {...register("supplierInformation.company.phoneNumber", {
                  required: true,
                })}
              />
            </div>
            <div>
              <span>Address</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 1..."
                {...register(
                  "supplierInformation.company.address.addressLine1",
                  { required: true }
                )}
              />
            </div>
            <div>
              <span>Address Line 2</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 2..."
                {...register(
                  "supplierInformation.company.address.addressLine2",
                  { required: true }
                )}
              />
            </div>
            <div>
              <span>Company Post Code</span>
              <input
                type="text"
                className="inputs"
                placeholder="Post code..."
                {...register("supplierInformation.company.address.postalCode", {
                  required: true,
                })}
              />
            </div>
            <div></div>
          </div>
          <div className="vLine"></div>
          <div className="taxAndRevenue">
            <div className="maintitle">RELATIONSHIP WITH SUPPLIER</div>

            <div className="radioBack">
              <span>
                Do you have previous payment experience with the Supplier?
              </span>
              <div>
                <div>
                  <input
                    type="radio"
                    id="Audited"
                    name="financials"
                    value="Yes"
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
                    onChange={handleRadioClick}
                  />
                  <label htmlFor="In-house">NO</label>
                </div>
              </div>
            </div>
            {selectedRadioBtn == "Yes" && (
              <>
                <div>
                  <span>Describe your previous payment experience.</span>
                  <input
                    className="inputs"
                    id="greyed"
                    placeholder="Desciption..."
                    {...register(
                      "relationshipWithSupplier.paymentExperience.description",
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
                    {...register(
                      "relationshipWithSupplier.paymentExperience.length",
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
                    {...register(
                      "relationshipWithSupplier.paymentExperience.noOfDeals",
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
                    {...register(
                      "relationshipWithSupplier.paymentExperience.avgBusinessVol",
                      { required: selectedRadioBtn == "Yes" }
                    )}
                  />
                </div>
                <div>
                  <span>Payment history with Supplier</span>
                  <select
                    className="inputs"
                    id="greyed"
                    {...register(
                      "relationshipWithSupplier.paymentExperience.history",
                      { required: selectedRadioBtn == "Yes" }
                    )}
                  >
                    <option value="">Select type...</option>
                    <option value="ON_TIME">On time</option>
                    <option value="DELAYS">Delays</option>
                  </select>
                </div>
              </>
            )}
            {Object.keys(errors).length != 0 && (
              <span className="errorMessage">
                Please fill all the required fields to continue
              </span>
            )}
          </div>

          <div className="otherInfo"></div>
        </div>
        <BottomBar
          onSubmit={handleSubmit(onSubmit)}
          onBack={onBack}
        ></BottomBar>
      </ApplicationLayout>
    </div>
  );
}

export default Index;
