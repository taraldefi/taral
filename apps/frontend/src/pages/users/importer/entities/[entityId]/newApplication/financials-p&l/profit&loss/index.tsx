import ApplicationLayout from "@components/layouts/new_application_layout";
import React from "react";

function index() {
  const currentYear = new Date().getFullYear();
  return (
    <ApplicationLayout>
      <div className="plContainer">
        <div className="assetsContainer">
          <div className="maintitle">ASSETS</div>
          <div className="assetsItems">
            <span>Revenue</span>
            <span>Cogs</span>
            <div className="hLine"></div>
            <span>Gross</span>
            <span>Distribution</span>
            <span>Administrative</span>
            <span>Other Income</span>
            <div className="hLine"></div>
            <span>Operating</span>
            <span>Income Tax Expense</span>
            <div className="hLine"></div>
            <span>Finance Costs Net</span>
            <span>Profit Before Income Tax</span>
            <span>Profit for The Period</span>
            <span>EBITDA</span>
          </div>
        </div>
        <div className="vLine"></div>
        <div className="currentYear">
          <div className="maintitle">{currentYear} (Current Year)</div>
          <div className="currentYearItems">
            <input
              type="text"
              className="inputs"
              placeholder="Enter amount..."
            />
            <input
              type="text"
              className="inputs"
              placeholder="Enter amount..."
            />
            <div className="hLine"></div>
            <input
              type="text"
              className="inputs"
              placeholder="Enter amount..."
            />
            <input
              type="text"
              className="inputs"
              placeholder="Enter amount..."
            />
            <input
              type="text"
              className="inputs"
              placeholder="Enter amount..."
            />
            <input
              type="text"
              className="inputs"
              placeholder="Enter amount..."
            />
            <div className="hLine"></div>
            <input
              type="text"
              className="inputs"
              placeholder="Enter amount..."
            />
            <input
              type="text"
              className="inputs"
              placeholder="Enter amount..."
            />
            <div className="hLine"></div>
            <input
              type="text"
              className="inputs"
              placeholder="Enter amount..."
            />
            <input
              type="text"
              className="inputs"
              placeholder="Enter amount..."
            />
            <input
              type="text"
              className="inputs"
              placeholder="Enter amount..."
            />
            <input
              type="text"
              className="inputs"
              placeholder="Enter amount..."
            />
          </div>
        </div>
        <div className="vLine"></div>
        <div className="prevYear1">
          <div className="currentYear">
            <div className="maintitle">{currentYear - 1}</div>
            <div className="currentYearItems">
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <div className="hLine"></div>
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <div className="hLine"></div>
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <div className="hLine"></div>
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
            </div>
          </div>
        </div>
        <div className="vLine"></div>
        <div className="prevYear2">
          <div className="currentYear">
            <div className="maintitle">{currentYear - 2}</div>
            <div className="currentYearItems">
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <div className="hLine"></div>
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <div className="hLine"></div>
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <div className="hLine"></div>
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
              <input
                type="text"
                className="inputs"
                placeholder="Enter amount..."
              />
            </div>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
}

export default index;
