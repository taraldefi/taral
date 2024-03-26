// Generated with util/create-component.js
import React from "react";
import {
  ArrowDown,
  ArrowUp,
  CheckSquare,
  Copy,
  ExternalLink,
  MoreHorizontal,
  Printer,
  Square,
} from "react-feather";
import { truncateUuid } from "../helper";
import Button from "../Button";
import { MetricRange, ProgressBar, StatusWidget } from "../Widgets";
import "./Table.module.scss";
import {
  applicationTableType,
  auditTableType,
  companyTableType,
  entityTableType,
  overviewTableType,
  personsTableType,
  quantitativeTableType,
  receiptTableType,
  repaymentTableType,
  researchTableType,
  screeningTableType,
  signOffTableType,
  taskTableType,
  teamTableType,
  txTableType,
} from "./Table.types";

export const ReceiptTable: React.FC<receiptTableType> = ({
  receiptTableData,
}) => (
  <div className="table">
    <table>
      <tbody>
        <tr>
          {[
            "Transaction Date",
            "Amount",
            "Remaining Balance",
            "Payment Method",
            "Options",
          ].map((item, index) => {
            return <th key={index}>{item}</th>;
          })}
        </tr>
        {receiptTableData.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.transactionDate}</td>
              <td>{item.amount}</td>
              <td>{item.remainingBalance}</td>
              <td>{item.paymentMethod}</td>
              <td>
                <a href={item.url} attributes-list download>
                  <Printer color="#65768D" />
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export const RepaymentTable: React.FC<repaymentTableType> = ({
  repaymentTableData,
}) => (
  <div className="table">
    <table>
      <tbody>
        <tr>
          {["Payment", "Amount", "Due Date", "status"].map((item, index) => {
            return <th key={index}>{item}</th>;
          })}
        </tr>
        {repaymentTableData.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.paymentId}</td>
              <td>{item.amount}</td>
              <td>{item.dueDate}</td>
              <td>{item.status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export const ApplicationTable: React.FC<applicationTableType> = ({
  applicationTableData,
  onClick = () => {},
}) => {
  const [idCopiedToClipboard, setIdCopiedToClipboard] =
    React.useState<string>("");
  return (
    <div className="table">
      <table>
        <tbody>
          <tr>
            {[
              "Application ID",
              "Product",
              "Date From",
              "Date To",
              // 'Importer ID',
              "Exporter Name",
              "Status",
            ].map((item, index) => {
              return <th key={index}>{item}</th>;
            })}
          </tr>
          {applicationTableData.map((item, index) => {
            return (
              <tr onClick={() => onClick(item.id)} key={index}>
                <td>
                  {truncateUuid(item.applicationId, 4, 4)}{" "}
                  {idCopiedToClipboard === item.applicationId ? (
                    <CheckSquare size={"18px"} color="#0BD7A4" />
                  ) : (
                    <Copy
                      size={"18px"}
                      color="#0BD7A4"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(item.applicationId);
                        setIdCopiedToClipboard(item.applicationId);
                      }}
                    />
                  )}
                </td>
                <td>{item.product}</td>
                <td>{item.dateFrom}</td>
                <td>{item.dateTo}</td>
                {/* <td>{item.importerId}</td> */}
                <td>{item.importerName}</td>
                <td>
                  {item.status.claimable
                    ? item.status.component
                    : item.status.label}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const EntityTable: React.FC<entityTableType> = ({ entityTableData }) => (
  <div className="table">
    <table>
      <tbody>
        <tr>
          {["Title", "Issuance Date", "Maturity Date", "Facility Amount"].map(
            (item, index) => {
              return <th key={index}>{item}</th>;
            }
          )}
        </tr>

        {entityTableData.map((item, index) => {
          return (
            <tr key={index}>
              <td className="persons--tab">{item.productTitle}</td>
              <td className="details--tab">{item.issuanceDate}</td>
              <td className="source--tab">{item.maturityDate}</td>
              <td className="status--tab">{item.facilityAmount}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export const CompanyTable: React.FC<companyTableType> = ({
  companyTableData,
}) => (
  <div className="table">
    <table>
      <tbody>
        <tr>
          {/* <div className="statusTitle"> */}
          {["Persons", "Details", "Source", "Status"].map((item, index) => {
            return <th key={index}>{item}</th>;
          })}
          {/* </div> */}
        </tr>
        {companyTableData.map((item, index) => {
          return (
            <tr key={index}>
              <td className="details--tab">{item.persons}</td>
              <td className="persons--tab">{item.details}</td>
              <td className="source--tab">
                <a href={item.source}>{item.source}</a>
                &nbsp;&nbsp;
                <ExternalLink color="#0BD7A4" />
              </td>
              <td className="status--tab">
                {item.status ? (
                  <div className="svg--icon">
                    <CheckSquare color="#0BD7A4" />
                    <span className="selected">Verified</span>
                  </div>
                ) : (
                  <div className="svg--icon">
                    <Square color="#CBD5E1" />
                    <span className="not--selected">Verified</span>
                  </div>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export const ScreeningTable: React.FC<screeningTableType> = ({
  screeningTableData,
}) => (
  <div className="table">
    <table>
      <tbody>
        <tr>
          {/* <div className="statusTitle"> */}
          {["Persons", "Hit", "Source", "Options"].map((item, index) => {
            return <th key={index}>{item}</th>;
          })}
          {/* </div> */}
        </tr>
        {screeningTableData.map((item, index) => {
          return (
            <tr key={index}>
              <td className="details--tab">{item.persons}</td>
              <td className="hit--tab">{item.Hit}</td>
              <td className="source--tab">
                <a href={item.Source}>{item.Source}</a>
                &nbsp;&nbsp;
                <ExternalLink color="#0BD7A4" />
              </td>
              <td className="status--tab">
                <div className="svg--icon">
                  <MoreHorizontal color="#64748b" />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export const PersonsTable: React.FC<personsTableType> = ({
  personsTableData,
}) => (
  <div className={"table"}>
    <table>
      <tbody>
        <tr>
          {[
            "Persons",
            "Email",
            "Position",
            "Verification Status",
            "Status Verification",
            "Options",
          ].map((item, index) => {
            return <th key={index}>{item}</th>;
          })}
        </tr>

        {personsTableData.map((item, index) => {
          return (
            <tr key={index}>
              <td className="persons--container" id="assignee">
                <img
                  className="images"
                  src={item.image}
                  key={index}
                  alt=""
                  width="35%"
                  height="35%"
                ></img>
                <div className="name--container">
                  <span>{item.name}</span>
                </div>
              </td>
              <td className="email--container">
                <span>{item.email}</span>
              </td>
              <td id="assignor">
                <span>{item.position}</span>
              </td>
              <td className="sent">
                {item.isSent ? (
                  <div className="sent--done">Sent</div>
                ) : (
                  <div className="sent--not--done">Not Sent</div>
                )}
              </td>
              <td className="done">
                {item.isDone ? (
                  <div className="not--done">Completed</div>
                ) : (
                  <div className="complete">Not Done</div>
                )}
              </td>
              <td>
                <MoreHorizontal color="#64748b" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export const ResearchTable: React.FC<researchTableType> = ({
  researchTableData,
}) => (
  <div className="table">
    <table>
      <tbody>
        <tr>
          {/* <div className="statusTitle"> */}
          {["Persons", "Hit", "Source", "Options"].map((item, index) => {
            return <th key={index}>{item}</th>;
          })}
          {/* </div> */}
        </tr>
        {researchTableData.map((item, index) => {
          return (
            <tr key={index}>
              <td className="persons--container" id="assignee">
                <img
                  className="images"
                  src={item.image}
                  key={index}
                  alt=""
                  width="35%"
                  height="35%"
                ></img>
                <div className="name--container">
                  <span>{item.name}</span>
                </div>
              </td>
              <td className="hit--tab">{item.Hit}</td>
              <td className="source--tab">
                <a href={item.Source}>{item.Source}</a>
                &nbsp;&nbsp;
                <ExternalLink color="#0BD7A4" />
              </td>
              <td className="status--tab">
                <div className="svg--icon">
                  <MoreHorizontal color="#64748b" />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export const SignOffTable: React.FC<signOffTableType> = ({
  signOffTableData,
}) => (
  <div className="table">
    <table>
      <tbody>
        <tr>
          {["Name", "Position", "Status", "Status"].map((item, index) => {
            return <th key={index}>{item}</th>;
          })}
        </tr>
        {signOffTableData.map((item, index) => {
          return (
            <tr key={index}>
              <td className="user--container">
                <img
                  className="images"
                  src={item.image}
                  key={index}
                  alt=""
                  width="32px"
                  height="32px"
                />
                <div className="flex--box">
                  <span>{item.name}</span>
                  <span>{item.email}</span>
                </div>
              </td>
              <td>{item.position}</td>
              <td>
                {item.statusSeen ? (
                  <div className="svg--icon">
                    <CheckSquare color="#0BD7A4" />
                    <span className="selected">Seen</span>
                  </div>
                ) : (
                  <div className="svg--icon">
                    <Square color="#CBD5E1" />
                    <span className="not--selected">Seen</span>
                  </div>
                )}
              </td>
              <td>
                {item.statusSigned ? (
                  <div className="svg--icon">
                    <CheckSquare color="#0BD7A4" />
                    <span className="selected">Signed</span>
                  </div>
                ) : (
                  <div className="svg--icon">
                    <Square color="#CBD5E1" />
                    <span className="not--selected">Signed</span>
                  </div>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export const OverviewTable: React.FC<overviewTableType> = ({
  overviewTableData,
}) => (
  <div className="table">
    <table>
      <tbody>
        <tr>
          {["Process", "Users", "Progress", "Status", "Date"].map(
            (item, index) => {
              return <th key={index}>{item}</th>;
            }
          )}
        </tr>
        {overviewTableData.map((item, index) => {
          return (
            <tr key={index}>
              <td className="process--tab">{item.process}</td>
              <td className="image--container">
                {overviewTableData[index].users.map((item, index) => {
                  return (
                    <img
                      className="images"
                      src={item}
                      key={index}
                      alt=""
                      width={30}
                      height={30}
                    ></img>
                  );
                })}
              </td>
              <td>
                <ProgressBar
                  progress={item.progress}
                  color={"#04C1DE"}
                  showText={false}
                />
              </td>
              <td>
                <StatusWidget
                  type={item.status}
                  showIcon={false}
                ></StatusWidget>
              </td>

              <td className="date">{item.date}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export const AuditTable: React.FC<auditTableType> = ({ auditTableData }) => (
  <div className="table">
    <table>
      <tbody>
        <tr>
          {["Action", "User", "Activity", "Date"].map((item, index) => {
            return <th key={index}>{item}</th>;
          })}
        </tr>
        {auditTableData.map((item, index) => {
          return (
            <tr key={index}>
              <td className="process--tab">{item.action}</td>
              <td>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                  className="image--container"
                >
                  <img
                    className="images"
                    src={item.user.avatar}
                    key={index}
                    alt=""
                    width={30}
                    height={30}
                  ></img>
                  <div className="name--container">
                    <span>{item.user.name}</span>
                    <span>{item.user.email}</span>
                  </div>
                </div>
              </td>

              <td className="activity">
                <StatusWidget
                  type={item.activity}
                  showIcon={false}
                ></StatusWidget>
              </td>

              <td className="date">{item.date}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export const QuantitativeTable: React.FC<quantitativeTableType> = ({
  quantitativeTableData,
}) => (
  <div className="table">
    <table>
      <tbody>
        <tr>
          {["Factor", "Value", "Status", "Metric"].map((item, index) => {
            return <th key={index}>{item}</th>;
          })}
        </tr>
        {quantitativeTableData.map((item, index) => {
          return (
            <tr key={index}>
              <td className="process--tab">{item.factor}</td>
              <td>{item.value}</td>

              <td className="activity">
                <StatusWidget
                  type={item.status ? "Up" : "Down"}
                  showIcon={true}
                  icon={
                    item.status ? (
                      <ArrowUp size={"16px"}></ArrowUp>
                    ) : (
                      <ArrowDown size={"16px"}></ArrowDown>
                    )
                  }
                ></StatusWidget>
              </td>

              <td>
                <MetricRange value={item.metric}></MetricRange>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export const TaskTable: React.FC<taskTableType> = ({
  taskTableData,
  value,
}) => {
  const [toggle, setToggle] = React.useState(false);

  return (
    <>
      <div className="task--box">
        <span>TASKS ({value})</span>
        <Button
          label="View All Tasks"
          onClick={() => setToggle(!toggle)}
        ></Button>
      </div>
      <div className="table">
        <table>
          <tbody>
            <tr>
              {["Assignee", "Task", "Assignor", "Date"].map((item, index) => {
                return <th key={index}>{item}</th>;
              })}
            </tr>
            {toggle
              ? taskTableData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <img
                            className="images"
                            src={item.assignee.user}
                            key={index}
                            alt=""
                            width={30}
                            height={30}
                          ></img>

                          <span>{item.assignee.name}</span>
                        </div>
                      </td>
                      <td className="task--list">
                        <span>{item.task.title}</span>
                        <span>{item.task.description}</span>
                      </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <img
                            className="images"
                            src={item.assignor.user}
                            key={index}
                            alt=""
                            width={30}
                            height={30}
                          ></img>

                          <span>{item.assignor.name}</span>
                        </div>
                      </td>
                      <td className="date">{item.date}</td>
                    </tr>
                  );
                })
              : taskTableData.slice(0, 3).map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <img
                            className="images"
                            src={item.assignee.user}
                            key={index}
                            alt=""
                            width={30}
                            height={30}
                          ></img>

                          <span>{item.assignee.name}</span>
                        </div>
                      </td>
                      <td className="task--list">
                        <span>{item.task.title}</span>
                        <span>{item.task.description}</span>
                      </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <img
                            className="images"
                            src={item.assignor.user}
                            key={index}
                            alt=""
                            width={30}
                            height={30}
                          ></img>

                          <span>{item.assignor.name}</span>
                        </div>
                      </td>
                      <td className="date">{item.date}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export const TeamTable: React.FC<teamTableType> = ({
  teamTableData,
  value,
}) => {
  const [Teamtoggle, setTeamToggle] = React.useState(false);

  return (
    <>
      <div className="task--box">
        <span>MEMBERS ({value})</span>
        <Button
          label="View All Members"
          onClick={() => setTeamToggle(!Teamtoggle)}
        ></Button>
      </div>
      <div className="table">
        <table>
          <tbody>
            <tr>
              {["Member", "Department", "Last Action", "Date of Action"].map(
                (item, index) => {
                  return <th key={index}>{item}</th>;
                }
              )}
            </tr>
            {Teamtoggle
              ? teamTableData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <img
                            className="images"
                            src={item.member.user}
                            key={index}
                            alt=""
                            width={30}
                            height={30}
                          ></img>

                          <span>{item.member.name}</span>
                        </div>
                      </td>
                      <td>
                        <span>{item.department}</span>
                      </td>
                      <td>
                        <span>{item.lastAction}</span>
                      </td>
                      <td className="date">{item.dateOfAction}</td>
                    </tr>
                  );
                })
              : teamTableData.slice(0, 3).map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <img
                            className="images"
                            src={item.member.user}
                            key={index}
                            alt=""
                            width={30}
                            height={30}
                          ></img>

                          <span>{item.member.name}</span>
                        </div>
                      </td>
                      <td>
                        <span>{item.department}</span>
                      </td>
                      <td>
                        <span>{item.lastAction}</span>
                      </td>
                      <td className="date">{item.dateOfAction}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export const TxFinanceTable: React.FC<txTableType> = ({ txTableData }) => (
  <div className="tx--finance">
    <div className="join--table">
      <div className="header--column">
        <div className="txtable--title">Time</div>
        {[
          "Down Payment",
          "Principal Repayment",
          "Interest Repayment",
          "Total Payment",
        ].map((item, index) => {
          return (
            <div className="header--column--item" key={index}>
              {item}
            </div>
          );
        })}
      </div>

      <div className="table--content">
        {Object.keys(txTableData).map((key, index) => {
          return (
            <div className="table--column--item" key={index}>
              <div className="content--title">
                {Object.keys(txTableData)[index]}
              </div>
              {Object.keys(txTableData[key]).map((item, index) => {
                return (
                  <div className="items" key={index}>
                    {(txTableData[key] as any)[`${item}`] == 0 ? (
                      "..."
                    ) : (
                      <div id="euro">
                        {(txTableData[key] as any)[`${item}`]} €
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
);
