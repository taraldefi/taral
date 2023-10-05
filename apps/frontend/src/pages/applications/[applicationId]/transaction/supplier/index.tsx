import TxLayout from "@components/layouts/auditor/tx_layout";
export default function TransactionSupplier() {
  return (
    <TxLayout>
      <div className="supplier">
        <div className="companyDetails">
          <span>COMPANY DETAILS</span>
          <span>Company Name</span>
          <input
            type="text"
            className="inputs"
            placeholder="Company Name..."
          ></input>
          <span>Date Established</span>
          <input
            type="date"
            className="inputs"
            placeholder="Date Established..."
          ></input>
          <span>No.of Employees</span>
          <input
            type="text"
            className="inputs"
            placeholder="Number of employees..."
          ></input>
          <span>Tax No.</span>
          <input
            type="text"
            className="inputs"
            placeholder="Tax number..."
          ></input>
          <span>Euler Hemes&apos;DN-NO</span>
          <input
            type="text"
            className="inputs"
            placeholder="Registration numbers..."
          ></input>
        </div>
        <div className="companyLocation">
          <span>COMPANY LOCATION</span>
          <span>Address</span>
          <input type="text" className="inputs" placeholder="City..."></input>
          <input
            type="text"
            className="inputs"
            placeholder="Address line 1..."
          ></input>
          <input
            type="text"
            className="inputs"
            placeholder="Address line2(optional)..."
          ></input>
          <span>Postcode</span>
          <input
            type="text"
            className="inputs"
            placeholder="Percentage..."
          ></input>
        </div>
        <div className="financialInfo">
          <span>FINANCIAL INFO</span>
          <span>Turnover(EURm)</span>
          <input
            className="inputs"
            type="text"
            placeholder="Turnover amount..."
          ></input>
          <span>Balance Sheet Total(EURm)</span>
          <input
            className="inputs"
            type="text"
            placeholder="Total amount..."
          ></input>
        </div>
        <div className="rating">
          <div className="header">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 9.16666L10 11.6667L18.3333 3.33333"
                stroke="#0BD7A4"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.5 10V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H13.3333"
                stroke="#0BD7A4"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>External Rating</span>
          </div>
          <div className="inputs">
            <input
              type="text"
              className="input"
              placeholder="Rating..."
            ></input>
            <span>Rating Agency</span>
            <input
              type="text"
              className="input"
              placeholder="Agency name..."
            ></input>
            <span>Date of the rating</span>
            <input
              type="date"
              className="input"
              placeholder="Rating..."
            ></input>
          </div>
        </div>
      </div>
    </TxLayout>
  );
}
