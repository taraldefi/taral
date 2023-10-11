import { PortalIcons } from "@components/icons";
import ImporterKycLayout from "@components/layouts/importer/importerKycLayout";
import React from "react";
import { Button } from "taral-ui";

function Index() {
  const [selected, setSelected] = React.useState(false);
  return (
    <ImporterKycLayout>
      <>
        {console.log(selected)}
        <div className="kycContainer">
          <div className="outerContainerKyc">
            <div className="innerContainer1">
              <div className="mainTitle">MAIN INFO</div>
              <div className="inputContainer">
                <span>Authorized Under</span>
                <select name="" className="inputs" id="">
                  <option value="">Article of associate</option>
                </select>
              </div>
              <div className="inputContainer">
                <span>ID Number</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="1234567890"
                />
              </div>
              <div className="inputContainer">
                <span>Name</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="John Smith"
                />
              </div>
              <div className="inputContainer">
                <span>Contact Number</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="01-555-123-456"
                />
              </div>
              <div className="inputContainer">
                <span>Email</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="name@mail.com"
                />
              </div>
            </div>
            <div className="vLine"></div>
            <div className="innerContainer2">
              <div className="mainTitle">TRADE INFO</div>
              <div className="inputContainer">
                <span>Applicant Name</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Samantha Larkin"
                />
              </div>
              <div className="inputContainer">
                <span>Client Name</span>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Ura Takahari"
                />
              </div>
              <div className="inputContainer">
                <span>Date</span>
                <input type="date" className="inputs" id="calendar" />
              </div>
            </div>
            <div className="vLine"></div>
            <div className="dummyWrapper">
              <div className="mainTitle">SUPPORTING ATTACHMENTS</div>
              <div className="pdfWrapper">
                <div className="pdfContainer">
                  <span>id-john-smith-legal.pdf</span>
                  <PortalIcons selected={false} icon={"delete"}></PortalIcons>
                </div>
                <div className="buttonContainer">
                  <Button label={"+ Upload New"} onClick={() => null}></Button>
                </div>
              </div>
            </div>
          </div>
          <div className="consentContainer">
            <div className="mainTitle">Acknowledgement and Consent</div>
            <div className="consentInnerItems">
              <span>
                I, the undersigned, hereby certify that the provided information
                is true, correct and complete, as well as the submitted
                documents, and I future undertake to inform and update of any
                changes to such information and update it whenever required to
                annually.
              </span>
              <div className="consentInnerWrapper">
                <div
                  className="consentButtonContainer"
                  onClick={() => setSelected(!selected)}
                >
                  <PortalIcons
                    selected={selected}
                    icon={"checkBox"}
                  ></PortalIcons>
                </div>
                <span>I Acknowlede and agree</span>
              </div>
            </div>
          </div>
        </div>
      </>
    </ImporterKycLayout>
  );
}

export default Index;
