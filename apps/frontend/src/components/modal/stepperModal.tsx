import { PortalIcons } from "@components/icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTaralContracts from "@hooks/useTaralContracts";
import applicationService from "@services/application/applicationService";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
function StepperModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const { stxAddress, isSignedIn, createTaralPurchaseOrder } =
    useTaralContracts();
  const [step, setStep] = useState(0);

  const entityId = router.query.entityId as string;
  const applicationId = router.query.applicationId as string;

  const handleOnChainSubmission = async () => {
    if (!isSignedIn) {
      toast.error("Please connect your wallet to continue");
      onClose();
      return;
    }

    const onChainResponse = createTaralPurchaseOrder(
      1000,
      200,
      "ST2Y2SFNVZBT8SSZ00XXKH930MCN0RFREB2GQG7CJ"
    );

    toast.promise(onChainResponse, {
      loading: "registering on-chain...",
      success: (data) => {
        setStep(1);
        return data;
      },
      error: (err) => {
        return `${err.message}`;
      },
    });
  };

  const handleFinalSubmission = async () => {
    if (!isSignedIn) {
      toast.error("Please connect your wallet to continue");
      onClose();
      return;
    }

    const offChainResponse =
      applicationService.submitApplication(applicationId);

    toast.promise(offChainResponse, {
      loading: "Loading...",
      success: (data) => {
        setStep(2);
        router.push(
          `/users/${
            router.asPath.split("/")[2]
          }/entities/${entityId}/applications`
        );
        return `application finished and is on review`;
      },
      error: (err) => {
        return `${err.message}`;
      },
    });
  };

  return (
    <div className={"finishApplicationModal " + (isOpen && "active")}>
      {isOpen && (
        <div className="modalMenue">
          <div
            onClick={() => {
              onClose();
            }}
            className="close"
          >
            <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
          </div>

          <div className="form">
            <div>
              <div className="svgContainer">
                <PortalIcons selected={false} icon={"quick application"} />
              </div>
              <div className="header-application">Submit Application</div>
              <div className="info-application">
                You are two steps away from finishing your application
              </div>

              <div className="stepper-wrapper">
                <div
                  className={`stepper-item ${
                    step >= 1 ? "completed" : "active"
                  }`}
                >
                  <div className="step-counter">
                    {step >= 1 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100"
                        height="100"
                        viewBox="0 0 64 64"
                        fill="#FFFFFF"
                      >
                        <path d="M32,6C17.641,6,6,17.641,6,32c0,14.359,11.641,26,26,26s26-11.641,26-26C58,17.641,46.359,6,32,6z M29.081,42.748	l-10.409-9.253l2.657-2.99l7.591,6.747L44,21l3.414,3.414L29.081,42.748z"></path>
                      </svg>
                    ) : (
                      1
                    )}
                  </div>
                  <div className="step-name">on-chain submission</div>
                </div>
                <div
                  className={`stepper-item ${step === 2 ? "completed" : ""}`}
                >
                  <div className="step-counter">
                    {" "}
                    {step === 2 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100"
                        height="100"
                        viewBox="0 0 64 64"
                        fill="#FFFFFF"
                      >
                        <path d="M32,6C17.641,6,6,17.641,6,32c0,14.359,11.641,26,26,26s26-11.641,26-26C58,17.641,46.359,6,32,6z M29.081,42.748	l-10.409-9.253l2.657-2.99l7.591,6.747L44,21l3.414,3.414L29.081,42.748z"></path>
                      </svg>
                    ) : (
                      2
                    )}
                  </div>
                  <div className="step-name">submit application</div>
                </div>
              </div>
              <div className="buttonContainer">
                {!(step === 2) && (
                  <button
                    className="btn"
                    disabled={step === 2}
                    onClick={
                      step === 1
                        ? handleFinalSubmission
                        : handleOnChainSubmission
                    }
                  >
                    {step === 1 ? "finish" : "submit on-chain"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StepperModal;
