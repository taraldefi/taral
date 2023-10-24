import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { CreateSupplierInformationForBuyerApplication } from "src/types";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

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

function Index({ ...props }) {
  const { query } = props;
  const [selectedRadioBtn, setSelectedRadioBtn] = React.useState("No");
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn(e.currentTarget.value);
  const [updateMode, setUpdateMode] = React.useState(false);

  const router = useRouter();
  const entityID = query.entityId;
  const applicationID = query.applicationId;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSupplierInformationForBuyerApplication>();
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

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  return { props: { query } };
}

export default Index;
