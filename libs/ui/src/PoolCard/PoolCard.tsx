// Generated with util/create-component.js
import React from "react";
import { PoolCardProps } from "./PoolCard.types";
import Button from "../Button";
import "./PoolCard.scss";
import { Info } from "react-feather";

const PoolCard: React.FC<PoolCardProps> = ({
  poolIcon,
  poolTitle,
  poolDescription,
  poolStat,
  poolSubstat,
  poolState,
  unitranche,
  ...props
}) => (
  <div className="pool-card--container">
    <div className="pool--title">
      <div className="item1">
        {" "}
        <img src={poolIcon}></img>
      </div>
      <div className="item2">{poolTitle}</div>
      <div className="item3">{poolDescription}</div>
    </div>
    <div className="pool--stats">
      <span>{poolStat}</span>
      <span>
        {poolSubstat}
        <Info color="#64748b"></Info>
      </span>
    </div>

    <div className="pool--button">
      <Button
        label={unitranche ? "Unitranche" : "Multitranche"}
        onClick={() => {}}
      ></Button>
      <Button
        disabled={poolState == "closed" || poolState == "full"}
        backgroundColor={poolState == "yield" ? "#1ab98b" : "#d70b48"}
        primary={true}
        label={poolState}
        {...props}
      ></Button>
    </div>
  </div>
);

export default PoolCard;
