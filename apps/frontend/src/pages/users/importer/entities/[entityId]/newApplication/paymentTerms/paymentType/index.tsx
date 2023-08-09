import ApplicationLayout from "@components/layouts/new_application_layout";
import React from "react";

function Index() {
  const [selectedRadioBtn, setSelectedRadioBtn] = React.useState("No");
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn(e.currentTarget.value);
  const [selectedRadioBtn1, setSelectedRadioBtn1] = React.useState("No");
  const handleRadioClick1 = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn1(e.currentTarget.value);
  const [selectedRadioBtn2, setSelectedRadioBtn2] = React.useState("No");
  const handleRadioClick2 = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn2(e.currentTarget.value);
  return (
    <ApplicationLayout>
      <div className="ptContainer">
        <div className="ptItemsContainer">
          <div className="ptShort">
            <div className="maintitle">PAYMENT TYPE (SHORT)</div>
            <div className="radioBack">
              <span>Is a short term payment being offered/requested?</span>
              <div>
                <div>
                  <input
                    type="radio"
                    name="ptShortRadio"
                    value="Yes"
                    onChange={handleRadioClick}
                  />
                  <label>Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="ptShortRadio"
                    value="No"
                    onChange={handleRadioClick}
                  />
                  <label>No</label>
                </div>
              </div>
              {selectedRadioBtn == "Yes" ? (
                <>
                  <div className="inputContainer">
                    <span>
                      What is the currency agreed for the downpayment?
                    </span>
                    <select name="" id="" className="inputs">
                      <option value="">USD</option>
                      <option value="">INR</option>
                    </select>
                  </div>
                  <div className="inputContainer">
                    <span>How much is the downpayment amount?</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="500000"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>Description for the short term downpayment</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Deposit for the shipment"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>What is the currency agreed for the balance?</span>
                    <select name="" id="" className="inputs">
                      <option id="">USD</option>
                      <option id="">INR</option>
                    </select>
                  </div>
                  <div className="inputContainer">
                    <span>How much is the balance amount?</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="1500000"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>When will the balance be paid?</span>
                    <input type="date" className="inputs" id="calendar" />
                  </div>
                  <div className="inputContainer">
                    <span>
                      Please describe if a payment vehicle/SPV will be utilised.
                    </span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Description..."
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="vLine"></div>
          <div className="ptMedium">
            <div className="maintitle">PAYMENT TYPE (MEDIUM)</div>
            <div className="radioBack">
              <span>Is a medium term payment being offered/requested?</span>
              <div>
                <div>
                  <input
                    type="radio"
                    name="ptMediumRadio"
                    value="Yes"
                    onChange={handleRadioClick1}
                  />
                  <label>Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="ptMediumRadio"
                    value="No"
                    onChange={handleRadioClick1}
                  />
                  <label>No</label>
                </div>
              </div>
              {selectedRadioBtn1 == "Yes" ? (
                <>
                  <div className="inputContainer">
                    <span>
                      What is the currency agreed for the downpayment?
                    </span>
                    <select name="" className="inputs" id="">
                      <option value="">USD</option>
                      <option value="">INR</option>
                    </select>
                  </div>
                  <div className="inputContainer">
                    <span>How much is the downpayment amount?</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="500000"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>Description for the downpayment</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Deposit for the shipment"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>
                      What is the currency agreed for the outstanding amount?
                    </span>
                    <select name="" className="inputs" id="">
                      <option value="">USD</option>
                      <option value="">INR</option>
                    </select>
                  </div>
                  <div className="inputContainer">
                    <span>How much is the outstanding amount?</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="1500000"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>Description for the outstanding amount</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Description..."
                    />
                  </div>
                  <div className="inputContainer">
                    <span>
                      Please describe if a payment vehicle/SPV will be utilised.
                    </span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Description..."
                    />
                  </div>
                  <div className="inputContainer">
                    <span>When is the downpayment expected?</span>
                    <input type="date" className="inputs" id="calendar" />
                  </div>
                  <div className="inputContainer">
                    <span>What repayment structure has been agreed?</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Structure..."
                    />
                  </div>
                  <div className="inputContainer">
                    <span>When does the credit period begin?</span>
                    <input type="date" className="inputs" id="calendar" />
                  </div>
                  <div className="inputContainer">
                    <span>Please add additional notes/description</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Notes..."
                    />
                  </div>
                  <div className="inputContainer">
                    <span>What are the number of repayment installments?</span>
                    <input type="text" className="inputs" placeholder="6" />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="vLine"></div>
          <div className="ptSM">
            <div className="maintitle">PAYMENT TYPE (SHORT-MEDIUM)</div>
            <div className="radioBack">
              <span>
                Is a combination of both short-term and medium-term being
                offered/requested?
              </span>
              <div>
                <div>
                  <input
                    type="radio"
                    name="ptShortMediumRadio"
                    value="Yes"
                    onChange={handleRadioClick2}
                  />
                  <label>Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="ptShortMediumRadio"
                    value="No"
                    onChange={handleRadioClick2}
                  />
                  <label>No</label>
                </div>
              </div>
              {selectedRadioBtn2 == "Yes" ? (
                <>
                  <div className="inputContainer">
                    <span>
                      What is the currency agreed for the downpayment?
                    </span>
                    <select name="" id="" className="inputs">
                      <option value="">USD</option>
                      <option value="">INR</option>
                    </select>
                  </div>
                  <div className="inputContainer">
                    <span>How much is the downpayment amount?</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="500000"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>Description for the downpayment</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Deposit for the shipment"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>What is the currency agreed for the balance?</span>
                    <select name="" id="" className="inputs">
                      <option id="">USD</option>
                      <option id="">INR</option>
                    </select>
                  </div>
                  <div className="inputContainer">
                    <span>How much is the balance amount?</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="1500000"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>When will the balance be paid?</span>
                    <input type="date" className="inputs" id="calendar" />
                  </div>
                  <div className="inputContainer">
                    <span>Over which payment term were these agreed?</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Description..."
                    />
                  </div>
                  <div className="inputContainer">
                    <span>Advance payment currency (if any)</span>
                    <select name="" id="" className="inputs">
                      <option id="">USD</option>
                      <option id="">INR</option>
                    </select>
                  </div>
                  <div className="inputContainer">
                    <span>Advance payment amount (if any)</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="500000"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>Advance payment description (if any)</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Description..."
                    />
                  </div>
                  <div className="inputContainer">
                    <span>Deposit received already?</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="100000"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>What is the expected repayment structure?</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Description..."
                    />
                  </div>
                  <div className="inputContainer">
                    <span>When is the credit start date?</span>
                    <input type="date" className="inputs" id="calendar" />
                  </div>
                  <div className="inputContainer">
                    <span>Are there any special structures agreed?</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Description..."
                    />
                  </div>
                  <div className="inputContainer">
                    <span>What are the number of repayment installments?</span>
                    <input type="text" className="inputs" placeholder="6" />
                  </div>
                  <div className="inputContainer">
                    <span>
                      Please describe if a payment vehicle will be utilised
                    </span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Description..."
                    />
                  </div>
                </>
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
