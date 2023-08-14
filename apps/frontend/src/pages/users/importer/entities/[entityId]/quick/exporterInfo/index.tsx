import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import React from "react";

function Index() {
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
              <span>Phone Number</span>
              <input
                type="text"
                className="inputs"
                placeholder="Contact number..."
              />
            </div>
            <div>
              <span>Address</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 1..."
              />
            </div>
            <div>
              <span>Address Line 2</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 2..."
              />
            </div>
            <div>
              <span>Company Post Code</span>
              <input
                type="text"
                className="inputs"
                placeholder="Post code..."
              />
            </div>
          </div>
          <div className="vLine"></div>
          <div className="taxAndRevenue">
            <div className="maintitle">TAX AND REVENUE</div>
            <div>
              <span>Total revenue last fiscal year?</span>
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
                className="inputs"
                placeholder="Revenue percentage..."
                id="percentage"
              />
            </div>
          </div>
          <div className="vLine0"></div>
          <div className="otherInfo"></div>
        </div>
        <BottomBar></BottomBar>
      </ApplicationLayout>
    </div>
  );
}

export default Index;
