import { PortalIcons } from "@components/icons";
import DashBoardPageLayout from "@components/layouts/auditor/dashboard/dashboard_page_layout";
export default function summary() {
  return (
    <DashBoardPageLayout
      showexport={true}
      exporter={"Exporter"}
      importer={"Importer"}
      date={""}
    >
      <div className="summary">
        <div className="businessSides">
          <span>BUSINESS SIDES</span>
          <span>Exporter</span>
          <input
            type="text"
            className="inputs"
            placeholder="Exporter Name..."
          ></input>
          <span>Importer</span>
          <input
            type="text"
            className="inputs"
            placeholder="Importer Name..."
          ></input>
        </div>
        <div className="transactionDetails">
          <span>TRANSACTION DETAILS</span>
          <span>Transaction</span>
          <input
            id="dollar"
            type="text"
            className="inputs"
            placeholder="Transaction Amount..."
          ></input>
          <span>Interest</span>
          <input
            id="percentage"
            type="text"
            className="inputs"
            placeholder="Percentage"
          ></input>
          <span>Down Payment</span>
          <input
            id="dollar"
            type="text"
            className="inputs"
            placeholder="Deposit Amount..."
          ></input>
          <span>Term</span>
          <input
            id="calendar"
            type="text"
            className="inputs"
            placeholder="Select Date"
          ></input>
          <span>Repayment Profile</span>
          <select className="inputs" placeholder="">
            <option value="select profile..."></option>
          </select>
        </div>
        <div className="summaryInfo">
          <span>INFO</span>
          <span>Industry</span>
          <select className="inputs" placeholder="">
            <option value="select profile..."></option>
          </select>
          <span>Goods</span>
          <select className="inputs" placeholder="">
            <option value="select profile..."></option>
          </select>
          <span>Delivery date</span>
          <input
            id="calendar"
            type="date"
            className="inputs"
            placeholder="Select date..."
          ></input>
          <span>Country</span>
          <select className="inputs" placeholder="">
            <option value="select profile..."></option>
          </select>
        </div>
        <div className="summaryInfo">
          <span>CONTRACT STATUS</span>
          <div className="header">
            <PortalIcons icon="checkBox" selected={false} />
            <span>Contract Signed</span>
          </div>
        </div>
      </div>
    </DashBoardPageLayout>
  );
}
