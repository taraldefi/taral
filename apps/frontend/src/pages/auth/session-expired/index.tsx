import AuthLayout from "@components/layouts/auth_layout";
import React from "react";

const SessionExpired: React.FC = () => {
  return (
    <AuthLayout>
      <div className="otp-container">
        <h2>Session Expired</h2>
        <br />
        <span>
          Your session expired, please <a href="/auth/login-mvp">login</a> again
          to continue
        </span>
        <br />
      </div>
    </AuthLayout>
  );
};

export default SessionExpired;
