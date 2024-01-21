import { useAuth } from "@micro-stacks/react";
import React from "react";
import { LogOut } from "react-feather";
import { Button } from "taral-ui";

const ConnectWallet = () => {
  const [label, setButtonLabel] = React.useState("CONNECT WALLET");
  const { openAuthRequest, isRequestPending, signOut, isSignedIn } = useAuth();
  const [client, setClient] = React.useState<any>(null);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setClient(true);
    }
    setButtonLabel(
      isRequestPending
        ? "Loading..."
        : isSignedIn
        ? "SIGN OUT"
        : "CONNECT WALLET"
    );
  }, [label, isSignedIn]);

  return (
    <>
      {client && isSignedIn ? (
        <>
          <LogOut onClick={async () => await signOut()} />
        </>
      ) : (
        <Button
          onClick={async () => {
            if (isSignedIn) await signOut();
            else await openAuthRequest();
          }}
          primary
          backgroundColor="#003C6E"
          label={label}
        ></Button>
      )}
    </>
  );
};

export default ConnectWallet;
