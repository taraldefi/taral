import { PortalIcons } from "@components/icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModal } from "@utils/hooks";

import { LockSuccessModalAtom } from "@store/ModalStore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
function TalModal({ isOpen, onClose }: Props) {
  const lockSuccessModal = useModal(LockSuccessModalAtom);
  if (!isOpen) {
    return null;
  }
  return (
    <div className={"formModal " + (isOpen && "active")}>
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
          <div className="header">
            Lock TAL
            <span className="subtitle">
              Select the amount you&apos;d like to lock.
            </span>
          </div>
          <div className="form">
            <span className="label">Lock tal info</span>
            <div className="entityfield">
              <span>Available amount 1,483.406843 TAL</span>
              <div className="custom-input">
                <input
                  type="number"
                  className="custom-input-input"
                  placeholder="0.0"
                />
                <button className="custom-input-text">TAL</button>
                <div className="vl"></div>
                <button className="custom-input-button" type="submit">
                  MAX
                </button>
              </div>
            </div>
            <div className="form-tal-info">
              <PortalIcons selected={false} icon={"Exclamation"}></PortalIcons>
              <p>
                Once you have staked your TAL tokens, they will be locked for at
                least 10 days (cooldown period). Reminder: The cooldown has to
                be started manually.
              </p>
            </div>
            <div>
              <button
                className="button"
                onClick={() => {
                  lockSuccessModal.open();
                  onClose();
                }}
              >
                STAKE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TalModal;
