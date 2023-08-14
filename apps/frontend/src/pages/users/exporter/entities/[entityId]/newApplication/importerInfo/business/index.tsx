import ApplicationLayout from "@components/layouts/new_application_layout";
import React from "react";

function Index() {
  const [selectedValue, setSelectedValue] = React.useState("Select country...");
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedValue(e.currentTarget.value);
  const [selectedValue1, setSelectedValue1] =
    React.useState("Select country...");
  const handleSelect1 = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedValue1(e.currentTarget.value);
  const [selectedValue2, setSelectedValue2] =
    React.useState("Select country...");
  const handleSelect2 = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedValue2(e.currentTarget.value);
  const [selectedRadioBtn, setSelectedRadioBtn] = React.useState("No");
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn(e.currentTarget.value);
  const [selectedRadioBtn1, setSelectedRadioBtn1] = React.useState("No");
  const handleClick1 = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn1(e.currentTarget.value);
  const [selectedRadioBtn2, setSelectedRadioBtn2] = React.useState("No");
  const handleClick2 = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn2(e.currentTarget.value);
  return (
    <ApplicationLayout>
      <div className="impInfoContainer">
        <div className="busiContainer">
          <div className="busiRegistration">
            <div className="maintitle">REGISTRATION</div>
            <div className="inputContainer">
              <span>Importer Tax ID</span>
              <input type="text" className="inputs" placeholder="Tax ID..." />
            </div>
            <div className="inputContainer">
              <span>Importer company registration number</span>
              <input
                type="text"
                className="inputs"
                placeholder="Registration number..."
              />
            </div>
            <div className="selectBack">
              <div className="inputContainer">
                <span>Main countries of business 1</span>
                <select className="inputs" onChange={handleSelect}>
                  <option value="Select country...">Select country...</option>
                  <option value="Germany">Germany</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="France">France</option>
                  <option value="india">india</option>
                </select>
              </div>
              {selectedValue != "Select country..." ? (
                <>
                  <div className="inputContainer">
                    <span>Main countries of business 2</span>
                    <select className="inputs" onChange={handleSelect1}>
                      <option value="Select country...">
                        Select country...
                      </option>
                      <option value="Germany">Germany</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="France">France</option>
                      <option value="india">india</option>
                    </select>
                  </div>
                  {selectedValue1 != "Select country..." ? (
                    <>
                      <div className="inputContainer">
                        <span>Main countries of business 3</span>
                        <select className="inputs" onChange={handleSelect2}>
                          <option value="Select country...">
                            Select country...
                          </option>
                          <option value="Germany">Germany</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="France">France</option>
                          <option value="india">india</option>
                        </select>
                      </div>
                      {selectedValue2 !== "Select country..." ? (
                        <>
                          <div className="inputContainer">
                            <span>Main countries of business 4</span>
                            <select className="inputs">
                              <option value="Select country...">
                                Select country...
                              </option>
                              <option value="Germany">Germany</option>
                              <option value="Switzerland">Switzerland</option>
                              <option value="France">France</option>
                              <option value="india">india</option>
                            </select>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="vLine"></div>
          <div className="busiStatus">
            <div className="maintitle">BUSINESS STATUS</div>
            <div className="radioBack">
              <span>Is the company controlled by another mother company?</span>
              <div>
                <div>
                  <input type="radio" name="busiStatRadio" value="Yes" />
                  <label>Yes</label>
                </div>
                <div>
                  <input type="radio" name="busiStatRadio" value="No" />
                  <label>No</label>
                </div>
              </div>
            </div>
            <div className="radioBack">
              <span>Does your importer operate in the private sector?</span>
              <div>
                <div>
                  <input
                    type="radio"
                    name="busiStatRadio"
                    value="Yes"
                    onChange={handleClick}
                  />
                  <label>Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="busiStatRadio"
                    value="No"
                    onChange={handleClick}
                  />
                  <label>No</label>
                </div>
              </div>
              {selectedRadioBtn == "Yes" ? (
                <>
                  <div className="inputContainer">
                    <span>
                      Please select the importer sector from the list below.
                    </span>
                    <select name="" id="" className="inputs">
                      <option value="">Software Development</option>
                      <option value=""></option>
                    </select>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="radioBack">
              <span>Does your importer operate in the public sector?</span>
              <div>
                <div>
                  <input
                    type="radio"
                    name="busiStatRadio"
                    value="Yes"
                    onChange={handleClick1}
                  />
                  <label>Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="busiStatRadio"
                    value="No"
                    onChange={handleClick1}
                  />
                  <label>No</label>
                </div>
              </div>
              {selectedRadioBtn1 == "Yes" ? (
                <>
                  <div className="inputContainer">
                    <span>
                      Please select the importer sector from the list below.
                    </span>
                    <select name="" id="" className="inputs">
                      <option value="">Software Development</option>
                      <option value=""></option>
                    </select>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="vLine"></div>
          <div className="busiRating">
            <div className="maintitle">EXTERNAL RATING</div>
            <div className="radioBack">
              <span>Has the importer provided an external rating?</span>
              <div>
                <div>
                  <input
                    type="radio"
                    name="busiRatingRadio"
                    value="Yes"
                    onChange={handleClick2}
                  />
                  <label>Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="busiRatingRadio"
                    value="No"
                    onChange={handleClick2}
                  />
                  <label>No</label>
                </div>
              </div>
              {selectedRadioBtn2 == "Yes" ? (
                <>
                  <div className="inputContainer">
                    <span>Importer rating</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="80"
                      id="percentage"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>Importer rating agency</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Global Company"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>Importer rating issued date</span>
                    <input type="date" id="calendar" className="inputs" />
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
