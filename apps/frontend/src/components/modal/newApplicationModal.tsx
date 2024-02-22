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
type paymentMethod = "CREDIT_CARD" | "CRYPTO";

function NewApplicationModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const { stxAddress, isSignedIn } = useTaralContracts();
  const [paymentMethod, setPaymentMethod] = useState<any>("CRYPTO");

  const entityId = router.query.entityId as string;

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.currentTarget.value);
  };

  const handleNewApplication = () => {
    // if (!isSignedIn)
    //   return toast.error("Please connect your wallet to create application");
    console.log("entityId", entityId, paymentMethod);
    if (!entityId) return;
    const payload = {
      title: `${entityId}-${Date.now()}-Application`,
      entityId: entityId,
      onChainPrincipal: paymentMethod === "CREDIT_CARD" ? "--" : stxAddress!,
      paymentMethod: paymentMethod,
    };
    const response = applicationService.createApplication(payload);
    toast.promise(response, {
      loading: "Loading...",
      success: (data) => {
        onClose();
        router.push(
          `/users/${router.asPath.split("/")[2]}/entities/${entityId}/quick/${
            data.id
          }/importerInfo`
        );
        return `application has been created`;
      },
      error: (err) => {
        return `${err.message}`;
      },
    });
  };

  return (
    <div className={"newApplicationModal " + (isOpen && "active")}>
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
            <div style={{ width: "400px" }}>
              <div className="svgContainer">
                <PortalIcons selected={false} icon={"quick application"} />
              </div>
              <div className="header-application">Quick Application</div>
              <div className="info-application">
                Add basic application information and fill the rest later.{" "}
                <br /> <br />
                Choose your payment method
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingTop: "20px",
                }}
                className="info-application"
              >
                <label>
                  <input
                    type="radio"
                    name="payment_method"
                    onChange={(e) => onRadioChange(e)}
                    value={"CREDIT_CARD"}
                    checked={paymentMethod === "CREDIT_CARD"}
                  />{" "}
                  Credit Card
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment_method"
                    value={"CRYPTO"}
                    onChange={(e) => onRadioChange(e)}
                    checked={paymentMethod === "CRYPTO"}
                  />{" "}
                  Crypto
                </label>
              </div>

              <div style={{ paddingTop: "20px" }} className="buttonContainer">
                <button className="btn" onClick={handleNewApplication}>
                  Start
                </button>
              </div>
            </div>
            <div className="vLine"></div>
            <div style={{ opacity: "0.4", width: "400px" }}>
              <div className="svgContainer">
                <PortalIcons selected={false} icon={"full application"} />
              </div>
              <div className="header-application ">full Application</div>
              <div className="info-application">
                Fill all the forms requirements and information. <br /> <br />
                Choose your payment method
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingTop: "20px",
                }}
                className="info-application"
              >
                <label>
                  <input type="radio" name="payment_method_full_application" />{" "}
                  Credit Card
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment_method_full_application"
                    checked
                  />{" "}
                  Crypto
                </label>
              </div>
              <div style={{ paddingTop: "20px" }} className="buttonContainer">
                <button
                  disabled
                  className="btn"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewApplicationModal;
