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
function NewApplicationModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const { stxAddress, isSignedIn } = useTaralContracts();

  const entityId = router.query.entityId as string;

  const handleNewApplication = () => {
    if (!isSignedIn)
      return toast.error("Please connect your wallet to create application");
    console.log("entityId", entityId);
    if (!entityId) return;
    const payload = {
      title: `${entityId}-${Date.now()}-Application`,
      entityId: entityId,
      onChainPrincipal: stxAddress!,
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
            <div className="quickAppli">
              <div className="svgContainer">
                <PortalIcons selected={false} icon={"quick application"} />
              </div>
              <div className="header-application">Quick Application</div>
              <div className="info-application">
                Add basic application info and fill the rest later.
              </div>
              <div className="buttonContainer">
                <button className="btn" onClick={handleNewApplication}>
                  start
                </button>
              </div>
            </div>
            <div className="vLine"></div>
            <div style={{ opacity: "0.4" }} className="fullAppli">
              <div className="svgContainer">
                <PortalIcons selected={false} icon={"full application"} />
              </div>
              <div className="header-application ">full Application</div>
              <div className="info-application">
                Fill all the forms requirements and info now.
              </div>
              <div className="buttonContainer">
                <button
                  disabled
                  className="btn"
                  onClick={() => {
                    onClose();
                  }}
                >
                  start
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
