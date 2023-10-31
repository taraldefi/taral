import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import {
  CreatePaymentTerm,
  InterestType,
  PaymentTypes,
} from "src/types/payment_terms";
import React from "react";
import { Control, Controller, UseFormSetValue, useForm } from "react-hook-form";
import { NextPageContext } from "next/types";
import { useRouter } from "next/router";
import usePaymentTermForm from "@hooks/buyerApplication/usePaymentTerms";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "sonner";

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
      <div className="ptContainer">
        <form onChange={onchange} className="ptItemsContainer">
          <div className="ptDetails">
            <div className="maintitle">DETAILS</div>
            <div className="radioBack">
              <span>Have payment terms already been concluded?</span>
              <PaymentTermsConclusionRadio
                control={control}
                name={"isConcluded"}
              />
            </div>
            <div className="radioBack">
              <span>Would you accept a partial refinancing?</span>
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
                for extended payment terms?
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
                      Which currency is the interest/premium charged in?
                    </span>
                    <input
                      type="text"
                      className="inputs"
                      {...register("interestCurrency")}
                      placeholder="Currency"
                    />
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
                      {...register("interestPercentage")}
                    />
                  </div>
                  <div className="inputContainer">
                    <span>Interest Type (Fixed or Degressive)</span>

                    <select className="inputs" {...register("interestType")}>
                      <option value={InterestType.FIXED}>Fixed</option>
                      <option value={InterestType.DEGRESSIVE}>
                        Degressive
                      </option>
                    </select>
                  </div>
                  {
                    // if interest type is fixed
                    watch("interestType") === InterestType.FIXED && (
                      <div className="inputContainer">
                        <span>Fixed interest rate </span>
                        <input
                          {...register("interestFixedRate")}
                          type="text"
                          className="inputs"
                          id="percentage"
                          placeholder="Percentage..."
                        />
                      </div>
                    )
                  }
                  {
                    // if interest type is degressive
                    watch("interestType") === InterestType.DEGRESSIVE && (
                      <div className="inputContainer">
                        <span>Degressive interest rate</span>
                        <input
                          {...register("interestDegressiveRate")}
                          type="text"
                          className="inputs"
                          id="percentage"
                          placeholder="Degressive interest rate description"
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
            <div className="radioBack">
              <span>
                What is the payment type agreed upon for this transaction?
                (Short, Medium, or Short-Medium)
              </span>
              <div></div>
              <div className="inputContainer">
                <span>Payment Type</span>
                <select className="inputs" {...register("paymentType")}>
                  <option value={PaymentTypes.SHORT}>Short</option>
                  <option value={PaymentTypes.SHORT_MEDIUM}>
                    Short Medium
                  </option>
                  <option value={PaymentTypes.MEDIUM}>Medium</option>
                </select>
              </div>
            </div>
            <div className="inputContainer">
              <span>Payment Duration in days</span>
              <input
                {...register("paymentDuration")}
                type="text"
                className="inputs"
                placeholder="Payment duration..."
              />
            </div>
          </div>
        </form>
      </div>
      <BottomBar onBack={onBack} onSubmit={onSubmit}></BottomBar>
    </ApplicationLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  return { props: { query } };
}

export default Index;
