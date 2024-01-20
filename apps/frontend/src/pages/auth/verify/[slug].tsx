import AuthLayout from "@components/layouts/auth_layout";
import apiUrls from "@config/apiUrls";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Slug: React.FC = () => {
  const router = useRouter();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch(
          `${apiUrls.USER_ACTIVATE}?token=${router.query.slug}`
        );
        if (response.ok) {
          setVerified(true);
          // Redirect to login screen after a short delay
          setTimeout(() => {
            router.push("/auth/login-mvp");
          }, 2000);
        } else {
          throw new Error("Verification failed");
        }
      } catch (error) {
        console.error("Verification error:", error);
      } finally {
        setVerifying(false);
      }
    };

    if (router.query.slug) {
      verifyUser();
    }
  }, [router]);

  if (verifying) {
    return (
      <AuthLayout>
        <div className="otp-container">
          <h2>Account Verification</h2>
          <br />
          <span>You are almost there we are verfying your account...</span>
          <br />
        </div>
      </AuthLayout>
    );
  }

  if (!verified) {
    return (
      <AuthLayout>
        <div className="otp-container">
          <h2>Account Verification</h2>
          <br />
          <span>Your account verification failed. Please try again!</span>
          <br />
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="otp-container">
        <h2>Account Verification</h2>
        <br />
        <span>Account verified! redirecting you to login page</span>
        <br />
      </div>
    </AuthLayout>
  );
};

export default Slug;
