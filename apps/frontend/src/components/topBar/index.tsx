import useModal from "@hooks/useModal";
import ConnectWallet from "@components/widgets/connectWallet";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  NotificationModalAtom,
  SettingsModalAtom,
  networkDialogIsOpenAtom,
} from "@store/ModalStore";
import { PortalIcons } from "../icons";
import React from "react";
import { Button } from "taral-ui";
import { useNetworks } from "@hooks/useNetwork";
import { Globe } from "react-feather";

const Topbar = () => {
  const router = useRouter();
  const settingsModal = useModal(SettingsModalAtom);
  const notificationModal = useModal(NotificationModalAtom);

  const networkDialogueModal = useModal(networkDialogIsOpenAtom);
  const { networks, currentNetworkIndex, currentStacksNetwork } = useNetworks();
  const currentNetwork = networks[currentNetworkIndex];
  console.log("current network ======>", currentStacksNetwork);

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
          <Button
            primary
            backgroundColor="#003C6E"
            icon={<Globe color={"white"} size={"15px"}></Globe>}
            onClick={() => networkDialogueModal.open()}
            label={currentNetwork.name.toUpperCase()}
          ></Button>
          <ConnectWallet />
        </div>
      </div>
    </>
  );
};

export default Topbar;
