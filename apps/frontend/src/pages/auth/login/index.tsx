import { PortalIcons } from "@components/icons";
import AuthLayout from "@components/layouts/auth_layout";
import CustomInput from "@components/widgets/customPasswordField";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@lib";

function Index() {
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  type Inputs = {
    email: string;
    phoneNo: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      phoneNo: "",
      password: "",
    },
  });
  return (
    <AuthLayout>
      <div className="accountContainer">
        <div className="titleWrapper">
          <div className="titleTop">
            <div className="accMainTitle">Login to account</div>
            <div className="accSubTitle">
              Enter you information to login to your account with the platform.
            </div>
          </div>
          <div className="titleBottom">
            <span>
              You&apos;ll be sent an OTP to verify your email before login in.
            </span>
          </div>
        </div>
        <div className="contentWrapper">
          <form onSubmit={handleSubmit(onSubmit)} className="innerContainer1">
            <div className="mainTitle">ACCOUNT DETAILS</div>
            <div className="inputContainer">
              <span>Email</span>
              <input
                type="email"
                className={errors.email ? "inputsRed" : "inputs"}
                placeholder="Email address..."
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
            <div className="inputContainer">
              <span>Password</span>
              <CustomInput
                type="password"
                className="inputs"
                {...register("password", { required: true })}
                // You can spread other props here if needed
              />
            </div>
            {(errors.password || errors.email) && (
              <div className="inputContainer">
                <div className="errorMessage">
                  Please fill all the required fields.
                </div>
              </div>
            )}
            <div className="inputContainer">
              <Button label={"Send OTP"}></Button>
            </div>
            <div className="fgP">
              <div className="inputContainer">
                <span>FORGOT PASSWORD</span>
              </div>
            </div>
          </form>
          <div className="vLine"></div>
          <div className="innerContainer2">
            <div className="mainTitle">OTP</div>
            <div className="inputContainer">
              <span>One-Time-Password</span>
              <input type="text" className="inputs" placeholder="OTP..." />
            </div>
            <div className="inputContainer">
              <div className="buttonBox">
                <Button
                  onClick={() => {
                    router.push("/users/importer/entities");
                  }}
                  label={"Login"}
                  icon={
                    <PortalIcons
                      selected={false}
                      icon={"right arow"}
                    ></PortalIcons>
                  }
                ></Button>
              </div>
            </div>
            <div className="fgP">
              <div className="inputContainer">
                <span>RESEND CODE</span>
              </div>
            </div>
          </div>
          <div className="dummyWrapper"></div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Index;
