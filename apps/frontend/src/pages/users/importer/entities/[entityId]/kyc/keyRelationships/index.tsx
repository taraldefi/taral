import ImporterKycLayout from "@components/layouts/importer/importerKycLayout";
import React, { useEffect, useRef, useState } from "react";

function Index() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState<string>();
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [value]);
  return (
    <ImporterKycLayout>
      <div className="kycContainer">
        <div className="outerContainerKyc">
          <div className="innerContainer1">
            <div className="mainTitle">RELATIONSHIP INFO</div>
            <div className="inputContainer">
              <span>External Accountant/Auditor</span>
              <input
                className="inputs"
                placeholder="Global Legal Office"
                type="text"
              />
            </div>
            <div className="inputContainer">
              <span>Outsources Legal Consul</span>
              <input
                className="inputs"
                placeholder="Robert Walters"
                type="text"
              />
            </div>
            <div className="inputContainer">
              <span>Regulatory Bodies</span>
              <input
                className="inputs"
                placeholder="Bundesanstalt für Finanzdienstleistungsaufsicht"
                type="text"
              />
            </div>
            <div className="inputContainer">
              <span>Environment & Social Responsibility</span>
              <textarea
                ref={textareaRef}
                onChange={textAreaChange}
                name=""
                className="inputs"
                id=""
                cols={20}
                rows={10}
              >
                Environmental responsibility refers to the belief that
                organizations should behave in as environmentally friendly a way
                as possible.
              </textarea>
            </div>
          </div>
          <div className="vLine"></div>
          <div className="innerContainer2">
            <div className="mainTitle">TOP CUSTOMERS</div>
            <div className="inputContainer">
              <span>Local Top Customers</span>
              <input
                type="text"
                className="inputs"
                placeholder="Kovačić d.o.o., Veum Inc,Ullrich Weigel GmbH"
              />
            </div>
            <div className="inputContainer">
              <span>Foreign Top Customers</span>
              <input
                type="text"
                className="inputs"
                placeholder="McGlynn PLC, Bolduc Morin et Fils"
              />
            </div>
          </div>
          <div className="dummyWrapper"></div>
        </div>
      </div>
    </ImporterKycLayout>
  );
}

export default Index;
