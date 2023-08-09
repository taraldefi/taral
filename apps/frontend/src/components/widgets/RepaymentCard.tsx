import { Button } from "taral-ui";
import React from "react";
import { DollarSign, LogOut } from "react-feather";

interface repaymentCardProp {
  onAuthorize: () => void;
}

const RepaymentCard = ({ onAuthorize }: repaymentCardProp) => {
  const [selectedId, setSelectedId] = React.useState<number>(0);
  function handleSelect(index: number) {
    setSelectedId(index);
  }
  return (
    <div className="repaymentCard">
      <div>
        <h3>Choose Repayment Method</h3>
        <span>Select your preferred repayment method:</span>
      </div>
      <div className="switchTabContainer">
        <div
          onClick={() => {
            handleSelect(0);
          }}
          className={`${selectedId === 0 ? "switchTab selected" : "switchTab"}`}
        >
          <div style={{ display: "flex" }}>
            <DollarSign
              color={`${selectedId === 0 ? "#1B52EB" : "#65768D"}`}
            ></DollarSign>
          </div>
          <span className={`${selectedId === 0 ? "bold" : "text"}`}>
            USD-Stablecoin
          </span>
        </div>
        <div
          onClick={() => {
            handleSelect(1);
          }}
          className={`${selectedId === 1 ? "switchTab selected" : "switchTab"}`}
        >
          <div style={{ display: "flex" }}>
            <LogOut
              color={`${selectedId === 1 ? "#1B52EB" : "#65768D"}`}
            ></LogOut>
          </div>
          <span className={`${selectedId === 1 ? "bold" : "text"}`}>
            Direct Transfer
          </span>
        </div>
      </div>
      <div className="inputContainer">
        <span>Repayment Amount</span>
        <input
          type="text"
          className="inputs"
          id="dollar"
          placeholder="Enter Amount"
        />
      </div>

      <div>
        <Button
          onClick={() => {
            onAuthorize();
          }}
          label={"AUTHORIZE REPAYMENT"}
          primary={true}
          backgroundColor="#1AB98B"
        ></Button>
      </div>
      <div></div>
    </div>
  );
};

export default RepaymentCard;
