import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "taral-ui";
import { cashFlowTableType } from "../../../types/widget_table";
interface Props {
  TableData: cashFlowTableType;
}
export const CashTable = ({ TableData }: Props) => {
  return (
    <div className="cashTable">
      <div className="tableJoint">
        <div className="contentBox">
          <div className="tableTitles">
            <div className="statusTitle">
              <div className="statusTitleItems">IN THDS EUR</div>
            </div>
          </div>
          <div className="titleColumn">
            {[
              "Cashflow from operating income",
              "Activity title",
              "Cashflow from financial income",
              "Activity title",
              "Cashflow from investing incom",
              "Activity title",
            ].map((item, index) => {
              return (
                <div className="columnContent" key={index}>
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <div className="tableContent">
          <div className="rowContent">
            {Object.keys(TableData).map((key, index) => {
              return (
                <div className="columnItems" key={index}>
                  <div className="contentTitle">
                    {Object.keys(TableData)[index]}
                  </div>
                  {Object.keys(TableData[key]).map((item, index) => {
                    return (
                      <div className="items" key={index}>
                        {TableData[key][`${item}`] == "file" ? (
                          <div id="fileButton">
                            {" "}
                            <Button
                              label={"Open File"}
                              onClick={function (): void {
                                throw new Error("Function not implemented.");
                              }}
                            />
                          </div>
                        ) : (
                          <div id="euro">
                            {TableData[key][`${item}`]}
                            <FontAwesomeIcon
                              icon={faEuroSign}
                              className="iconx"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
