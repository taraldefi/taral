import { PortalIcons } from "@components/icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTaralContracts from "@hooks/useTaralContracts";
import applicationService from "@services/application/applicationService";
import { useTransaction } from "@utils/queries/use-transaction";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SVGComponent from "./loading";
import { getExplorerLink } from "@utils/helper";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
function StepperModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const [transactionId, setTransactionId] = useState("");
  const { data: transaction, isError } = useTransaction(transactionId);
  const { stxAddress, isSignedIn, createTaralPurchaseOrder } =
    useTaralContracts();
  const [step, setStep] = useState(0);
  const [applicationData, setApplicationData] = useState({} as any);

  const entityId = router.query.entityId as string;
  const applicationId = router.query.applicationId as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await applicationService.getApplication(applicationId);
        console.log("result", result);
        if (result.transactionId) {
          setStep(1);
        }
        setApplicationData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleOnChainSubmission = async () => {
    // TODO : check if tx was already submitted
    if (!isSignedIn) {
      toast.error("Please connect your wallet to continue");
      onClose();
      return;
    }
    if (!applicationData) return;
    // const balanceResponse = await fetch(
    //   `/api/get-balance?stxAddress=${stxAddress}`
    // );
    // const { message: balance } = await balanceResponse.json();

    // if (
    //   parseFloat(balance) * Math.pow(10, 6) <
    //   parseFloat(applicationData.paymentTerms.downpayment) * Math.pow(10, 6)
    // ) {
    //   toast.error("Insufficient sUSDT balance");
    //   onClose();
    //   return;
    // }

    const transactionData = await createTaralPurchaseOrder(
      applicationId,
      parseFloat(applicationData.paymentTerms.balanceAmount) * Math.pow(10, 6),
      parseFloat(applicationData.paymentTerms.downpaymentAmount) *
        Math.pow(10, 6)
    );

    await applicationService.submitTransactionId(
      applicationId,
      transactionData.txId
    );

    setTransactionId(transactionData.txId);
    toast("Transaction Submitted.", {
      duration: 5000,
      description:
        " If the transaction takes more than 20 minutes to settle refresh and continue to second step",
      action: {
        label: "view transaction",
        onClick: () => window.open(getExplorerLink(transactionData.txId)),
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
        return `Application finished and is on review`;
      },
      error: (err) => {
        return `${err.message}`;
      },
    });
  };

  if (transaction?.tx_status === "success") {
    setStep(1);
    setTransactionId("");
  }

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
                    ) : transaction?.tx_status === "pending" ? (
                      <SVGComponent />
                    ) : (
                      1
                    )}
                  </div>
                  <div className="step-name">On-chain submission</div>
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
                  <div className="step-name">Submit application</div>
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
                    {step === 1 ? "Finalise Submission" : "Submit on-chain"}
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
