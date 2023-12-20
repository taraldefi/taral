import { useEffect } from "react";
import Login from "./auth/login-mvp";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    const checkAuthState = () => {
      const token = JSON.parse(localStorage.getItem("SITE_DATA_AUTH") || "{}");
      console.log(token);
      if (!token.accessToken) {
        // User is not logged in
        router.push("/auth/login-mvp");
      }

      try {
        // Check if token is expired
        if (token.expiresIn < Date.now() / 1000) {
          // Token is expired, remove it and redirect to login
          localStorage.removeItem("SITE_DATA_AUTH");
          // Redirect to login page
          router.push("/auth/login-mvp");
        }

        // User is authenticated
        router.push("/users/importer/entities");
      } catch (error) {
        // Handle error, invalid token format
      }
    };

    checkAuthState();
  }, []);

  return <></>;
}
