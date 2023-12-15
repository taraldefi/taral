import { useAuth } from "@micro-stacks/react";
import React from "react";
import { Button } from "taral-ui";

const ConnectWallet = () => {
  const [label, setButtonLabel] = React.useState("CONNECT WALLET");
  const { openAuthRequest, isRequestPending, signOut, isSignedIn } = useAuth();
  React.useEffect(() => {
    setButtonLabel(
      isRequestPending
        ? "Loading..."
        : isSignedIn
        ? "SIGN OUT"
        : "CONNECT WALLET"
    );
  }, [label, isSignedIn]);

  return (
    <Button
      onClick={async () => {
        if (isSignedIn) await signOut();
        else await openAuthRequest();
      }}
      primary
      backgroundColor="#003C6E"
      label={label}
    ></Button>
  );
};

export default ConnectWallet;
