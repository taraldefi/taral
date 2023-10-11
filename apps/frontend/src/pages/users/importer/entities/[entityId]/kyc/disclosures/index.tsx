import ImporterKycLayout from "@components/layouts/importer/importerKycLayout";
import React, { useEffect, useRef, useState } from "react";

function Index() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [, setValue] = useState<string>();
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, []);
  const textareaRef1 = useRef<HTMLTextAreaElement | null>(null);
  const textAreaChange1 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    if (textareaRef1 && textareaRef1.current) {
      textareaRef1.current.style.height = "10px";
      const scrollHeight = textareaRef1.current.scrollHeight;
      textareaRef1.current.style.height = scrollHeight + "px";
    }
  }, []);
  return (
    <ImporterKycLayout>
      <div className="kycContainer">
        <div className="outerContainerKyc">
          <div className="innerContainer1">
            <div className="mainTitle">LEGAL DISCLOSURES</div>
            <div className="inputContainer">
              <span>Disciplinary Actions</span>
              <textarea
                ref={textareaRef}
                onChange={textAreaChange}
                className="inputs"
                name=""
                id=""
              >
                A disciplinary action is a reprimand or corrective action in
                response to employee misconduct, rule violation, or poor
                performance.
              </textarea>
            </div>
            <div className="inputContainer">
              <span>Tax matters</span>
              <textarea
                ref={textareaRef}
                onChange={textAreaChange}
                className="inputs"
                name=""
                id=""
              >
                As Tax Matters Partner, the General Partner shall have the right
                and obligation to take all actions authorized and required,
                respectively, by the Code for the Tax Matters Partner.
              </textarea>
            </div>

            <div className="inputContainer">
              <span>Convictions against entity</span>
              <textarea
                ref={textareaRef1}
                onChange={textAreaChange1}
                className="inputs"
                name=""
                id=""
              >
                Litigation Matter means any claim, investigation, arbitration,
                grievance, litigation, action, suit or proceeding,
                administrative or judicial, to which a Party is (or, to such
                Party&apos;s knowledge, is threatened to be made) a party, or
                relating to any Acquired Asset, or this Agreement (in each case
                whether such Party is a plaintiff, defendant or otherwise), at
                law or in equity or otherwise, or before any Governmental
                Authority.
              </textarea>
            </div>
            <div className="inputContainer">
              <span>Convictions against entity</span>
              <textarea
                ref={textareaRef}
                onChange={textAreaChange}
                className="inputs"
                name=""
                id=""
              >
                Convicted Entity means an individual or entity, as applicable,
                who has been convicted of a criminal offense that falls within
                the ambit of 42 U.S.C. §1320a - 7(a), but has not yet been
                excluded, debarred, suspended or otherwise declared ineligible.
              </textarea>
            </div>
          </div>
          <div className="innerContainer2"></div>
        </div>
      </div>
    </ImporterKycLayout>
  );
}

export default Index;
