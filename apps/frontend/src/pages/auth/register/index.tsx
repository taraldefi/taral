import { PortalIcons } from "@components/icons";
import AuthLayout from "@components/layouts/auth_layout";
import { Button } from "taral-ui";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { countries } from "@utils/lib/constants";

function Index() {
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    router.push(
      {
        pathname: "/auth/otp",
        query: { email: data.email },
      },
      "/auth/otp"
    );
  };
  type Inputs = {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    nationality: string;
    gender: string;
    dob: string;
    idType: string;
    idNumber: string;
    idExpiry: string;
    isAgreed: boolean;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      nationality: "",
      gender: "",
      dob: "",
      idType: "",
      idNumber: "",
      idExpiry: "",
      isAgreed: false,
    },
  });
  return (
    <AuthLayout>
      <div className="accountContainer">
        <div className="titleWrapper">
          <div className="titleTop">
            <div className="accMainTitle">Create new account</div>
            <div className="accSubTitle">
              Enter you information to create a new account with the platform.
            </div>
          </div>
          <div className="titleBottomR"></div>
        </div>

        <form className="contentWrapper" onSubmit={handleSubmit(onSubmit)}>
          <div className="innerContainer1">
            <div className="mainTitle">PERSONAL INFO</div>
            <div className="inputContainer">
              <span>First Name</span>
              <input
                type="text"
                className={errors.firstName ? "inputsRed" : "inputs"}
                placeholder="First name..."
                {...register("firstName", { required: true })}
              />
            </div>
            <div className="inputContainer">
              <span>Email</span>
              <input
                type="email"
                className={errors.email ? "inputsRed" : "inputs"}
                placeholder="Email Address..."
                {...register("email", { required: true })}
              />
            </div>
            <div className="inputContainer">
              <span>Phone Number</span>
              <input
                type="text"
                className={errors.phoneNo ? "inputsRed" : "inputs"}
                placeholder="Phone Number..."
                {...register("phoneNo", { required: true })}
              />
            </div>
            <div className="splitBox">
              <div className="inputContainer">
                <span>Middle Name</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Middle name..."
                />
              </div>
              <div className="inputContainer">
                <span>Last Name</span>
                <input
                  type="text"
                  className={errors.lastName ? "inputsRed" : "inputs"}
                  {...register("lastName", { required: true })}
                  placeholder="Last name..."
                />
              </div>
            </div>
            <div className="inputContainer">
              <span>Nationality</span>
              <select
                className={errors.nationality ? "inputsRed" : "inputs"}
                {...register("nationality", { required: true })}
                id=""
              >
                <option value="">Select country...</option>
                {countries.map((item) => {
                  return (
                    <option key={item.id} value={item.alpha2}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="splitBox">
              <div className="inputContainer">
                <span>Gender</span>
                <select
                  className={errors.gender ? "inputsRed" : "inputs"}
                  id=""
                  {...register("gender", { required: true })}
                >
                  <option value="">Select gender...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="prefernottosay">Prefer not to say</option>
                </select>
              </div>
              <div className="inputContainer">
                <span>Date of Birth</span>
                <input
                  type="date"
                  id="calendar"
                  className={errors.dob ? "inputsRed" : "inputs"}
                  {...register("dob", { required: true })}
                />
              </div>
            </div>
          </div>
          <div className="vLineT"></div>
          <div className="innerContainer2">
            <div className="mainTitle">ID DETAILS</div>
            <div className="inputContainer">
              <span>ID Type</span>
              <select
                id=""
                className={errors.idType ? "inputsRed" : "inputs"}
                {...register("idType", { required: true })}
              >
                <option value="">Select type...</option>
                <option value="passport">Passport</option>
                <option value="nationalID">National ID</option>
              </select>
            </div>
            <div className="inputContainer">
              <span>ID Number</span>
              <input
                type="text"
                className={errors.idNumber ? "inputsRed" : "inputs"}
                {...register("idNumber", { required: true })}
                placeholder="Number..."
              />
            </div>
            <div className="inputContainer">
              <span>ID Expiry</span>
              <input
                type="date"
                className={errors.idExpiry ? "inputsRed" : "inputs"}
                {...register("idExpiry", { required: true })}
                id="calendar"
              />
            </div>
          </div>
          <div className="vLine"></div>
          <div className="dummyWrapper">
            <div className="mainTitle">AGREEMENT</div>
            <div className="inputContainer">
              <div className="agreementBox">
                <input
                  type="checkbox"
                  {...register("isAgreed", { required: true })}
                />
                <span>
                  I agree that I&apos;ve read and accept the{" "}
                  <span className="greened">Terms of Service</span> and{" "}
                  <span className="greened">Privacy Policy</span>.
                </span>
              </div>

              {Object.keys(errors).length != 0 && (
                <div className="inputContainer">
                  <div className="errorMessage">
                    {errors.isAgreed
                      ? "Please accept terms of service and privacy policy to continue"
                      : "Please fill all the required fields to continue"}
                  </div>
                </div>
              )}
            </div>
            <div className="inputContainer">
              <Button
                primary={true}
                backgroundColor="#1AB98B"
                icon={
                  <PortalIcons
                    selected={false}
                    icon={"right arow"}
                  ></PortalIcons>
                }
                label="Create Account"
              ></Button>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Index;
