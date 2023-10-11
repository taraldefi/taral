import { PortalIcons } from "@components/icons";
import TxLayout from "@components/layouts/auditor/tx_layout";
import React from "react";
export default function Transactiontx() {
  const [toggle, setToggle] = React.useState(true);
  const [toggle1, setToggle1] = React.useState(true);
  return (
    <TxLayout>
      <div className="transactionsContainer">
        <div className="goodsAndServices">
          <span>GOODS AND SERVICES</span>
          <div className="delivery" onClick={() => setToggle(!toggle)}>
            <PortalIcons selected={toggle} icon={"compliance"} />
            <span> Capital goods.</span>
          </div>
          <span>Goods or services you supply</span>
          <input
            type="text"
            className="inputs"
            placeholder="Goods/Services..."
          ></input>
          <textarea
            className="inputs"
            placeholder="Services description..."
          ></textarea>
        </div>
        <div className="contractStatus">
          <span>CONTRACT STATUS</span>
          <div className="delivery" onClick={() => setToggle1(!toggle1)}>
            <PortalIcons selected={toggle1} icon={"compliance"} />
            <span> Export contract signed by all parties</span>
          </div>
          <span>Contract conclusion</span>
          <input type="date" className="inputs" />
        </div>
      </div>
    </TxLayout>
  );
}
