import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@lib";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
function StakeSuccessModal({ isOpen, onClose }: Props) {
  return (
    <div className={"lockSuccessModal " + (isOpen && "active")}>
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
            <div className="lock-success-modal">
              <div className="main-title">Stake Success!</div>
              <div className="sub-title">
                Successfully broadcasted transaction!
              </div>
              <div className="status">STATUS: PENDING</div>
              <div className="button-container">
                <Button
                  label={"View Transaction"}
                  onClick={() => {
                    onClose();
                  }}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StakeSuccessModal;
