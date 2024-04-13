import { PortalIcons } from "@components/icons";
import AuthLayout from "@components/layouts/auth_layout";
import { Button } from "@lib";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { countries } from "@utils/lib/constants";
import authService from "@services/authService";
import CustomInput from "@components/widgets/customPasswordField";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "sonner";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Inputs = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNo: string;
  // nationality: string;
  // gender: string;
  // dob: string;
  idType: string;
  idNumber: string;
  idExpiry: string;
  isAgreed: boolean;
};

interface ErrorMessage {
  name: string;
  errors: string[];
}

const registrationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .matches(
      /^[a-z0-9]+$/,
      "Username must be lowercase with no spaces and special characters."
    ),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .min(6, "Password is too short - should be 6 characters minimum.")
    .max(20, "Password is too long - should be 20 characters maximum.")
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
    ),
  phoneNo: Yup.string().required("Phone Number is required"),
  idType: Yup.string().required("ID Type is required"),
  idNumber: Yup.string().required("ID Number is required"),
  idExpiry: Yup.string().required("ID Expiry is required"),
  isAgreed: Yup.boolean().required(
    "Please accept terms of service and privacy policy to continue"
  ),
});

function Index() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessages, setErrorMessages] = React.useState<ErrorMessage[]>([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await trigger();

    const registerPromise = authService.register(
      // remove spaces and convert to lowercase
      data.username.toLowerCase().replace(/\s/g, ""),
      data.email,
      data.password,
      data.firstName
    );

    toast.promise(registerPromise, {
      loading: "Creating account...",
      success: (data) => {
        console.log(data);
        router.push("/auth/check-mail");
        return "Account created successfully";
      },
      error: (err) => {
        console.log(err);
        setErrorMessages(err);
        return "Form validation error";
      },
    });
    // router.push(
    //   {
    //     pathname: "/auth/otp",
    //     query: { email: data.email },
    //   },
    //   "/auth/otp"
    // );
  };

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
              <span>User Name</span>
              <input
                type="text"
                className={errors.username ? "inputsRed" : "inputs"}
                placeholder={"Username"}
                {...register("username")}
              />
              {errors.username && (
                <p style={{ color: "#df1818", fontSize: "12px", margin: 0 }}>
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="splitBox">
              <div className="inputContainer">
                <span>First Name</span>
                <input
                  type="text"
                  className={errors.firstName ? "inputsRed" : "inputs"}
                  placeholder={"First name"}
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p style={{ color: "#df1818", fontSize: "12px", margin: 0 }}>
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="inputContainer">
                <span>Last Name</span>
                <input
                  type="text"
                  className={errors.lastName ? "inputsRed" : "inputs"}
                  {...register("lastName")}
                  placeholder={"Last name"}
                />
                {errors.lastName && (
                  <p style={{ color: "#df1818", fontSize: "12px", margin: 0 }}>
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="inputContainer">
              <span>Email</span>
              <input
                type="email"
                className={errors.email ? "inputsRed" : "inputs"}
                placeholder={"Email Address"}
                {...register("email")}
              />
              {errors.email && (
                <p style={{ color: "#df1818", fontSize: "12px", margin: 0 }}>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="inputContainer">
              <span>Phone Number</span>
              <input
                type="text"
                className={errors.phoneNo ? "inputsRed" : "inputs"}
                placeholder="Phone Number"
                {...register("phoneNo")}
              />
              {errors.phoneNo && (
                <p style={{ color: "#df1818", fontSize: "12px", margin: 0 }}>
                  {errors.phoneNo.message}
                </p>
              )}
            </div>
            <div className="inputContainer">
              <span>Password</span>
              <div className="custom-input">
                <div className="input-container">
                  <input
                    className={errors.password ? "inputsRed" : "inputs"}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password")}
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
                {errors.password && (
                  <p
                    style={{
                      color: "#df1818",
                      fontSize: "12px",
                    }}
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* <div className="inputContainer">
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
            </div> */}
          </div>
          <div className="vLine"></div>

          <div className="innerContainer2">
            <div className="mainTitle">ID DETAILS</div>
            <div className="inputContainer">
              <span>ID Type</span>
              <select
                id=""
                className={errors.idType ? "inputsRed" : "inputs"}
                {...register("idType")}
              >
                <option value="">Select type...</option>
                <option value="passport">Passport</option>
                <option value="nationalID">National ID</option>
              </select>
              {errors.idType && (
                <p style={{ color: "#df1818", fontSize: "12px", margin: 0 }}>
                  {errors.idType.message}
                </p>
              )}
            </div>
            <div className="inputContainer">
              <span>ID Number</span>
              <input
                type="text"
                className={errors.idNumber ? "inputsRed" : "inputs"}
                {...register("idNumber")}
                placeholder="Number..."
              />
              {errors.idNumber && (
                <p style={{ color: "#df1818", fontSize: "12px", margin: 0 }}>
                  {errors.idNumber.message}
                </p>
              )}
            </div>
            <div className="inputContainer">
              <span>ID Expiry</span>
              <input
                type="date"
                className={errors.idExpiry ? "inputsRed" : "inputs"}
                {...register("idExpiry")}
                id="calendar"
              />
              {errors.idExpiry && (
                <p style={{ color: "#df1818", fontSize: "12px", margin: 0 }}>
                  {errors.idExpiry.message}
                </p>
              )}
            </div>
          </div>
          <div className="vLine"></div>
          <div className="dummyWrapper">
            <div className="mainTitle">AGREEMENT</div>
            <div className="inputContainer">
              <div className="agreementBox">
                <input type="checkbox" {...register("isAgreed")} />
                <span>
                  I agree that I&apos;ve read and accept the{" "}
                  <span className="greened">Terms of Service</span> and{" "}
                  <span className="greened">Privacy Policy</span>.
                </span>
              </div>
            </div>

            <div>
              {Object.keys(errors).length != 0 && (
                <div className="inputContainer">
                  <div className="errorMessage">
                    {errors.isAgreed
                      ? "Please accept terms of service and privacy policy to continue"
                      : "Please fill in all required fields"}
                  </div>
                </div>
              )}
              {errorMessages &&
                errorMessages.map((errorMessage, index) => (
                  <div key={index}>
                    {errorMessage.errors.map((error, index) => (
                      <div className="inputContainer">
                        <div style={{ width: "100%" }} className="errorMessage">
                          {error}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>

            <div className="inputContainer">
              <Button
                type="submit"
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

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default Index;
