import { PortalIcons } from "@components/icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTaralContracts from "@hooks/useTaralContracts";
import applicationService from "@services/application/applicationService";
import { useRouter } from "next/router";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
function RegisterImporterOnChainModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const entityId = router.query.entityId as string;

  const { isSignedIn, stxAddress, registerTaralImporterOnChain } =
    useTaralContracts();

  const handleRegister = async () => {
    if (!isSignedIn) {
      toast.error("Please connect wallet to continue");
      onClose();
      return;
    }

    await registerTaralImporterOnChain(
      stxAddress!,
      entityId,
      "644bcc7e564373040999aac89e7622f3ca71fba1d972fd94a31c3bfbf24e3938",
      "buyer"
    );
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
            <div className="quickAppli">
              <div className="svgContainer">
                <PortalIcons selected={false} icon={"quick application"} />
              </div>
              <div className="header-application">Register on chain</div>
              <div className="info-application">
                Before creating a new application you have to register on-chain
                click on the button below and confirm the transaction
              </div>
              <div className="buttonContainer">
                <button className="btn" onClick={handleRegister}>
                  REGISTER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterImporterOnChainModal;
