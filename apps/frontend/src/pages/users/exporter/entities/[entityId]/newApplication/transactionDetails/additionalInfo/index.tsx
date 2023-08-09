import ApplicationLayout from "@components/layouts/new_application_layout";
import React from "react";

function Index() {
  const [valueSelect, setValueSelect] = React.useState("Select currency...");
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValueSelect(e.currentTarget.value);
  };
  const [selectedRadioBtn, setSelectedRadioBtn] = React.useState("No");
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedRadioBtn(e.currentTarget.value);
  };
  return (
    <ApplicationLayout>
      <div className="tsNewContainers">
        <div className="tsAddiContainer">
          <div className="respContainer">
            <div className="maintitle">RESPONSIBILITY</div>
            <div className="radioBack">
              <span>Is your company fully responsible for the project?</span>
              <div>
                <div>
                  <input type="radio" value="Yes" name="responsibilityRadio" />
                  <label>Yes</label>
                </div>
                <div>
                  <input type="radio" value="No" name="responsibilityRadio" />
                  <label>No</label>
                </div>
              </div>
            </div>
            <div className="inputContainer">
              <span>Non-standard accounting methodologies used in project</span>
              <input
                type="text"
                className="inputs"
                placeholder="Write here..."
              />
            </div>
            <div className="selectBack">
              <span>Enter the currency for the entire project.</span>
              <select
                className="inputs"
                value={valueSelect}
                onChange={handleSelect}
              >
                <option value="Select currency...">Select currency...</option>
                <option value="USD">USD</option>
                <option value="INR">INR</option>
              </select>
              {valueSelect != "Select currency..." ? (
                <>
                  <div className="inputContainer">
                    <span>Enter the amount for the entire project.</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="5,000,000"
                    />
                  </div>
                  <div className="inputContainer">
                    <span>
                      Provide a description of the product and services
                      delivered.
                    </span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Provide a description..."
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="vLine"></div>
          <div className="addiContainer">
            <div className="maintitle">ADDITIONAL INFO</div>
            <div className="inputContainer">
              <span>Additional financing applications reference number</span>
              <input
                type="text"
                className="inputs"
                placeholder="Reference number..."
              />
            </div>
            <div className="selectBack">
              <div>
                <span>ECA name cover if it’s been secured/applied</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="ECA name..."
                />
              </div>
              <div>
                <span>Has the cover been preliminarily approved?</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Write here..."
                />
              </div>
              <div>
                <span>Has the cover received final approval?</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Write here..."
                />
              </div>
              <div>
                <span>Application UID ECA cover</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Write here..."
                />
              </div>
            </div>
          </div>
          <div className="vLine"></div>
          <div className="certiContainer">
            <div className="maintitle">CERTIFICATE</div>
            <div className="radioBack">
              <span>Do you have a certification of origin for the goods?</span>
              <div>
                <div>
                  <input
                    type="radio"
                    value="Yes"
                    name="tsCertiGoodsRadio"
                    onChange={handleClick}
                  />
                  <label>Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="No"
                    name="tsCertiGoodsRadio"
                    onChange={handleClick}
                  />
                  <label>No</label>
                </div>
              </div>
              {selectedRadioBtn == "Yes" ? (
                <div className="radioIn">
                  <div className="inputContainer">
                    <span>
                      Do you have a certification of origin for part of the
                      goods?
                    </span>
                    <div>
                      <div>
                        <input
                          type="radio"
                          value="Yes"
                          name="certiOriginRadio"
                        />
                        <label>Yes</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          value="No"
                          name="certiOriginRadio"
                        />
                        <label>No</label>
                      </div>
                    </div>
                  </div>
                  <div className="inputContainer">
                    <span>
                      Select the country of the purchased sub suppliers
                    </span>
                    <select name="" id="" className="inputs">
                      <option value="">China</option>
                      <option value="">Japan</option>
                    </select>
                  </div>
                  <div className="inputContainer">
                    <span>
                      Value of the materials from the purchased sub-suppliers
                    </span>
                    <select name="" id="" className="inputs">
                      <option value="">Full</option>
                      <option value=""></option>
                    </select>
                  </div>
                  <div className="inputContainer">
                    <span>Enter the name of the sub-supplier.</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Global Traders Inc,."
                    />
                  </div>
                  <div className="inputContainer">
                    <span>
                      Describe why all foreign sub-suppliers are necessary.
                    </span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Write here..."
                    />
                  </div>
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
