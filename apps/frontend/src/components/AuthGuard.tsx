import { useRouter } from "next/router";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthGuard = ({ children }: any) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthState = () => {
      const token = JSON.parse(localStorage.getItem("SITE_DATA_AUTH") || "{}");

      if (!token || !token.accessToken) {
        // User is not logged in
        console.log("User is not logged in");
        router.push("/auth/login-mvp");
        return;
      }

      try {
        // Check if token is expired
        const decoded = jwtDecode(token.accessToken);

        if (Date.now() / 1000 > decoded.iat + token.expiresIn) {
          // Token is expired, remove it and redirect to login
          localStorage.removeItem("SITE_DATA_AUTH");
          // Redirect to login page
          router.push("/auth/login-mvp");
        }
      } catch (error) {
        // Handle error, invalid token format
      }
    };

    checkAuthState();
  }, []);

  return <>{children}</>;
};
