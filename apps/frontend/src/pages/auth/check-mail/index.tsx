import AuthLayout from "@components/layouts/auth_layout";
import React from "react";

const CheckEmail: React.FC = () => {
  return (
    <AuthLayout>
      <div className="otp-container">
        <h2>Check your email</h2>
        <br />
        <span>
          We have sent an email to verify your account. Click on "activate
          account" to verify and login to our platform{" "}
        </span>
        <br />
      </div>
    </AuthLayout>
  );
};

export default CheckEmail;
