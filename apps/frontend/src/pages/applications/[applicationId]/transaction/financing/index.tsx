import TxLayout from "@components/layouts/auditor/tx_layout";
import { TxFinanceTable } from "@lib";

const TableData = {
  orderentity: {
    downpayment: 100000,
    principalrepayment: 0,
    interestpayment: 0,
    total: 100000,
  },
  shipment: {
    downpayment: 0,
    principalrepayment: 0,
    interestpayment: 0,
    total: 0,
  },
  "month 1": {
    downpayment: 0,
    principalrepayment: 34167,
    interestpayment: 4040,
    total: 38207,
  },
  "month 2": {
    downpayment: 0,
    principalrepayment: 34167,
    interestpayment: 3703,
    total: 37870,
  },
  "month 3": {
    downpayment: 0,
    principalrepayment: 34167,
    interestpayment: 3367,
    total: 37533,
  },
  "month 4": {
    downpayment: 0,
    principalrepayment: 34167,
    interestpayment: 3030,
    total: 37197,
  },
  "month 5": {
    downpayment: 0,
    principalrepayment: 34167,
    interestpayment: 2693,
    total: 36860,
  },
  "month 6": {
    downpayment: 0,
    principalrepayment: 34167,
    interestpayment: 2357,
    total: 36523,
  },
};

export default function Transactionfinancing() {
  return (
    <TxLayout>
      <div className="financing">
        <span>OPTIONS</span>
        <div className="financingContainer">
          <div className="inputFields">
            <div className="currency">
              <div>
                <label>Currency</label>
                <input className="inputs" type="text" placeholder="Euros" />
              </div>
              <div>
                <label>ECA Cover Premium</label>
                <input className="inputs" type="text" placeholder="$10.000" />
              </div>
            </div>
            <div className="eca">
              <div>
                <label>ECA Cover </label>
                <input className="inputs" type="text" placeholder="2%" />
              </div>
              <div>
                <label>ECA Cover Type</label>
                <input
                  className="inputs"
                  type="text"
                  placeholder="Buyer Credit"
                />
              </div>
            </div>
          </div>
          <div className="notesContainer">
            <label>Additional financing notes:</label>
            <textarea className="inputs" placeholder="Notes..."></textarea>
          </div>
        </div>
        <div className="tableContainer">
          <span>TIME LINE</span>

          <TxFinanceTable txTableData={TableData}></TxFinanceTable>
        </div>
      </div>
    </TxLayout>
  );
}
