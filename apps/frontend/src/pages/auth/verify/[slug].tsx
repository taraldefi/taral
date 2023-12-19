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
          `http://localhost:3000/api/auth/activate-account?token=${router.query.slug}`
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
    return <div>Verifying user...</div>;
  }

  if (!verified) {
    return <div>Verification failed. Please try again.</div>;
  }

  return <div>Verification successful! Redirecting to login...</div>;
};

export default Slug;
