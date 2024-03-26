import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const RefreshTokenHandler = (props: any) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!!session) {
      const decoded = jwtDecode(session.accessToken);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      console.log("decoded", decoded);
      const expirationTimestamp = decoded.iat! + 1000;

      const timeRemainingInSeconds = expirationTimestamp - currentTimestamp;

      props.setInterval(
        timeRemainingInSeconds > 0 ? timeRemainingInSeconds : 0
      );
    }
  }, [session]);

  return null;
};

export default RefreshTokenHandler;
