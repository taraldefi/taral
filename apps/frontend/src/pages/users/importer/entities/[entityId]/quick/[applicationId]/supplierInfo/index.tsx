import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { yupResolver } from "@hookform/resolvers/yup";
import useSupplierInformationForm from "@hooks/buyerApplication/useSupplierInformation";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Control, Controller, UseFormSetValue, useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { toast } from "sonner";
import { CreateSupplierInformationForBuyerApplication } from "src/types/supplier_info_for_buyer";
import * as Yup from "yup";

type CustomRadioProps = {
  control: Control<CreateSupplierInformationForBuyerApplication, any>;
  name: "relationshipWithSupplier.paymentExperience.exists";
  setValue: UseFormSetValue<CreateSupplierInformationForBuyerApplication>;
};
function CustomBooleanInput({ control, name, setValue }: CustomRadioProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <div>
          <div>
            <input
              type="radio"
              onBlur={onBlur} // notify when input is touched
              onChange={() => onChange(true)} // send value to hook form
              checked={value === true}
              ref={ref}
            />
            <label htmlFor="Audited">YES</label>
          </div>
          <div>
            <input
              type="radio"
              onBlur={onBlur} // notify when input is touched
              onChange={() => {
                onChange(false);
                {
                  // if user chooses no, nullify all the fields
                  setValue(
                    "relationshipWithSupplier.paymentExperience.description",
                    null
                  );
                  setValue(
                    "relationshipWithSupplier.paymentExperience.length",
                    null
                  );
                  setValue(
                    "relationshipWithSupplier.paymentExperience.noOfDeals",
                    null
                  );
                  setValue(
                    "relationshipWithSupplier.paymentExperience.avgBusinessVol",
                    null
                  );
                  setValue(
                    "relationshipWithSupplier.paymentExperience.history",
                    null
                  );
                }
              }} // send value to hook form
              checked={value === false}
              ref={ref}
            />
            <label htmlFor="In-house">NO</label>
          </div>
        </div>
      )}
    />
  );
}

