import { PortalIcons } from "@components/icons";
import AuthLayout from "@components/layouts/auth_layout";
import CustomInput from "@components/widgets/customPasswordField";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import authService from "@services/authService";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@lib";

function Index() {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const loginPromise = authService.login(
      data.username,
      data.password,
      data.remember
    );
    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: () => {
        router.push("/users/importer/entities");
        return "Logged in successfully!";
      },
      error: (err) => {
        return `Error logging in! ${err}`;
      },
    });
  };
  type Inputs = {
    username: string;
    password: string;
    remember: boolean;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  });
  return (
    <AuthLayout>
      <div className="accountContainer">
        <div className="titleWrapper">
          <div className="titleTop">
            <div className="accMainTitle">Login to account</div>
            <div className="accSubTitle">
              Enter your information to login to your account with the platform.
            </div>
          </div>
          <br />
        </div>
        <div className="contentWrapper">
          <form onSubmit={handleSubmit(onSubmit)} className="innerContainer1">
            <div className="inputContainer">
              <span>Username</span>
              <input
                type="text"
                className={errors.username ? "inputsRed" : "inputs"}
                placeholder="Username..."
                {...register("username", { required: true })}
              />
            </div>
            {/* <div className="inputContainer">
              <span>Phone Number</span>
              <input
                type="text"
                className={errors.phoneNo ? "inputsRed" : "inputs"}
                placeholder="Phone Number..."
                {...register("phoneNo", { required: true })}
              />
            </div> */}

            <div className="inputContainer">
              <span>Password</span>
              <div className="custom-input">
                <div className="input-container">
                  <input
                    className={errors.password ? "inputsRed" : "inputs"}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password..."
                    {...register("password", { required: true })}
                  />

                  <div
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {(errors.password || errors.username) && (
              <div className="inputContainer">
                <div className="errorMessage">
                  Please fill all the required fields.
                </div>
              </div>
            )}
            <div className="agreementBox">
              <input type="checkbox" {...register("remember")} />
              <span>Remember me</span>
            </div>
            {/* <div className="inputContainer">
              <Button label={"Send OTP"}></Button>
            </div> */}

            <Button
              type="submit"
              primary={true}
              size="large"
              backgroundColor="#1ab98b"
              label={"Login"}
              icon={
                <PortalIcons selected={false} icon={"right arow"}></PortalIcons>
              }
            ></Button>
            <a
              style={{
                fontSize: "12px",
                justifyContent: "center",
                display: "flex",
                padding: "10px",
              }}
              href="/auth/register"
            >
              New to tariala? Create a new account
            </a>

            {/* <div className="fgP">
              <div className="inputContainer">
                <span>FORGOT PASSWORD</span>
              </div>
            </div> */}
          </form>
          {/* <div className="vLine"></div>
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
          <div className="dummyWrapper"></div> */}
        </div>
      </div>
    </AuthLayout>
  );
}

export default Index;
