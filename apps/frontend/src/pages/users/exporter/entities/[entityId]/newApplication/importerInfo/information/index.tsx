import ApplicationLayout from "@components/layouts/new_application_layout";
import React from "react";

function Index() {
  const [selectedRadioBtn, setSelectedRadioBtn] = React.useState("No");
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn(e.currentTarget.value);
  const [selectedRadioBtn1, setSelectedRadioBtn1] = React.useState("No");
  const handleRadioClick1 = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn1(e.currentTarget.value);
  return (
    <ApplicationLayout>
      <div className="impInfoContainer">
        <div className="infoContainer">
          <div className="importerInfo">
            <div className="maintitle">IMPORTER&apos;S INFO</div>
            <div className="inputContainer">
              <span>Importer&apos;s company name</span>
              <input
                type="text"
                className="inputs"
                placeholder="Company name..."
              />
            </div>
            <div className="inputContainer">
              <span>Importer industry</span>
              <select className="inputs">
                <option value="">Select industry...</option>
                <option value=""></option>
              </select>
            </div>
            <div className="inputContainer">
              <span>Importer phone number</span>
              <input
                type="text"
                className="inputs"
                placeholder="Phone number..."
              />
            </div>
            <div className="inputContainer">
              <span>Importer country</span>
              <select className="inputs">
                <option value="">Select country...</option>
                <option value=""></option>
              </select>
            </div>
            <div className="inputContainer">
              <span>Importer&apos;s company address</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 1..."
              />
            </div>
            <div className="inputContainer">
              <span>Importer company address line 2</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 2..."
              />
            </div>
            <div className="inputContainer">
              <span>Importer post code</span>
              <input
                type="text"
                className="inputs"
                placeholder="Post code..."
              />
            </div>
          </div>
          <div className="vLine"></div>
          <div className="deliveryAddress">
            <div className="maintitle">DELIVERY ADDRESS</div>
            <div className="radioBack">
              <span>
                Is the delivery address different to the importer company
                address?
              </span>
              <div>
                <div>
                  <input
                    type="radio"
                    name="deliveryAddressRadio"
                    value="Yes"
                    onChange={handleRadioClick}
                  />
                  <label>Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="deliveryAddressRadio"
                    value="No"
                    onChange={handleRadioClick}
                  />
                  <label>No</label>
                </div>
              </div>
              {selectedRadioBtn == "Yes" ? (
                <>
                  <div className="inputContainer">
                    <span>Importer shipment company name</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Global Traders"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>Importer shipment country</span>
                    <select name="" id="" className="inputs">
                      <option value="">Germany</option>
                      <option value=""></option>
                    </select>
                  </div>
                  <div className="inputContainer">
                    <span>Importer shipment city</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Berlin"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>Importer shipment street no</span>
                    <input type="text" className="inputs" placeholder="35" />
                  </div>
                  <div className="inputContainer">
                    <span>Importer shipment post code</span>
                    <input type="text" className="inputs" placeholder="95192" />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="vLine"></div>
          <div className="additionalAddress">
            <div className="maintitle">ADDITIONAL ADDRESS</div>
            <div className="radioBack">
              <span>Any other delivery addresses?</span>
              <div>
                <div>
                  <input
                    type="radio"
                    value="Yes"
                    name="additionalAddressRadio"
                    onChange={handleRadioClick1}
                  />
                  <label>Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="No"
                    name="additionalAddressRadio"
                    onChange={handleRadioClick1}
                  />
                  <label>No</label>
                </div>
              </div>
              {selectedRadioBtn1 == "Yes" ? (
                <div className="inputContainer">
                  <span>Alternative delivery address</span>
                  <input
                    type="text"
                    className="inputs"
                    placeholder="Address..."
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
}

export default Index;