function Index({ ...props }) {
  const { query } = props;
  const router = useRouter();
  const entityID = query.entityId;
  const applicationID = query.applicationId;
  const { schemaValidation, handleDebouncedChange, queryResult } =
    useSupplierInformationForm(applicationID);

  const {
    register,
    formState,
    reset,
    getValues,
    control,
    trigger,
    setValue,
    watch,
  } = useForm<CreateSupplierInformationForBuyerApplication>({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(
      schemaValidation as Yup.ObjectSchema<CreateSupplierInformationForBuyerApplication>
    ),
  });
  console.log(queryResult.data);

  const { errors } = formState;

  const onChange = async () => {
    const data = getValues();

    try {
      const validated = await schemaValidation.validate(data);
      console.log("valdiations:", validated);
      handleDebouncedChange(
        validated as CreateSupplierInformationForBuyerApplication
      );
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    reset(queryResult.data);
    // const progress = calculateProgress();
    // setProgress(parseInt(progress));
  }, [queryResult.data]);

  const onSubmit = async () => {
    await trigger();
    const data = getValues();

    try {
      await schemaValidation.validate(data);
      router.push(
        `/users/${
          router.asPath.split("/")[2]
        }/entities/${entityID}/quick/${applicationID}/orderDetails`
      );
    } catch (error) {
      toast.error(`${error}`);
    }
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
        <form onChange={onChange} className="exporterInfoContainer">
          <div className="generalInfo">
            <div className="maintitle">GENERAL INFO</div>
            <div className="form-item">
              <span>
                Supplier&apos;s company name{" "}
                <b style={{ color: "#f84141" }}>*</b>
              </span>
              <input
                type="text"
                className={
                  errors.supplierInformation?.company?.companyName
                    ? "inputs inputRed"
                    : "inputs"
                }
                placeholder={
                  errors.supplierInformation?.company?.companyName
                    ? `${errors.supplierInformation?.company?.companyName.message}`
                    : "company name"
                }
                {...register("supplierInformation.company.companyName")}
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
                    errors.supplierInformation?.company?.dateEstablished
                      ? "inputs inputRed"
                      : "inputs"
                  }
                  placeholder={
                    errors.supplierInformation?.company?.dateEstablished
                      ? `${errors.supplierInformation?.company?.dateEstablished.message}`
                      : "date established"
                  }
                  {...register("supplierInformation.company.dateEstablished")}
                />
              </div>
              <div style={{ flexGrow: 1 }} className="form-item">
                <span>
                  Registration Number <b style={{ color: "#f84141" }}>*</b>
                </span>
                <input
                  type="text"
                  className={
                    errors.supplierInformation?.company?.registrationNumbers
                      ? "inputs inputRed"
                      : "inputs"
                  }
                  placeholder={
                    errors.supplierInformation?.company?.registrationNumbers
                      ? `${errors.supplierInformation?.company?.registrationNumbers.message}`
                      : "registration number"
                  }
                  {...register(
                    "supplierInformation.company.registrationNumbers"
                  )}
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
                name="supplierInformation.company.phoneNumber"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <PhoneInput
                    inputStyle={
                      errors.supplierInformation?.company?.phoneNumber
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
                      errors.supplierInformation?.company?.phoneNumber
                        ? `${errors.supplierInformation?.company?.phoneNumber.message}`
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
                Address Line 1 <b style={{ color: "#f84141" }}>*</b>
              </span>
              <input
                type="text"
                className={
                  errors.supplierInformation?.company?.address?.addressLine1
                    ? "inputs inputRed"
                    : "inputs"
                }
                placeholder={
                  errors.supplierInformation?.company?.address?.addressLine1
                    ? `${errors.supplierInformation?.company?.address?.addressLine1.message}`
                    : "address line 1"
                }
                {...register(
                  "supplierInformation.company.address.addressLine1"
                )}
              />
            </div>
            <div className="form-item">
              <span>
                Address Line 2 <b style={{ color: "#f84141" }}>*</b>
              </span>
              <input
                type="text"
                className={
                  errors.supplierInformation?.company?.address?.addressLine2
                    ? "inputs inputRed"
                    : "inputs"
                }
                placeholder={
                  errors.supplierInformation?.company?.address?.addressLine2
                    ? `${errors.supplierInformation?.company?.address?.addressLine2.message}`
                    : "address line 2"
                }
                {...register(
                  "supplierInformation.company.address.addressLine2"
                )}
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
                    errors.supplierInformation?.company?.address?.city
                      ? "inputs inputRed"
                      : "inputs"
                  }
                  placeholder={
                    errors.supplierInformation?.company?.address?.city
                      ? `${errors.supplierInformation?.company?.address?.city.message}`
                      : "city"
                  }
                  {...register("supplierInformation.company.address.city")}
                />
              </div>
              <div style={{ flexGrow: 1 }} className="form-item">
                <span>
                  Company Post Code <b style={{ color: "#f84141" }}>*</b>
                </span>
                <input
                  type="text"
                  className={
                    errors.supplierInformation?.company?.address?.postalCode
                      ? "inputs inputRed"
                      : "inputs"
                  }
                  placeholder={
                    errors.supplierInformation?.company?.address?.postalCode
                      ? `${errors.supplierInformation?.company.address.postalCode.message}`
                      : "postal code"
                  }
                  {...register(
                    "supplierInformation.company.address.postalCode"
                  )}
                />
              </div>
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
              <CustomBooleanInput
                control={control}
                name={"relationshipWithSupplier.paymentExperience.exists"}
                setValue={setValue}
              />
              {watch("relationshipWithSupplier.paymentExperience.exists") && (
                <>
                  <div className="form-item">
                    <span>
                      Describe your previous payment experience.{" "}
                      <b style={{ color: "#f84141" }}>*</b>
                    </span>
                    <input
                      className={
                        errors.relationshipWithSupplier?.paymentExperience
                          ?.description
                          ? "inputs inputRed"
                          : "inputs"
                      }
                      id="greyed"
                      placeholder={
                        errors.relationshipWithSupplier?.paymentExperience
                          ?.description
                          ? errors.relationshipWithSupplier?.paymentExperience
                              ?.description?.message
                          : "description"
                      }
                      {...register(
                        "relationshipWithSupplier.paymentExperience.description"
                      )}
                    />
                  </div>
                  <div className="form-item">
                    <span>
                      Length of payment experience{" "}
                      <b style={{ color: "#f84141" }}>*</b>
                    </span>
                    <input
                      className={
                        errors.relationshipWithSupplier?.paymentExperience
                          ?.length
                          ? "inputs inputRed"
                          : "inputs"
                      }
                      id="greyed"
                      placeholder={
                        errors.relationshipWithSupplier?.paymentExperience
                          ?.length
                          ? errors.relationshipWithSupplier?.paymentExperience
                              ?.length?.message
                          : "length of payment experience"
                      }
                      {...register(
                        "relationshipWithSupplier.paymentExperience.length"
                      )}
                    />
                  </div>
                  <div className="form-item">
                    <span>
                      Number of deals <b style={{ color: "#f84141" }}>*</b>
                    </span>
                    <input
                      className={
                        errors.relationshipWithSupplier?.paymentExperience
                          ?.noOfDeals
                          ? "inputs inputRed"
                          : "inputs"
                      }
                      id="greyed"
                      placeholder={
                        errors.relationshipWithSupplier?.paymentExperience
                          ?.noOfDeals
                          ? errors.relationshipWithSupplier?.paymentExperience
                              ?.noOfDeals?.message
                          : "number of deals"
                      }
                      {...register(
                        "relationshipWithSupplier.paymentExperience.noOfDeals"
                      )}
                    />
                  </div>
                  <div className="form-item">
                    <span>
                      Avg. volume of business with your customer{" "}
                      <b style={{ color: "#f84141" }}>*</b>
                    </span>
                    <input
                      className={
                        errors.relationshipWithSupplier?.paymentExperience
                          ?.avgBusinessVol
                          ? "inputs inputRed"
                          : "inputs"
                      }
                      id="greyed"
                      placeholder={
                        errors.relationshipWithSupplier?.paymentExperience
                          ?.avgBusinessVol
                          ? errors.relationshipWithSupplier?.paymentExperience
                              ?.avgBusinessVol?.message
                          : "average volume of business"
                      }
                      {...register(
                        "relationshipWithSupplier.paymentExperience.avgBusinessVol"
                      )}
                    />
                  </div>
                  <div className="form-item">
                    <span>
                      Payment history with Supplier{" "}
                      <b style={{ color: "#f84141" }}>*</b>
                    </span>
                    <select
                      className={
                        errors.relationshipWithSupplier?.paymentExperience
                          ?.history
                          ? "inputs inputRed"
                          : "inputs"
                      }
                      id="greyed"
                      {...register(
                        "relationshipWithSupplier.paymentExperience.history"
                      )}
                    >
                      <option value={""}>Select type...</option>
                      <option value="ON_TIME">On time</option>
                      <option value="DELAYS">Delays</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            {/* {Object.keys(errors).length != 0 && (
              <>
                <span className="errorMessage">
                  Please fill all the required fields to continue
                </span>
                <br />
                <span className="errorMessage">
                  <b style={{ color: "#f84141" }}>*</b> Required fields
                </span>
              </>
            )} */}
          </div>

          <div className="otherInfo"></div>
        </form>
        <BottomBar onSubmit={onSubmit} onBack={onBack}></BottomBar>
      </ApplicationLayout>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  return { props: { query } };
}

export default Index;
