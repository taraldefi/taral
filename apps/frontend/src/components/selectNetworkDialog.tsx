import * as React from "react";
import { useAtom } from "jotai";
import {
  StacksMainnet,
  StacksMocknet,
  StacksTestnet,
  StacksDevnet,
} from "@stacks/network";
import { useNetworks } from "@hooks/useNetwork";
import { Network } from "@utils/lib/constants";
import {
  anyNetworkStatusAtom,
  anyNetworkIsLoadingFamily,
  currentStacksNetworkAtom,
} from "@store/networkStore";
import { networkDialogIsOpenAtom } from "@store/ModalStore";
import { SelectNetworkModal, CircularLoader } from "taral-ui";
import { Cloud, CloudOff, Check, RefreshCw, Delete } from "react-feather";

const NetworkListItem = ({
  network,
  index,
}: {
  network: any;
  index: number;
}) => {
  const { currentNetworkIndex, handleUpdateNetworkIndex, handleRemoveNetwork } =
    useNetworks();

  const [, setOpen] = useAtom(networkDialogIsOpenAtom);
  const [, setCurrentNetwork] = useAtom(currentStacksNetworkAtom);
  const [anyStatus, dispatchAnyStatus] = useAtom(
    anyNetworkStatusAtom(network.name)
  );

  const isLoadingFamily = anyNetworkIsLoadingFamily(network);
  const [isLoading, setIsLoading] = useAtom(isLoadingFamily);

  const handleSelectNetwork = (index: number) => {
    // used to select and display user selections
    handleUpdateNetworkIndex(index);
    // sets the currently active network used by the wallet
    setCurrentNetwork(
      index === 0
        ? new StacksMainnet()
        : index === 1
        ? new StacksTestnet()
        : index === 2
        ? new StacksDevnet()
        : new StacksMocknet()
    );
    setOpen(false);
  };

  const isCustom = index >= 4 ? true : false;

  // fetch status onClick
  const timer = React.useRef<number>();
  const refetch = () => {
    if (!isLoading) {
      setIsLoading(true);
      timer.current = window.setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
    try {
      dispatchAnyStatus({ type: "refetch" });
    } catch (e) {
      console.log(e);
    }
  };
  if (anyStatus.isLoading)
    return (
      <div>
        <p style={{ fontSize: "14px", fontWeight: "bold", color: "#5cdd23" }}>
          Loading
          <span style={{ animation: "blink 1s infinite", color: "#5cdd23" }}>
            ...
          </span>
        </p>
        <style>
          {`
          @keyframes blink {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }
        `}
        </style>
      </div>
    );
  const color = anyStatus.data.status === "ready" ? "#5cdd23" : "#EB6201";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        paddingTop: "20px",
      }}
      key={index}
    >
      <div
        style={{
          pointerEvents: anyStatus.data.status !== "ready" ? "none" : "auto",
          opacity: anyStatus.data.status !== "ready" ? "0.6" : "1",
        }}
        onClick={() => handleSelectNetwork(index)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            gap: "10px",
            position: "relative",
          }}
        >
          <div>
            {anyStatus.data.status === "ready" ? (
              <React.Suspense
                fallback={
                  <div style={{ position: "absolute", top: "0", left: "0" }}>
                    <CircularLoader color={color} />
                  </div>
                }
              >
                {currentNetworkIndex === index ? (
                  <div
                    style={{
                      position: "relative",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      borderWidth: "2px",
                      borderColor: color,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "grey",
                    }}
                  >
                    <Check color={color} />
                  </div>
                ) : (
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      borderColor: color,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "grey",
                    }}
                  >
                    <Cloud color={color} />
                  </div>
                )}
              </React.Suspense>
            ) : (
              <React.Suspense
                fallback={
                  <div style={{ position: "absolute", top: "0", left: "0" }}>
                    <CircularLoader color={color} />
                  </div>
                }
              >
                <div
                  style={{
                    zIndex: 1600,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "grey",
                  }}
                >
                  <CloudOff color={color} />
                </div>
              </React.Suspense>
            )}
            {isLoading && (
              <div style={{ position: "absolute", top: "0", left: "0" }}>
                <CircularLoader color={color} />
              </div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <div style={{ display: "flex", gap: "5px" }}>
              <span>{network.name}</span>
              <span
                style={{
                  borderStyle: "solid",
                  borderColor: "grey",
                  borderRadius: "30px",
                  paddingLeft: "5px",
                  color: "grey",
                  fontSize: "12px",
                  paddingRight: "5px",
                }}
              >
                {network.chain}
              </span>
            </div>
            <span style={{ color: "grey", fontSize: "14px" }}>
              {network.label}
            </span>
          </div>
        </div>
      </div>
      {isCustom && (
        <button
          onClick={() => network.url && handleRemoveNetwork(network as Network)}
          aria-label="delete"
        >
          <Delete />
        </button>
      )}
      <div style={{ marginLeft: "auto" }}>
        <RefreshCw color="green" onClick={() => refetch()} />
      </div>
    </div>
  );
};
const SelectNetworkDialog = () => {
  const [networkDialogIsOpen, setNetworkDialogIsOpen] = useAtom(
    networkDialogIsOpenAtom
  );
  const { networks } = useNetworks();

  const handleClose = () => {
    setNetworkDialogIsOpen(false);
  };

  return (
    <>
      <SelectNetworkModal isOpen={networkDialogIsOpen} onClose={handleClose}>
        {networks.map((network, key) => (
          <React.Suspense
            key={key}
            fallback={<CircularLoader color="success" />}
          >
            <NetworkListItem key={key} index={key} network={network} />
          </React.Suspense>
        ))}
      </SelectNetworkModal>
    </>
  );
};

export default SelectNetworkDialog;
