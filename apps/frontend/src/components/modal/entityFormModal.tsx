import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function FormModal({ isOpen, onClose }: Props) {
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
            Add New Entity
            <span className="subtitle">
              Fill the form below to add a new entity to the list of entities.
            </span>
          </div>
          <div className="form">
            <span className="label">entity information</span>
            <div className="entityfield">
              <span>Entity Logo</span>
              <input
                title="entity logo"
                id="upload"
                className="inputs"
                type="file"
                placeholder="Upload Logo..."
              ></input>
            </div>
            <div className="entityfield">
              <span>Entity Name</span>
              <input
                className="inputs"
                type="text"
                placeholder="Entity Name..."
              ></input>
            </div>
            <div className="flexrow">
              <div className="entityfield">
                <span>Nationality</span>
                <select id="downarrow" className="inputs">
                  <option value="" disabled selected hidden>
                    Select Nationality...
                  </option>
                </select>
              </div>
              <div className="entityfield">
                <span>Headquaters Location</span>
                <select id="downarrow" className="inputs">
                  <option value="" disabled selected hidden>
                    Select Location...
                  </option>
                </select>
              </div>
            </div>
            <div className="entityfield">
              <span>Core Business</span>
              <select id="downarrow" className="inputs">
                <option value="" disabled selected hidden>
                  Core Business...
                </option>
              </select>
            </div>
            <div className="flexrow">
              <div className="entityfield">
                <span>Incorporation Date</span>
                <input
                  id="calendar"
                  className="inputs"
                  type="date"
                  placeholder="Select Date..."
                ></input>
              </div>
              <div className="entityfield">
                <span>Legal Form</span>
                <select id="downarrow" className="inputs">
                  <option value="" disabled selected hidden>
                    Select Form...
                  </option>
                </select>
              </div>
            </div>
            <div>
              <button className="button" onClick={() => {}}>
                Create Entity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormModal;
