import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import {
  CreatePaymentTerm,
  InterestType,
  PaymentTypes,
} from "src/types/payment_terms";
import React, { useRef } from "react";
import { Control, Controller, UseFormSetValue, useForm } from "react-hook-form";
import { NextPageContext } from "next/types";
import { useRouter } from "next/router";
import usePaymentTermForm from "@hooks/buyerApplication/usePaymentTerms";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "sonner";
import { CURRENCIES } from "@utils/lib/constants";

type CustomRadioProps = {
  control: Control<CreatePaymentTerm, any>;
  name: "interestExists";
  setValue: UseFormSetValue<CreatePaymentTerm>;
};

type PartialRefinancingRadioProps = {
  control: Control<CreatePaymentTerm, any>;
  name: "partialRefinancing";
};

type PaymentTermsConclusionRadioProps = {
  control: Control<CreatePaymentTerm, any>;
  name: "isConcluded";
};
function InterestRadio({ control, name, setValue }: CustomRadioProps) {
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
              onChange={() => {
                onChange(true);
                setValue("interestType", InterestType.FIXED);
              }} // send value to hook form
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
                  setValue("interestCurrency", null);
                  setValue("interestPercentage", null);
                  setValue("interestType", InterestType.NONE);
                  setValue("interestFixedRate", null);
                  setValue("interestDegressiveRate", null);
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

function PartialFinancingRadio({
  control,
  name,
}: PartialRefinancingRadioProps) {
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
function PaymentTermsConclusionRadio({
  control,
  name,
}: PaymentTermsConclusionRadioProps) {
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
    usePaymentTermForm(applicationID);
  const {
    register,
    setValue,
    reset,
    control,
    trigger,
    watch,
    getValues,
    formState: { errors },
  } = useForm<CreatePaymentTerm>({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(
      schemaValidation as Yup.ObjectSchema<CreatePaymentTerm>
    ),
  });
  const paymentDurationRef = useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    reset(queryResult.data);
  }, [queryResult.data]);

  const onchange = async () => {
    const data = getValues();
    try {
      // validate data
      const validated = await schemaValidation.validate(data);
      console.log("validations:", validated);
      handleDebouncedChange(validated as CreatePaymentTerm);
    } catch (e) {
      console.log(e);
    }
  };

  const onBack = () => {
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/${applicationID}/orderDetails`
    );
  };

  const onSubmit = async () => {
    const data = getValues();
    await trigger();
    try {
      await schemaValidation.validate(data);

      router.push(
        `/users/${
          router.asPath.split("/")[2]
        }/entities/${entityID}/quick/${applicationID}/security`
      );
    } catch (e) {
      toast.error(`${e}`);
      console.log(e);
    }
  };

  return (
    <ApplicationLayout>
      <form onChange={onchange} className="ptContainer">
        <div className="ptDetails">
          <div className="maintitle">DETAILS</div>
          <div className="radioBack">
            <span>Have payment terms already been concluded? </span>
            <PaymentTermsConclusionRadio
              control={control}
              name={"isConcluded"}
            />
          </div>
          <div className="radioBack">
            <span>Would you accept a partial refinancing? </span>
            <PartialFinancingRadio
              control={control}
              name={"partialRefinancing"}
            />
          </div>
        </div>
        <div className="vLine"></div>
        <div className="ptInterest">
          <div className="maintitle">INTEREST</div>
          <div className="radioBack">
            <span>
              Is your supplier charging you interest/have you agreed a premium
              for extended payment terms?{" "}
            </span>
            <InterestRadio
              control={control}
              name={"interestExists"}
              setValue={setValue}
            />
            {watch("interestExists") && (
              <>
                <div className="inputContainer">
                  <span>
                    Which currency is the interest/premium charged in?{" "}
                    <b style={{ color: "#f84141" }}>*</b>
                  </span>
                  <select
                    className={
                      errors.interestCurrency ? "inputs inputRed" : "inputs"
                    }
                    {...register("interestCurrency")}
                    placeholder={
                      errors.interestCurrency
                        ? errors.interestCurrency.message
                        : "Currency"
                    }
                  >
                    <option value="">Select Currency</option>
                    {CURRENCIES.map((currency) => (
                      <option key={currency.cc} value={currency.cc}>
                        {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="inputContainer">
                  <span>
                    What is the total value of the interest/premium?{" "}
                    <b style={{ color: "#f84141" }}>*</b>
                  </span>
                  <input
                    type="text"
                    id="percentage"
                    placeholder={
                      errors.interestPercentage
                        ? errors.interestPercentage.message
                        : "interest percentage"
                    }
                    className={
                      errors.interestPercentage ? "inputs inputRed" : "inputs"
                    }
                    {...register("interestPercentage")}
                  />
                </div>
                <div className="inputContainer">
                  <span>
                    Interest Type (Fixed or Degressive){" "}
                    <b style={{ color: "#f84141" }}>*</b>
                  </span>

                  <select className="inputs" {...register("interestType")}>
                    <option value={InterestType.FIXED}>Fixed</option>
                    <option value={InterestType.DEGRESSIVE}>Degressive</option>
                  </select>
                </div>
                {
                  // if interest type is fixed
                  watch("interestType") === InterestType.FIXED && (
                    <div className="inputContainer">
                      <span>
                        Fixed interest rate{" "}
                        <b style={{ color: "#f84141" }}>*</b>
                      </span>
                      <input
                        {...register("interestFixedRate")}
                        type="text"
                        placeholder={
                          errors.interestFixedRate
                            ? errors.interestFixedRate.message
                            : "fixed interest rate"
                        }
                        className={
                          errors.interestFixedRate
                            ? "inputs inputRed"
                            : "inputs"
                        }
                        id="percentage"
                      />
                    </div>
                  )
                }
                {
                  // if interest type is degressive
                  watch("interestType") === InterestType.DEGRESSIVE && (
                    <div className="inputContainer">
                      <span>
                        Degressive interest rate{" "}
                        <b style={{ color: "#f84141" }}>*</b>
                      </span>
                      <input
                        {...register("interestDegressiveRate")}
                        type="text"
                        id="percentage"
                        placeholder={
                          errors.interestDegressiveRate
                            ? errors.interestDegressiveRate.message
                            : "degressive interest rate"
                        }
                        className={
                          errors.interestDegressiveRate
                            ? "inputs inputRed"
                            : "inputs"
                        }
                      />
                    </div>
                  )
                }

                {/* <div className="radioBack">
                    <span>Is the interest rate/premium fixed?</span>
                    <div>
                      <div>
                        <input
                          type="radio"
                          name="ptPremiumFixedRadio"
                          value="Yes"
                          onChange={handleRadioClick1}
                        />
                        <label>Yes</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="ptPremiumFixedRadio"
                          value="No"
                          onChange={handleRadioClick1}
                        />
                        <label>No</label>
                      </div>
                    </div>
                    {selectedRadioBtn1 == "Yes" && (
                      <div className="inputContainer">
                        <span>Fixed interest rate value</span>
                        <input
                          type="text"
                          className="inputs"
                          id="percentage"
                          placeholder="Percentage..."
                        />
                      </div>
                    )}
                  </div>
                  {selectedRadioBtn1 == "No" && (
                    <div className="radioBack">
                      <span>Is the interest rate/premium degressive?</span>
                      <div>
                        <div>
                          <input
                            type="radio"
                            name="ptPremiumDegressiveRadio"
                            value="Yes"
                            onChange={handleRadioClick2}
                          />
                          <label>Yes</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="ptPremiumDegressiveRadio"
                            value="No"
                            onChange={handleRadioClick2}
                          />
                          <label>No</label>
                        </div>
                      </div>
                      {selectedRadioBtn2 == "Yes" && (
                        <div className="inputContainer">
                          <span>Degressiv interest rate description</span>
                          <input
                            type="text"
                            className="inputs"
                            placeholder="Degressiv interest rate description"
                          />
                        </div>
                      )}
                    </div>
                  )} */}
              </>
            )}
          </div>
        </div>
        <div className="vLine"></div>
        <div className="ptVID">
          <div className="maintitle">PAYMENT TYPE</div>

          <div></div>
          <div className="inputContainer">
            <span>
              What is the payment type agreed upon for this transaction? (Short,
              Medium, or Short-Medium) <b style={{ color: "#f84141" }}>*</b>
            </span>
            <select
              className={errors.paymentType ? "inputs inputRed" : "inputs"}
              {...register("paymentType")}
            >
              <option value={PaymentTypes.SHORT}>Short</option>
              <option disabled value={PaymentTypes.SHORT_MEDIUM}>
                Short Medium
              </option>
              <option disabled value={PaymentTypes.MEDIUM}>
                Medium
              </option>
            </select>
          </div>
          <div className="inputContainer">
            <span>
              What is the currency agreed for the downpayment?{" "}
              <b style={{ color: "#f84141" }}>*</b>
            </span>
            <select
              className={
                errors.downpaymentCurrency ? "inputs inputRed" : "inputs"
              }
              {...register("downpaymentCurrency")}
              placeholder={
                errors.downpaymentCurrency
                  ? errors.downpaymentCurrency.message
                  : "Currency"
              }
            >
              <option value="">Select Currency</option>
              {CURRENCIES.map((currency) => (
                <option key={currency.cc} value={currency.cc}>
                  {currency.name}
                </option>
              ))}
            </select>
          </div>
          <div className="inputContainer">
            <span>
              How much is the downpayment amount?{" "}
              <b style={{ color: "#f84141" }}>*</b>
            </span>
            <input
              {...register("downpaymentAmount")}
              type="text"
              className={
                errors.downpaymentAmount ? "inputs inputRed" : "inputs"
              }
              placeholder={
                errors.downpaymentAmount
                  ? errors.downpaymentAmount.message
                  : "downpayment amount"
              }
            />
          </div>
          <div className="inputContainer">
            <span>
              Description for the short term downpayment?{" "}
              <b style={{ color: "#f84141" }}>*</b>
            </span>
            <input
              {...register("downpaymentDescription")}
              type="text"
              className={
                errors.downpaymentDescription ? "inputs inputRed" : "inputs"
              }
              placeholder={
                errors.downpaymentDescription
                  ? errors.downpaymentDescription.message
                  : "downpayment description"
              }
            />
          </div>
          <div className="inputContainer">
            <span>
              What is the currency agreed for the balance?{" "}
              <b style={{ color: "#f84141" }}>*</b>
            </span>
            <select
              className={errors.balanceCurrency ? "inputs inputRed" : "inputs"}
              {...register("balanceCurrency")}
              placeholder={
                errors.balanceCurrency
                  ? errors.balanceCurrency.message
                  : "Currency"
              }
            >
              <option value="">Select Currency</option>
              {CURRENCIES.map((currency) => (
                <option key={currency.cc} value={currency.cc}>
                  {currency.name}
                </option>
              ))}
            </select>
          </div>
          <div className="inputContainer">
            <span>
              How much is the balance amount?{" "}
              <b style={{ color: "#f84141" }}>*</b>
            </span>
            <input
              {...register("balanceAmount")}
              type="text"
              className={errors.balanceAmount ? "inputs inputRed" : "inputs"}
              placeholder={
                errors.balanceAmount
                  ? errors.balanceAmount.message
                  : "downpayment description"
              }
            />
          </div>
          <div className="inputContainer">
            <span>
              When will the balance be paid?{" "}
              <b style={{ color: "#f84141" }}>*</b>
            </span>
            <input
              type="date"
              id="calendar"
              className={
                errors.balancePaymentDeadline ? "inputs inputRed" : "inputs"
              }
              placeholder={
                errors.balancePaymentDeadline
                  ? `${errors.balancePaymentDeadline.message}`
                  : "deadline"
              }
              {...register("balancePaymentDeadline")}
            />
          </div>
          <div className="inputContainer">
            <span>
              Please describe if a payment vehicle/SPV will be utilised?{" "}
              <b style={{ color: "#f84141" }}>*</b>
            </span>
            <input
              {...register("paymentVehicleDescription")}
              type="text"
              className={
                errors.paymentVehicleDescription ? "inputs inputRed" : "inputs"
              }
              placeholder={
                errors.paymentVehicleDescription
                  ? errors.paymentVehicleDescription.message
                  : "SPV description"
              }
            />
          </div>

          <div className="inputContainer">
            <span>
              Payment Duration in days <b style={{ color: "#f84141" }}>*</b>
            </span>
            <Controller
              control={control}
              name={"paymentDuration"}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <input
                  ref={(e) => {
                    ref(e);
                    paymentDurationRef.current = e;
                  }}
                  type="text"
                  className={
                    errors.paymentDuration ? "inputs inputRed" : "inputs"
                  }
                  placeholder={
                    errors.paymentDuration
                      ? errors.paymentDuration.message
                      : "Payment Duration in days"
                  }
                />
              )}
            />
          </div>
        </div>
      </form>

      <BottomBar onBack={onBack} onSubmit={onSubmit}></BottomBar>
    </ApplicationLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  return { props: { query } };
}

export default Index;
