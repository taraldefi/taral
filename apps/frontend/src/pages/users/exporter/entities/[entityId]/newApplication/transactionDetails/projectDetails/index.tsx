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
  const [, setSelectedRadioBtn3] = React.useState("No");
  const handleRadioClick3 = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn3(e.currentTarget.value);
  const [selectedRadioBtn4, setSelectedRadioBtn4] = React.useState("No");
  const handleRadioClick4 = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn4(e.currentTarget.value);

  return (
    <>
      <ApplicationLayout>
        <div className="tsNewContainers">
          <div className="tsProjContainer">
            <div className="projectDetails">
              <div className="maintitle">PROJECT DETAILS</div>
              <div className="verticalProjectContainer">
                <div className="inputContainer">
                  <span>
                    Please provide a short description of the project.
                  </span>
                  <input
                    type="text"
                    className="inputs"
                    placeholder="About the project..."
                  />
                </div>
                <div className="inputContainer">
                  <span>For what purpose will the goods be used</span>
                  <input
                    type="text"
                    className="inputs"
                    placeholder="Add purpose.."
                  />
                </div>
                <div className="radioBack">
                  <span>Are these investment goods?</span>
                  <div>
                    <div>
                      <input
                        type="radio"
                        id="goodsYes"
                        name="tsRadio"
                        value="Yes"
                      />
                      <label>Yes</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="goodsNO"
                        name="tsRadio"
                        value="No"
                      />
                      <label>No</label>
                    </div>
                  </div>
                </div>
                <div className="radioBack">
                  <span>Are services expected to be included?</span>
                  <div>
                    <div>
                      <input
                        type="radio"
                        id="serviceYes"
                        name="tsServiceRadio"
                        value="Yes"
                      />
                      <label>Yes</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="serviceNO"
                        name="tsServiceRadio"
                        value="No"
                      />
                      <label>No</label>
                    </div>
                  </div>
                </div>
                <div className="inputContainer">
                  <span>Exported good type</span>
                  <select className="inputs">
                    <option className="inputs">Select type...</option>
                    <option></option>
                    <option></option>
                  </select>
                </div>
                <div className="radioBack">
                  <span>Are you delivering secondhand goods?</span>
                  <div>
                    <div>
                      <input
                        type="radio"
                        id="secondYes"
                        name="tsSecondRadio"
                        value="Yes"
                        onChange={handleRadioClick}
                      />
                      <label>Yes</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="secondNO"
                        name="tsSecondRadio"
                        value="No"
                        onChange={handleRadioClick}
                      />
                      <label>No</label>
                    </div>
                  </div>
                  {selectedRadioBtn == "Yes" ? (
                    <div>
                      <div className="inputContainer">
                        <span>What year were the goods manufactured?</span>
                        <input type="date" className="inputs" id="calendar" />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <div className="vLine"></div>
            <div className="consortium">
              <div className="maintitle">CONSORTIUM</div>
              <div className="verticalConContainer">
                <div className="radioBack">
                  <span>
                    Are you delivering the project as part of a consortium with
                    other companies?
                  </span>
                  <div>
                    <div>
                      <input
                        type="radio"
                        id="consortiumdYes"
                        name="tsConsortiumdRadio"
                        value="Yes"
                        onChange={handleRadioClick1}
                      />
                      <label>Yes</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="consortiumdNO"
                        name="tsConsortiumdRadio"
                        value="No"
                        onChange={handleRadioClick1}
                      />
                      <label>No</label>
                    </div>
                  </div>
                </div>
                {selectedRadioBtn1 == "Yes" ? (
                  <div className="radioBack">
                    <div className="inputContainer">
                      <span>
                        Please provide a detailed description of the project
                      </span>
                      <textarea
                        className="inputs"
                        placeholder="A project is an individual or collaborative enterprise that is carefully planned to achieve a particular aim."
                      />
                    </div>
                    <div className="inputContainer">
                      <span>
                        What is the total value of the consortium project?
                      </span>
                      <input
                        type="text"
                        className="inputs"
                        placeholder="5,000,000"
                      />
                    </div>
                    <div className="inputContainer">
                      <span>
                        How is the rest of the project intended to be financed?
                      </span>
                      <input
                        type="text"
                        className="inputs"
                        placeholder="Internal investment"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="inputContainer">
                    <span>
                      Please provide a detailed description of the project
                    </span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="About the project..."
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="vLine"></div>
            <div className="license">
              <div className="maintitle">LICENSE</div>
              <div className="verticalLicenseContainer">
                <div className="radioBack">
                  <span>Is an export license required?</span>
                  <div>
                    <div>
                      <input
                        type="radio"
                        id="licenseExYes"
                        name="tslicenseExRadio"
                        value="Yes"
                        onChange={handleRadioClick2}
                      />
                      <label>Yes</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="licenseExNO"
                        name="tslicenseExRadio"
                        value="No"
                        onChange={handleRadioClick2}
                      />
                      <label>No</label>
                    </div>
                  </div>
                  {selectedRadioBtn2 == "Yes" ? (
                    <div>
                      <div className="inputContainer">
                        <span>
                          Which export license regulations do the goods fall
                          under?
                        </span>
                        <input
                          type="text"
                          className="inputs"
                          placeholder="Global regulations"
                        />
                      </div>
                      <div className="inputContainer">
                        <span>
                          Has the export license already been received?
                        </span>
                        <input
                          type="text"
                          className="inputs"
                          placeholder="Correct"
                        />
                      </div>
                      <div className="inputContainer">
                        <span>What is the remaining life of the goods?</span>
                        <input
                          type="text"
                          className="inputs"
                          placeholder="3 Years"
                        />
                      </div>
                      <div className="hLine"></div>
                      <div className="secondRadio">
                        <span>Were the goods overhauled?</span>
                        <div>
                          <div>
                            <input
                              type="radio"
                              id="overhauledYes"
                              name="tsoverhauledRadio"
                              value="Yes"
                              onChange={handleRadioClick4}
                            />
                            <label>Yes</label>
                          </div>
                          <div>
                            <input
                              type="radio"
                              id="overhauledNO"
                              name="tsoverhauledRadio"
                              value="No"
                              onChange={handleRadioClick4}
                            />
                            <label>No</label>
                          </div>
                        </div>
                        {selectedRadioBtn4 == "Yes" ? (
                          <div>
                            <div className="inputContainer">
                              <span>
                                In which country were the goods overhauled?
                              </span>
                              <select className="inputs">
                                <option value="Greece">Greece</option>
                                <option value=""></option>
                              </select>
                            </div>
                            <div className="inputContainer">
                              <span>Why were the goods overhauled abroad?</span>
                              <input
                                type="text"
                                className="inputs"
                                placeholder="Missing documents."
                              />
                            </div>
                            <div className="inputContainer">
                              <span>Why were the goods not refurbished?</span>
                              <input
                                type="text"
                                className="inputs"
                                placeholder="Mistake from supplier"
                              />
                            </div>
                            <div className="inputContainer">
                              <span>
                                Why were the goods not overhauled in KSA?
                              </span>
                              <input
                                type="text"
                                className="inputs"
                                placeholder="Overhauled overseas"
                              />
                            </div>
                            <div className="inputContainer">
                              <span>
                                What proportion of the goods were overhauled
                                abroad?
                              </span>
                              <input
                                type="text"
                                className="inputs"
                                id="percentage"
                                placeholder="25"
                              />
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="radioBack">
                  <span>Has the import license already been received?</span>
                  <div>
                    <div>
                      <input
                        type="radio"
                        id="licenseImYes"
                        name="tslicenseImRadio"
                        value="Yes"
                        onChange={handleRadioClick3}
                      />
                      <label>Yes</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="licenseImNO"
                        name="tslicenseImRadio"
                        value="No"
                        onChange={handleRadioClick3}
                      />
                      <label>No</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ApplicationLayout>
    </>
  );
}

export default Index;
