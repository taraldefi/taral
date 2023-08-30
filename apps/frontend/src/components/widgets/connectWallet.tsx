import React from "react";
import { Button } from "taral-ui";
import { AppConfig, UserData, showConnect, UserSession } from "@stacks/connect";
import { AppDetails } from "lib-web";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

const appDetails: AppDetails = {
  icon: "https://avatars.githubusercontent.com/u/87638650?s=200&v=4",
  name: "Tariala",
};
const initialValue = {
  email: "",
  decentralizedID: "",
  identityAddress: "",
  appPrivateKey: "",
  hubUrl: "",
  coreNode: "",
  authResponseToken: "",
  coreSessionToken: "",
  gaiaAssociationToken: "",
  profile: "",
  gaiaHubConfig: "",
  appPrivateKeyFromWalletSalt: "",
};
const userWalletAtom = atomWithStorage<UserData>("userWallet", initialValue);

const ConnectWallet = () => {
  const [user, setUser] = useAtom(userWalletAtom);
  const [buttonLabel, setButtonLabel] = React.useState("");

  //fixes hydration error on reload
  React.useEffect(() => {
    setButtonLabel(
      user && userSession.isUserSignedIn() ? "DISCONNECT" : "CONNECT WALLET"
    );
  }, [user]);
  return (
    <Button
      onClick={
        user && userSession.isUserSignedIn()
          ? () => {
              userSession.signUserOut();
              setUser(initialValue);
              setButtonLabel("CONNECT WALLET");
            }
          : () => {
              try {
                showConnect({
                  appDetails,
                  onFinish: () => {
                    setUser(userSession.loadUserData());
                    setButtonLabel("DISCONNECT");
                  },
                  onCancel: () => {
                    console.error("Cancelled connect");
                  },
                });
              } catch (_e) {
                console.log(_e);
              }
            }
      }
      primary
      backgroundColor="#003C6E"
      label={buttonLabel}
    ></Button>
  );
};

export default ConnectWallet;
