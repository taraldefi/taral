import { PortalIcons } from "@components/icons";
import TxLayout from "@components/layouts/tx_layout";
import React from "react";
export default function TransactionBuyer() {
  const [toggle, setToggle] = React.useState(true);

  return (
    <TxLayout>
      <div className="buyerContainer">
        <div className="companyDetails">
          <span>COMPANY DETAILS</span>
          <span>Company Name</span>
          <input
            type="text"
            className="inputs"
            placeholder="Company Name..."
          ></input>
          <span>Date Established</span>
          <input
            type="date"
            className="inputs"
            placeholder="Date Established..."
          ></input>

          <span>Tax No.</span>
          <input
            type="text"
            className="inputs"
            placeholder="Tax number..."
          ></input>
          <span>Euler Hemes&apos;DN-NO</span>
          <input
            type="text"
            className="inputs"
            placeholder="Registration numbers..."
          ></input>
        </div>
        <div className="companyLocation">
          <span>COMPANY LOCATION</span>
          <span>Address</span>
          <input type="text" className="inputs" placeholder="City..."></input>
          <input
            type="text"
            className="inputs"
            placeholder="Address line 1..."
          ></input>
          <input
            type="text"
            className="inputs"
            placeholder="Address line2(optional)..."
          ></input>
          <span>Postcode</span>
          <input
            type="text"
            className="inputs"
            placeholder="Percentage..."
          ></input>
          <div className="delivery" onClick={() => setToggle(!toggle)}>
            <PortalIcons selected={toggle} icon={"compliance"} />
            <span> Deliver to this address</span>
          </div>
        </div>
        <div className="sectorInfo">
          <span>SECTOR INFO</span>
          <span>Industry</span>
          <input
            type="text"
            className="inputs"
            placeholder="Select industry..."
          ></input>
          <div className="line">
            <span></span>
          </div>
          <form className="companyType">
            <span>Company Type</span>
            <div className="content">
              <input
                type="radio"
                id="Public"
                name="fav_language"
                value="Public"
              />
              <label htmlFor="html">Public</label>
              <input
                type="radio"
                id="Private"
                name="fav_language"
                value="Private"
              />
              <label htmlFor="css">Private</label>
            </div>
          </form>
          <form className="companyStatus">
            <span>Company Status</span>
            <div className="content">
              <input
                type="radio"
                id="Private"
                name="fav_language"
                value="Subsidiary"
              />
              <label htmlFor="Private">Subsidiary</label>
              <input
                type="radio"
                id="Independent"
                name="fav_language"
                value="Independent"
              />
              <label htmlFor="Independent">Independent</label>
            </div>
          </form>
        </div>
      </div>
    </TxLayout>
  );
}
