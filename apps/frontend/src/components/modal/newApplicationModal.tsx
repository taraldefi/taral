import { PortalIcons } from "@components/icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
function NewApplicationModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const entityID = router.query.entityId;
  const nextpath = `/users/${
    router.asPath.split("/")[2]
  }/entities/${entityID}/quick/exporterInfo`;
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
                <button
                  className="btn"
                  onClick={() => {
                    router.push(nextpath.toString());
                    onClose();
                  }}
                >
                  start
                </button>
              </div>
            </div>
            <div className="vLine"></div>
            <div className="fullAppli">
              <div className="svgContainer">
                <PortalIcons selected={false} icon={"full application"} />
              </div>
              <div className="header-application">full Application</div>
              <div className="info-application">
                Fill all the forms requirements and info now.
              </div>
              <div className="buttonContainer">
                <button
                  className="btn"
                  onClick={() => {
                    router.push(
                      `/users/${
                        router.asPath.split("/")[2]
                      }/entities/${entityID}/newApplication/exporterInfo`
                    );
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
