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
      <div className="impInfoContainer">
        <div className="relContainer">
          <div className="shareholdRel">
            <div className="maintitle">SHAREHOLDING RELATIONSHIP</div>
            <div className="radioBack">
              <span>
                Do you have a shareholding relationship with the importer/buyer?
              </span>
              <div>
                <div>
                  <input
                    type="radio"
                    value="Yes"
                    name="shareHoldRadio"
                    onChange={handleRadioClick}
                  />
                  <label>Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="No"
                    name="shareHoldRadio"
                    onChange={handleRadioClick}
                  />
                  <label>No</label>
                </div>
              </div>
              {selectedRadioBtn == "Yes" ? (
                <div className="inputContainer">
                  <span>Describe the shareholding relationship</span>
                  <input
                    type="text"
                    className="inputs"
                    placeholder="Business relationship"
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="vLine"></div>
          <div className="influenceRel">
            <div className="maintitle">INFLUENCE</div>
            <div className="radioBack">
              <span>
                Do you have a significant influence on the importer management?
              </span>
              <div>
                <div>
                  <input
                    type="radio"
                    value="Yes"
                    name="relInfluenceRadio"
                    onChange={handleRadioClick1}
                  />
                  <label>Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="No"
                    name="relInfluenceRadio"
                    onChange={handleRadioClick1}
                  />
                  <label>No</label>
                </div>
              </div>
              {selectedRadioBtn1 == "Yes" ? (
                <>
                  <div className="inputContainer">
                    <span>
                      Explain the influence on the importer management.
                    </span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="15% share"
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="vLine"></div>
          <div className="paymentExpRel">
            <div className="maintitle">PAYMENT EXPERIENCE</div>
            <div className="radioBack">
              <span>
                Do you have previous payment experience with the importer?
              </span>
              <div>
                <div>
                  <input
                    type="radio"
                    value="Yes"
                    name="relPaymentRadio"
                    onChange={handleRadioClick2}
                  />
                  <label>Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="No"
                    name="relPaymentRadio"
                    onChange={handleRadioClick2}
                  />
                  <label>No</label>
                </div>
              </div>
              {selectedRadioBtn2 == "Yes" ? (
                <>
                  <div className="inputContainer">
                    <span>Describe your previous payment experience.</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="International transfer"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>Length of payment experience</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="3 Months"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>Number of deals</span>
                    <input type="text" className="inputs" placeholder="8" />
                  </div>
                  <div className="inputContainer">
                    <span>Average volume of business with your customer</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="5,000,000"
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            {selectedRadioBtn2 == "Yes" ? (
              <div className="selectBack">
                <div className="inputContainer">
                  <span>Payment history with importer</span>
                  <select name="" id="" className="inputs">
                    <option value="">Delays</option>
                    <option value=""></option>
                  </select>
                </div>
                <div className="inputContainer">
                  <span>Explain payment delays</span>
                  <input
                    type="text"
                    className="inputs"
                    placeholder="Customs clearence delay"
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
}

export default Index;
