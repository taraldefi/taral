import ApplicationLayout from "@components/layouts/new_application_layout";
import React from "react";

function Index() {
  const [selectedRadioBtn, setSelectedRadioBtn] = React.useState("Yes");

  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn(e.currentTarget.value);
  const [selectedRadioBtn1, setSelectedRadioBtn1] = React.useState("No");

  const handleRadioClick1 = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn1(e.currentTarget.value);
  const [valueSelect, setValueSelect] = React.useState("Select country...");
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValueSelect(e.currentTarget.value);
  };
  const [valueSelect1, setValueSelect1] = React.useState("Select country...");
  const handleSelect1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValueSelect1(e.currentTarget.value);
  };
  const [valueSelect2, setValueSelect2] = React.useState("Select country...");
  const handleSelect2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValueSelect2(e.currentTarget.value);
  };

  return (
    <div>
      <ApplicationLayout>
        <div className="exporterInfoContainer">
          <div className="generalInfo">
            <div className="maintitle">GENERAL INFO</div>
            <div>
              <span>What is your company name?</span>
              <input
                type="text"
                className="inputs"
                placeholder="Company name..."
              />
            </div>
            <div>
              <span>Please provide a contact telephone number</span>
              <input
                type="text"
                className="inputs"
                placeholder="Contact number..."
              />
            </div>
            <div>
              <span>Company address</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 1..."
              />
            </div>
            <div>
              <span>Company address line 2</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 2..."
              />
            </div>
            <div className="splitBox">
              <div>
                <span>Company Post Code</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Post code..."
                />
              </div>
              <div>
                <span>Employees count</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Employees count..."
                />
              </div>
            </div>
            <div>
              <span>Country of Registration</span>
              <select className="inputs">
                <option value="">Select country...</option>
                <option value=""></option>
              </select>
            </div>
            <div className="countriesBox">
              <span>Main countries of business 1</span>
              <select
                className="inputs"
                value={valueSelect}
                onChange={handleSelect}
              >
                <option value="Select country...">Select country...</option>
                <option value="China">China</option>
                <option value="Japan">Japan</option>
                <option value="India">India</option>
              </select>
              {valueSelect != "Select country..." ? (
                <div className="countriesBoxIn">
                  <span>Main countries of business 2</span>
                  <select
                    className="inputs"
                    value={valueSelect1}
                    onChange={handleSelect1}
                  >
                    <option value="Select country...">Select country...</option>
                    <option value="China">China</option>
                    <option value="Japan">Japan</option>
                    <option value="India">India</option>
                  </select>
                  {valueSelect1 != "Select country..." ? (
                    <div className="countriesBoxIn">
                      <span>Main countries of business 3</span>
                      <select
                        className="inputs"
                        value={valueSelect2}
                        onChange={handleSelect2}
                      >
                        <option value="Select country...">
                          Select country...
                        </option>
                        <option value="China">China</option>
                        <option value="Japan">Japan</option>
                        <option value="India">India</option>
                      </select>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div>
              <span>Date company registered</span>
              <input type="date" className="inputs" id="calendar" />
            </div>
          </div>
          <div className="vLine"></div>
          <div className="taxAndRevenue">
            <div className="maintitle">TAX AND REVENUE</div>
            <div>
              <span>Tax Identification Number</span>
              <input
                type="text"
                className="inputs"
                placeholder="Tax number..."
              />
            </div>
            <div>
              <span>Date of the last fiscal year</span>
              <input type="date" className="inputs" id="calendar" />
            </div>
            <div>
              <span>Total revenue last fiscal year? (USD)</span>
              <input
                type="text"
                className="inputs"
                placeholder="Revenue amount..."
              />
            </div>
            <div>
              <span>What % of revenue was comprised by exports?</span>
              <input
                type="text"
                id="percentage"
                className="inputs"
                placeholder="Revenue percentage..."
              />
            </div>
            <div>
              <span>Export value in USD in thousand last two years</span>
              <input
                type="text"
                className="inputs"
                placeholder="Export value..."
              />
            </div>
            <div className="radioBack">
              <span>Are the financials audited or produced in-house?</span>
              <div>
                <div>
                  <input
                    type="radio"
                    id="Audited"
                    name="financials"
                    value="Audited"
                  />
                  <label htmlFor="Audited">Audited</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="In-house"
                    name="financials"
                    value="In-house"
                  />
                  <label htmlFor="In-house">In-house</label>
                </div>
              </div>
            </div>
            <div>
              <span>Where will the goods be produced?</span>
              <select className="inputs">
                <option value="">Select factory location...</option>
                <option value=""></option>
              </select>
            </div>
          </div>
          <div className="vLine"></div>
          <div className="otherInfo">
            <div className="maintitle">OTHER INFO</div>
            <div>
              <span>How many year of export experience do you have?</span>
              <select className="inputs">
                <option value="">Select years...</option>
                <option value=""></option>
              </select>
            </div>
            <div className="radioBack">
              <span>Have you previously used ECA cover?</span>
              <div>
                <div>
                  <input
                    type="radio"
                    id="ECACoverYes"
                    name="otherInfoRadio"
                    value="Yes"
                    onChange={handleRadioClick}
                  />
                  <label htmlFor="ECACoverYes">Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="ECACoverNO"
                    name="otherInfoRadio"
                    value="No"
                    onChange={handleRadioClick}
                  />
                  <label htmlFor="ECACoverNO">No</label>
                </div>
              </div>
              {selectedRadioBtn == "No" ? (
                <div className="radioBackIn">
                  <div>
                    <span>How many years of trading without ECA cover?</span>
                    <input type="text" className="inputs" placeholder="3" />
                  </div>
                  <div></div>
                  <div>
                    <span>
                      How many years of experience with importer country?
                    </span>
                    <input type="text" className="inputs" placeholder="3" />
                  </div>
                  <div>
                    <span>Describe your receivables management process.</span>
                    <textarea
                      className="inputs"
                      placeholder="A process is the instance of a computer program that is being executed by one or many threads  ."
                    />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <div className="radioBack">
              <span>Is an external credit rating available?</span>
              <div>
                <div>
                  <input
                    type="radio"
                    id="ECRYes"
                    name="otherInfoRadio1"
                    value="Yes"
                    onChange={handleRadioClick1}
                  />
                  <label htmlFor="ECRYes">Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="ECRNO"
                    name="otherInfoRadio1"
                    value="No"
                    onChange={handleRadioClick1}
                  />
                  <label htmlFor="ECRNO">No</label>
                </div>
              </div>
              {selectedRadioBtn1 == "Yes" ? (
                <div className="radioBackIn">
                  <div>
                    <span>Please provide the credit rating</span>
                    <input type="number" className="inputs" placeholder="80" />
                  </div>
                  <div></div>
                  <div>
                    <span>Which agency provided the rating?</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Global Trade Inc,."
                    />
                  </div>
                  <div>
                    <span>When was the rating issued?</span>
                    <input type="date" id="calendar" className="inputs" />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </ApplicationLayout>
    </div>
  );
}

export default Index;
