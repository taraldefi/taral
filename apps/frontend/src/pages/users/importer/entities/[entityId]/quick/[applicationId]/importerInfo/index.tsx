import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { applicationProgressAtom } from "@store/applicationStore";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import React, { useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";

function Index() {
  const router = useRouter();
  const entityID = router.query.entityId;
  const applicationID = router.query.applicationId;
  const [, setProgress] = useAtom(applicationProgressAtom);

  type FormValues = {
    company: {
      companyName: null;
      dateEstablished: null;
      phoneNumber: null;
      registrationNumbers: null;
      taxAndRevenue: {
        lastFiscalYear: null;
        totalRevenue: null;
        exportRevenuePercentage: null;
      };
      address: {
        city: null;
        addressLine1: null;
        addressLine2: null;
        postalCode: null;
      };
    };
  };
  const {
    register,
    handleSubmit,
    getValues,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const { dirtyFields, isDirty } = useFormState({
    control,
  });

  const watchAllFields = watch();

  const calculateProgress = () => {
    // convert json to string and count the occurance of true
    // no of true = changed values in the form
    const stringifiedJson = JSON.stringify(dirtyFields);
    const regex = new RegExp("true", "g");
    const filledFields = stringifiedJson.match(regex);

    console.log((filledFields || []).length);
    const totalFilledFIelds = (filledFields || []).length;
    const totalFields = 9;
    const score = totalFilledFIelds / totalFields;
    const progressScore = score * 17;
    console.log(dirtyFields);
    return progressScore.toFixed(0);
  };

  useEffect(() => {
    // Update the progress atom when the form data changes

    const progress = calculateProgress();
    setProgress(parseInt(progress));
  }, [watchAllFields]);

  const onSubmit = (data: any) => {
    console.log("data:", data);
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/${applicationID}/supplierInfo`
    );
  };

  const onBack = () => {
    router.push(
      `/users/${router.asPath.split("/")[2]}/entities/${entityID}/applications`
    );
  };
  return (
    <div>
      <ApplicationLayout>
        <div className="exporterInfoContainer">
          <div className="generalInfo">
            <div className="maintitle">GENERAL INFO</div>
            <div>
              <span>What is your company name?</span>
              <input
                type="text"
                className="inputs"
                placeholder="Company name..."
                {...register("company.companyName", {
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
                {...register("company.phoneNumber", { required: true })}
              />
            </div>
            <div>
              <span>Address</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 1..."
                {...register("company.address.addressLine1", {
                  required: true,
                })}
              />
            </div>
            <div>
              <span>Address Line 2</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 2..."
                {...register("company.address.addressLine2", {
                  required: true,
                })}
              />
            </div>
            <div>
              <span>Address Line 2</span>
              <input
                type="text"
                className="inputs"
                placeholder="city"
                {...register("company.address.city", {
                  required: true,
                })}
              />
            </div>
            <div>
              <span>Company Post Code</span>
              <input
                type="text"
                className="inputs"
                placeholder="Post code..."
                {...register("company.address.postalCode", { required: true })}
              />
            </div>
          </div>
          <div className="vLine"></div>
          <div className="taxAndRevenue">
            <div className="maintitle">TAX AND REVENUE</div>
            <div>
              <span>Last fiscal year?</span>
              <input
                type="date"
                className="inputs"
                placeholder="Revenue amount..."
                {...register("company.taxAndRevenue.lastFiscalYear", {
                  required: true,
                })}
              />
            </div>
            <div>
              <span>Total revenue last fiscal year?</span>
              <input
                type="text"
                className="inputs"
                placeholder="Revenue amount..."
                {...register("company.taxAndRevenue.totalRevenue", {
                  required: true,
                })}
              />
            </div>
            <div>
              <span>What % of revenue was comprised by exports?</span>
              <input
                type="text"
                className="inputs"
                placeholder="Revenue percentage..."
                id="percentage"
                {...register("company.taxAndRevenue.exportRevenuePercentage", {
                  required: true,
                })}
              />
            </div>
            {Object.keys(errors).length != 0 && (
              <span className="errorMessage">
                Please fill all the required fields to continue
              </span>
            )}
          </div>
          <div className="vLine0"></div>
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
