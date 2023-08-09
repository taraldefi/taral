import useModal from "@hooks/useModal";
import { Button } from "taral-ui";
import Image from "next/image";
import { useRouter } from "next/router";
import { NotificationModalAtom, SettingsModalAtom } from "@store/ModalStore";
import { PortalIcons } from "../icons";
import { AppConfig, UserData, showConnect, UserSession } from "@stacks/connect";
import { AppDetails } from "lib-web";
import React from "react";

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

const appDetails: AppDetails = {
  icon: "https://avatars.githubusercontent.com/u/87638650?s=200&v=4",
  name: "Taral",
};

const Topbar = () => {
  const router = useRouter();
  const settingsModal = useModal(SettingsModalAtom);
  const notificationModal = useModal(NotificationModalAtom);
  const [user, setUser] = React.useState<UserData>();

  const handleModalClick = (clickedModal: any, otherModal: any) => {
    if (clickedModal.isOpen) {
      clickedModal.close();
    } else {
      if (otherModal.isOpen) {
        otherModal.close();
      }
      clickedModal.open();
    }
  };

  return (
    <>
      <div className="tab">
        <div className="topbar">
          <div className="logoContainer">
            <Image
              className="images"
              src="/assets/images/logo.png"
              alt=""
              width={40}
              height={40}
            ></Image>
            <span className="header">Tariala</span>
          </div>
          <div className="icons">
            <div
              onClick={() => {
                router.push("/profile");
              }}
            >
              <PortalIcons
                icon={"user"}
                selected={router.asPath === "/profile"}
              ></PortalIcons>
            </div>
            <div
              onClick={() => {
                handleModalClick(notificationModal, settingsModal);
              }}
            >
              <PortalIcons
                icon={"bell"}
                selected={notificationModal.isOpen}
              ></PortalIcons>
            </div>
            <div
              onClick={() => {
                handleModalClick(settingsModal, notificationModal);
              }}
            >
              <PortalIcons
                icon={"settings"}
                selected={settingsModal.isOpen}
              ></PortalIcons>
            </div>
          </div>
          {user || userSession.isUserSignedIn() ? (
            <>
              {/* <p>{user?.profile.stxAddress.testnet}</p> */}
              <Button
                onClick={() => {
                  userSession.signUserOut();
                  setUser(undefined);
                }}
                primary
                backgroundColor="#003C6E"
                label="DISCONNECT"
              ></Button>
            </>
          ) : (
            <Button
              onClick={() =>
                showConnect({
                  appDetails,
                  onFinish: () => {
                    setUser(userSession.loadUserData());
                  },
                  onCancel: () => {
                    console.error("Cancelled connect");
                  },
                })
              }
              primary
              backgroundColor="#003C6E"
              label="CONNECT WALLET"
            ></Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Topbar;
