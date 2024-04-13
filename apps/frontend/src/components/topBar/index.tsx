import useModal from "@hooks/useModal";
import ConnectWallet from "@components/widgets/connectWallet";
import Image from "next/image";
import Avatar from "boring-avatars";
import { useRouter } from "next/router";
import {
  NotificationModalAtom,
  SettingsModalAtom,
  activityStatusAtom,
  networkDialogIsOpenAtom,
  remainingIdleTimeAtom,
} from "@store/ModalStore";
import { PortalIcons } from "../icons";
import React, { useEffect, useState } from "react";
import { Button } from "@lib";
import { useNetworks } from "@hooks/useNetwork";
import { Globe } from "react-feather";
import { useAccount, useAuth, useNetwork } from "@micro-stacks/react";
import { fetchAccountStxBalance, fetchNamesByAddress } from "micro-stacks/api";
import { truncateUuid, ustxToStx } from "@utils/helper";
import StacksSVG from "@components/svg/stacks";
import { useAtom } from "jotai";
import { Clock } from "src/lib/Widgets";

const Topbar = () => {
  const { network } = useNetwork();
  const router = useRouter();
  const settingsModal = useModal(SettingsModalAtom);
  const notificationModal = useModal(NotificationModalAtom);

  const networkDialogueModal = useModal(networkDialogIsOpenAtom);
  const { networks, currentNetworkIndex } = useNetworks();
  const currentNetwork = networks[currentNetworkIndex];
  const [balance, setBalance] = useState<string | undefined>("");
  const { stxAddress } = useAccount();
  const { isSignedIn, openAuthRequest } = useAuth();
  const [client, setClient] = React.useState<any>(null);
  const [remaining] = useAtom(remainingIdleTimeAtom);
  const [state] = useAtom(activityStatusAtom);
  //console.log("current network ======>", currentStacksNetwork);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClient(true);
    }
    async function fetchData() {
      if (isSignedIn && stxAddress) {
        const result = await fetch(
          `${network.getCoreApiUrl()}/extended/v1/address/${stxAddress}/balances?unanchored=true`,
          { cache: "no-cache" }
        ).then((response) => response.json());

        setBalance(ustxToStx(result?.stx?.balance?.toString() || "0"));
      }
    }
    fetchData();
  }, [isSignedIn, stxAddress, balance, network]);

  return (
    <>
      {client && (
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
              {/* <div
              onClick={() => {
                router.push("/profile");
              }}
            >
              <PortalIcons
                icon={"user"}
                selected={router.asPath === "/profile"}
              ></PortalIcons>
            </div> */}
              {/* <div
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
              </div> */}
            </div>
            {remaining < 890 && <Clock remainingTime={remaining} />}

            {stxAddress ? (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    marginRight: "10px",
                    border: "1px solid #1ab98b",
                    padding: "5px",
                    paddingInline: "10px",
                    borderRadius: "35px",
                    alignItems: "center",
                  }}
                  onClick={() => networkDialogueModal.open()}
                >
                  <Globe color={"#1ab98b"} size={"20px"}></Globe>
                  <span
                    style={{
                      color: "#003C6E",
                      fontWeight: "bolder",
                      fontSize: "15px",
                      textTransform: "capitalize",
                    }}
                  >
                    {currentNetwork.name}{" "}
                  </span>
                </div>

                <StacksSVG />
                <span>{balance} </span>
                <Avatar
                  size={20}
                  name={stxAddress}
                  variant="beam"
                  colors={[
                    "#50DDC3",
                    "#624AF2",
                    "#EB00FF",
                    "#7301FA",
                    "#25C2A0",
                  ]}
                />
                <span onClick={() => openAuthRequest()}>
                  {" "}
                  {truncateUuid(stxAddress, 5, 5)}
                </span>
              </>
            ) : null}

            <ConnectWallet />
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
