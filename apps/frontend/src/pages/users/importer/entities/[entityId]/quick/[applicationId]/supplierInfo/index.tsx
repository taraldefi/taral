import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { yupResolver } from "@hookform/resolvers/yup";
import useSupplierInformationForm from "@hooks/buyerApplication/useSupplierInformation";
import supplierEntityService from "@services/supplierEntityService";
import { Company, SupplierEntityResponse } from "src/types";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Control, Controller, UseFormSetValue, useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { toast } from "sonner";
import { CreateSupplierInformationForBuyerApplication } from "src/types/supplier_info_for_buyer";
import * as Yup from "yup";
import convertDate from "@utils/lib/convertDate";

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
  const { query, entities } = props;
  const router = useRouter();
  const entityID = query.entityId;
  const applicationID = query.applicationId;
  const {
    schemaValidation,
    handleDebouncedChange,
    queryResult,
    companyInformation,
    setCompanyInformation,
  } = useSupplierInformationForm(applicationID);

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
    console.log("data", data);
    if (data.supplierId) {
      const companyData = await supplierEntityService.getEntity(
        data.supplierId
      );
      setCompanyInformation({
        dateEstablished: convertDate(companyData.incorporationDate),
        phoneNumber: companyData.phoneNumber,
        registrationNumber: companyData.registrationNumber,
        address: companyData.address,
      });
    }

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
                Choose your supplier <b style={{ color: "#f84141" }}>*</b>
              </span>

              <select
                className={errors.supplierId ? "inputs inputRed" : "inputs"}
                placeholder={
                  errors.supplierId ? `${errors.supplierId}` : "company name"
                }
                {...register("supplierId")}
              >
                <option value="">Select Supplier</option>
                {entities.map((item: SupplierEntityResponse) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
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
                  type="date"
                  id="calendar"
                  className={"inputs"}
                  disabled
                  defaultValue={companyInformation?.dateEstablished}
                />
              </div>
              <div style={{ flexGrow: 1 }} className="form-item">
                <span>Registration Number</span>
                <input
                  type="text"
                  className={"inputs"}
                  disabled
                  defaultValue={companyInformation?.registrationNumber}
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
              <span>Phone Number</span>
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
                defaultCountry="us"
                value={companyInformation?.phoneNumber}
              />
            </div>

            <div className="form-item">
              <span>Address Line 1</span>
              <input
                disabled
                type="text"
                className={"inputs"}
                defaultValue={companyInformation?.address.addressLine1}
              />
            </div>
            <div className="form-item">
              <span>Address Line 2</span>
              <input
                disabled
                type="text"
                className={"inputs"}
                defaultValue={companyInformation?.address.addressLine2}
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
                <span>City</span>
                <input
                  disabled
                  type="text"
                  className={"inputs"}
                  defaultValue={companyInformation?.address.city}
                />
              </div>
              <div style={{ flexGrow: 1 }} className="form-item">
                <span>Company Post Code</span>
                <input
                  disabled
                  type="text"
                  className={"inputs"}
                  defaultValue={companyInformation?.address.postalCode}
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
  const res = await supplierEntityService.getAllEntity();
  const entities = res || [];
  console.log("entities", entities);
  return { props: { query, entities: entities } };
}

export default Index;
