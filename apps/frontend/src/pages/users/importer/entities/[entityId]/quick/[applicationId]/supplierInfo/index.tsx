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
              <span>Supplier&apos;s company name</span>
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
            <div></div>
          </div>
          <div className="vLine"></div>
          <div className="taxAndRevenue">
            <div className="maintitle">RELATIONSHIP WITH SUPPLIER</div>

            <div className="radioBack">
              <span>
                Do you have previous payment experience with the Supplier?
              </span>
              <div>
                <div>
                  <input
                    type="radio"
                    id="Audited"
                    name="financials"
                    value="Audited"
                  />
                  <label htmlFor="Audited">YES</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="In-house"
                    name="financials"
                    value="In-house"
                  />
                  <label htmlFor="In-house">NO</label>
                </div>
              </div>
            </div>
            <div>
              <span>Describe your previous payment experience.</span>
              <input
                className="inputs"
                id="greyed"
                placeholder="Desciption..."
              />
            </div>
            <div>
              <span>Length of payment experience</span>
              <input
                className="inputs"
                id="greyed"
                placeholder="Payment length..."
              />
            </div>
            <div>
              <span>Number of deals</span>
              <input
                className="inputs"
                id="greyed"
                placeholder="Number of deals..."
              />
            </div>
            <div>
              <span>Average volume of business with your customer</span>
              <input
                className="inputs"
                id="greyed"
                placeholder="Business volume..."
              />
            </div>
            <div>
              <span>Payment history with Supplier</span>
              <select className="inputs" id="greyed">
                <option value="">Select type...</option>
              </select>
            </div>
          </div>

          <div className="otherInfo"></div>
        </div>
        <BottomBar></BottomBar>
      </ApplicationLayout>
    </div>
  );
}

export default Index;
