import ApplicationLayout from "@components/layouts/new_application_layout";
import React from "react";

function Index() {
  const [selectedRadioBtn, setSelectedRadioBtn] = React.useState("No");
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn(e.currentTarget.value);
  const [selectedRadioBtn1, setSelectedRadioBtn1] = React.useState("No");
  const handleRadioClick1 = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn1(e.currentTarget.value);
  const [selectedRadioBtn2, setSelectedRadioBtn2] = React.useState("NO");
  const handleRadioClick2 = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn2(e.currentTarget.value);
  const [selectedRadioBtn3, setSelectedRadioBtn3] = React.useState("No");
  const handleRadioClick3 = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn3(e.currentTarget.value);
  const [selectedRadioBtn4, setSelectedRadioBtn4] = React.useState("No");
  const handleRadioClick4 = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn4(e.currentTarget.value);

  return (
    <ApplicationLayout>
      <div className="tsNewContainers">
        <div className="tsContContainer">
          <div className="contractContainer">
            <div className="maintitle">CONTRACT</div>
            <div className="verticalContractContainer">
              <div className="radioBack">
                <span>
                  Has the purchase contract already been signed between the
                  parties?
                </span>
                <div>
                  <div>
                    <input
                      type="radio"
                      id="contractTsYes"
                      name="contractSignedTsRadio"
                      value="Yes"
                      onChange={handleRadioClick}
                    />
                    <label>Yes</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="contractTsNo"
                      name="contractSignedTsRadio"
                      value="No"
                      onChange={handleRadioClick}
                    />
                    <label>No</label>
                  </div>
                </div>
                {selectedRadioBtn == "Yes" ? (
                  <>
                    <div className="inputContainer">
                      <span>When is/was the contract signing date?</span>
                      <input type="date" className="inputs" id="calendar" />
                    </div>
                    <div className="hLine"></div>
                    <div className="secondRadio">
                      <span>Are you taking part in a tender?</span>
                      <div>
                        <div>
                          <input
                            type="radio"
                            id="tenorYes"
                            name="contractTenor"
                            value="Yes"
                            onChange={handleRadioClick1}
                          />
                          <label>Yes</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="tenorNo"
                            name="contractTenor"
                            value="No"
                            onChange={handleRadioClick1}
                          />
                          <label>No</label>
                        </div>
                      </div>
                      {selectedRadioBtn1 == "Yes" ? (
                        <>
                          <span>When is the tender submission date?</span>
                          <input
                            type="date"
                            className="inputs"
                            id="calendar"
                          ></input>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="inputContainer">
                <span>
                  Provide your internal reference number for the contract.
                </span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Reference number..."
                />
              </div>
              <div className="radioBack">
                <span>Was a special contract structure undertaken?</span>
                <div>
                  <div>
                    <input
                      type="radio"
                      id="specialContractYes"
                      name="specialContract"
                      value="Yes"
                      onChange={handleRadioClick2}
                    />
                    <label>Yes</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="specialContractNo"
                      name="specialContract"
                      value="No"
                      onChange={handleRadioClick2}
                    />
                    <label>No</label>
                  </div>
                </div>
                {selectedRadioBtn2 == "Yes" ? (
                  <div className="inputContainer">
                    <span>Please describe the special contract structure</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Signed successfully from both parites"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="inputContainer">
                <span>What currency is the contract denominated in?</span>
                <select className="inputs" id="">
                  <option value="Select currency...">Select currency...</option>
                </select>
              </div>
              <div className="inputContainer">
                <span>What is the total value of the contract?</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="What is the total value of the contract?"
                />
              </div>
              <div className="inputContainer">
                <span>Currency of other items billed in the contract</span>
                <select className="inputs" id="">
                  <option value="Other items currency...">
                    Other items currency...
                  </option>
                </select>
              </div>
              <div className="inputContainer">
                <span>
                  What is the amount of other items billed in the contract?
                </span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Enter amount..."
                />
              </div>
              <div className="inputContainer">
                <span>
                  Provide a description for other items billed in the contract
                </span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Items billed..."
                />
              </div>
            </div>
          </div>
          <div className="vLine"></div>
          <div className="deliveryContainer">
            <div className="maintitle">DELIVERY</div>
            <div className="verticalDeliveryContainer">
              <div className="radioBack">
                <span>
                  Are you using an agent/intermediary for the delivery of your
                  goods?
                </span>
                <div>
                  <div>
                    <input
                      type="radio"
                      name="agentRadio"
                      value="Yes"
                      onChange={handleRadioClick3}
                    />
                    <label>Yes</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="agentRadio"
                      value="No"
                      onChange={handleRadioClick3}
                    />
                    <label>No</label>
                  </div>
                </div>
                {selectedRadioBtn3 == "Yes" ? (
                  <div className="inputContainer">
                    <span>
                      What is the agreed remuneration structure with them?
                    </span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Full refund"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="radioBack">
                <span>Are you sending the goods in multiple deliveries?</span>
                <div>
                  <div>
                    <input type="radio" name="multipleDelivery" value="Yes" />
                    <label>Yes</label>
                  </div>
                  <div>
                    <input type="radio" name="multipleDelivery" value="No" />
                    <label>No</label>
                  </div>
                </div>
              </div>
              <div className="inputContainer">
                <span>When does the (expected) delivery start?</span>
                <input type="date" className="inputs" id="calendar" />
              </div>
              <div className="inputContainer">
                <span>When will the (expected) deliveries end?</span>
                <input type="date" className="inputs" id="calendar" />
              </div>
              <div className="inputContainer">
                <span>
                  Provide any other relevant important delivery information.
                </span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Delivery information..."
                />
              </div>
              <div className="inputContainer">
                <span>Please provide other important delivery milestones.</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Delivery milestones..."
                />
              </div>
            </div>
          </div>
          <div className="vLine"></div>
          <div className="deliveredContainer">
            <div className="maintitle">DELIVERY VALUE</div>
            <div className="verticalDeliveredContainer">
              <div className="inputContainer">
                <span>
                  What is the total delivered value excluding services?
                </span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Delivered value..."
                />
              </div>
              <div className="radioBack">
                <span>
                  Are the services broken down as a separate cost item in the
                  contract?
                </span>
                <div>
                  <div>
                    <input
                      type="radio"
                      name="serviceBrokeRadio"
                      value="Yes"
                      onChange={handleRadioClick4}
                    />
                    <label>Yes</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="serviceBrokeRadio"
                      value="No"
                      onChange={handleRadioClick4}
                    />
                    <label>No</label>
                  </div>
                </div>
                {selectedRadioBtn4 == "Yes" ? (
                  <>
                    <div className="inputContainer">
                      <span>
                        Enter the % of the total order that is constituted by
                        services
                      </span>
                      <input
                        type="text"
                        className="inputs"
                        id="percentage"
                        placeholder="30"
                      />
                    </div>
                    <div className="inputContainer">
                      <span>When are the services expected to start?</span>
                      <input type="date" className="inputs" id="calendar" />
                    </div>
                    <div className="inputContainer">
                      <span>When are the services expected to end?</span>
                      <input type="date" className="inputs" id="calendar" />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
}

export default Index;
