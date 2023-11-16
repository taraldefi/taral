// Generated with util/create-component.js
import React, { FC } from "react";
import { X } from "react-feather";
import {
  selectNetworkProps,
  modalsProps,
  IdleTimeOutModalProps,
} from "./Modals.types";

import "./Modals.scss";

export const DeleteModal = ({
  title,
  isOpen,
  onClose,
  onDelete,
}: modalsProps) => {
  return (
    <div className={"tariala--modal " + (isOpen && "active")}>
      {isOpen && (
        <div className="modal--menue">
          <div
            onClick={() => {
              onClose();
            }}
            className="close"
          >
            <X color="#64748b"></X>
          </div>
          <div className="header">
            {title}
            <span className="subtitle">
              Are you sure you want to delete this item? This is an irreversible
              action and the data associated with this entity will be deleted.
            </span>
          </div>
          <div className="form">
            <button
              className="button"
              onClick={() => {
                onDelete();
              }}
            >
              Delete
            </button>
            <button
              className="button--edit"
              onClick={() => {
                onClose();
              }}
            >
              Keep it for now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const IdleTimeOutModal: FC<IdleTimeOutModalProps> = ({
  showModal,
  handleContinue,
  handleLogout,
  remainingTime,
}) => {
  return (
    <div className={"tariala--modal " + (showModal && "active")}>
      {showModal && (
        <div className="modal--menue">
          {/* <div
						onClick={() => {
							handleContinue();
						}}
						className='close'
					>
						<X color='#64748b'></X>
					</div> */}

          <div className="header">
            You Have Been Idle!
            <span className="subtitle">
              Your session is expiring. You have {remainingTime} seconds left
            </span>
          </div>
          <div className="form">
            <button className="button" onClick={handleLogout}>
              Logout
            </button>
            <button className="button--edit" onClick={handleContinue}>
              Continue Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

//   {!sessionExpired && secondsRemaining > 0 && (
//     <>
//       <ModalHeader toggle={toggle}>Extend Session?</ModalHeader>
//       <div className="text-center pt-2 pb-2">
//         {`${secondsRemaining} ${
//           secondsRemaining > 1 ? "seconds remaining." : "second remaining."
//         }`}
//         <br />
//         <br />
//         <Button color="primary" onClick={() => extendPageSession()}>
//           Yes
//         </Button>
//         &#160;
//         <Button color="secondary" onClick={() => disableModalCheck()}>
//           No
//         </Button>
//       </div>
//     </>
//   )}
//   {!sessionExpired && secondsRemaining < 1 && (
//     <div className="text-center pt-2 pb-2">
//       Signing Out...
//       <br />
//       <FontAwesomeIcon className="icon" icon={faSpinner} spin size="lg" />
//     </div>
//   )}

export const SelectNetworkModal = ({
  isOpen,
  onClose,
  children,
}: selectNetworkProps) => {
  return (
    <div className={"tariala--modal " + (isOpen && "active")}>
      {isOpen && (
        <div className="modal--menue">
          <div
            onClick={() => {
              onClose();
            }}
            className="close"
          >
            <X color="#64748b"></X>
          </div>
          <div className="header">Select Network</div>
          <div className="form">{children}</div>
        </div>
      )}
    </div>
  );
};
