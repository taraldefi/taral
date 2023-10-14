import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { useRouter } from "next/router";

import React from "react";
import { useForm } from "react-hook-form";

function Index() {
  const router = useRouter();
  const entityID = router.query.entityId;
  const applicationID = router.query.applicationId;

  type FormValues = {
    company: {
      companyName: "";
      dateEstablished: "";
      phoneNumber: "";
      registrationNumbers: "";
      taxAndRevenue: {
        lastFiscalYear: "";
        totalRevenue: "";
        exportRevenuePercentage: "";
      };
      address: {
        city: "";
        addressLine1: "";
        addressLine2: "";
        postalCode: "";
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
                {...register("company.companyName", { required: true })}
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
